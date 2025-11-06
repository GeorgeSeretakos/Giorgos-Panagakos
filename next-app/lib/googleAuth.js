// lib/googleAuth.js
const TOKEN_URL = "https://oauth2.googleapis.com/token";

export async function exchangeCodeForTokens({ code, clientId, clientSecret, redirectUri }) {
  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  let resp;
  try {
    resp = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
  } catch (err) {
    console.error("[GCAL] token exchange network error", {
      name: err?.name,
      message: String(err?.message || err),
    });
    throw err;
  }

  if (!resp.ok) {
    const errText = await resp.text().catch(() => "");
    console.error("[GCAL] token exchange failed", {
      status: resp.status,
      body: safeSnippet(errText),
    });
    throw new Error(`Token exchange failed (${resp.status}): ${errText || resp.statusText}`);
  }

  return resp.json(); // { access_token, refresh_token, expires_in, scope, token_type, ... }
}

export async function refreshAccessToken({ refreshToken, clientId, clientSecret }) {
  const body = new URLSearchParams({
    refresh_token: refreshToken, // DO NOT LOG THIS
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  });

  let resp;
  try {
    resp = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
  } catch (err) {
    console.error("[GCAL] token refresh network error", {
      name: err?.name,
      message: String(err?.message || err),
    });
    throw err;
  }

  if (!resp.ok) {
    const errText = await resp.text().catch(() => "");
    console.error("[GCAL] token refresh failed", {
      status: resp.status,
      body: safeSnippet(errText),
    });
    throw new Error(`Refresh failed (${resp.status}): ${errText || resp.statusText}`);
  }

  return resp.json(); // { access_token, expires_in, scope, token_type, ... }
}

export async function googleApiGet(url, accessToken) {
  let resp;
  try {
    resp = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
  } catch (err) {
    console.error("[GCAL] Google GET network error", {
      url,
      name: err?.name,
      message: String(err?.message || err),
    });
    throw err;
  }

  if (!resp.ok) {
    const errText = await resp.text().catch(() => "");
    console.error("[GCAL] Google GET failed", {
      url,
      status: resp.status,
      body: safeSnippet(errText),
    });
    throw new Error(`Google GET failed (${resp.status}) ${url}: ${errText || resp.statusText}`);
  }
  return resp.json();
}

export async function googleApiPost(url, accessToken, bodyObj) {
  let resp;
  try {
    resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[GCAL] Google POST network error", {
      url,
      name: err?.name,
      message: String(err?.message || err),
    });
    throw err;
  }

  if (!resp.ok) {
    const errText = await resp.text().catch(() => "");
    console.error("[GCAL] Google POST failed", {
      url,
      status: resp.status,
      body: safeSnippet(errText),
    });
    throw new Error(`Google POST failed (${resp.status}) ${url}: ${errText || resp.statusText}`);
  }
  return resp.json();
}

// Redact long bodies in logs (keep first 400 chars)
function safeSnippet(s = "") {
  const t = String(s);
  return t.length > 400 ? `${t.slice(0, 400)}…` : t;
}
