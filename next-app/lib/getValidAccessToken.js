import { prisma } from "@lib/prisma";
import { refreshAccessToken } from "@lib/googleAuth";

export class ReconnectRequiredError extends Error {
  constructor(message = "Reconnect calendar required") {
    super(message);
    this.name = "ReconnectRequiredError";
    this.code = "RECONNECT_REQUIRED";
  }
}

/**
 * Returns a valid Google access token for the given CalendarConnection.
 * - Refreshes silently when expired/near expiry
 * - Never triggers browser redirects
 * - Throws ReconnectRequiredError if refresh cannot be performed
 *
 * Added: verbose console logs to trace why refresh failed/succeeded.
 * NOTE: No database writes for diagnostics.
 */
export async function getValidAccessToken(connectionId) {
  const t0 = Date.now();
  console.info("[GCAL] getValidAccessToken:start", { connectionId });

  const conn = await prisma.calendarConnection.findUnique({
    where: { id: connectionId },
    select: {
      accessToken: true,
      refreshToken: true,
      expiry: true,
      studioId: true,
      grantedScopes: true,
      // do NOT select anything sensitive we don't need
    },
  });

  if (!conn) {
    console.warn("[GCAL] connection missing", { connectionId });
    throw new ReconnectRequiredError("Connection not found");
  }

  if (!conn.refreshToken) {
    console.warn("[GCAL] refresh token missing", { connectionId, studioId: conn.studioId });
    throw new ReconnectRequiredError("Missing refresh token");
  }

  const skewMs = 60_000; // refresh 1 minute early
  const hasAccess = !!conn.accessToken && !!conn.expiry;
  const expiryMs = hasAccess ? new Date(conn.expiry).getTime() : 0;
  const stillValid = hasAccess && (Date.now() + skewMs) < expiryMs;

  if (stillValid) {
    console.info("[GCAL] access token still valid", {
      connectionId,
      studioId: conn.studioId,
      now: new Date().toISOString(),
      expiry: new Date(expiryMs).toISOString(),
      msRemaining: expiryMs - Date.now(),
    });
    return conn.accessToken;
  }

  // Needs refresh
  console.info("[GCAL] refreshing access token…", {
    connectionId,
    studioId: conn.studioId,
    reason: hasAccess ? "expired_or_near_expiry" : "no_access_token",
    prevExpiry: hasAccess ? new Date(expiryMs).toISOString() : null,
    grantedScopes: conn.grantedScopes,
  });

  try {
    const data = await refreshAccessToken({
      refreshToken: conn.refreshToken, // NEVER log this
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });

    const nextAccess = data.access_token;
    const expiresIn = data.expires_in ?? 3600; // seconds
    const nextExpiry = new Date(Date.now() + expiresIn * 1000);

    if (!nextAccess) {
      console.error("[GCAL] refresh succeeded but no access_token returned", {
        connectionId,
        studioId: conn.studioId,
        responseKeys: Object.keys(data || {}),
      });
      throw new ReconnectRequiredError("No access token returned on refresh");
    }

    await prisma.calendarConnection.update({
      where: { id: connectionId },
      data: {
        accessToken: nextAccess,
        expiry: nextExpiry,
      },
    });

    console.info("[GCAL] refresh OK", {
      connectionId,
      studioId: conn.studioId,
      newExpiry: nextExpiry.toISOString(),
      tookMs: Date.now() - t0,
    });

    return nextAccess;
  } catch (err) {
    const msg = String(err?.message || err);
    // Print useful detail without secrets
    console.error("[GCAL] refresh FAILED", {
      connectionId,
      studioId: conn.studioId,
      error: msg,
      name: err?.name,
      code: err?.code,
      status: err?.status,
      tookMs: Date.now() - t0,
    });

    // Map common Google errors to a clean reconnect signal
    if (msg.includes("invalid_grant") || msg.includes("unauthorized_client")) {
      throw new ReconnectRequiredError("Refresh token invalid or revoked");
    }

    // Bubble others (network, 5xx) to caller to treat as transient errors
    throw err;
  }
}
