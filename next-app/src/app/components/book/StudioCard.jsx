"use client";

export default function StudioCard({
                                     studio = {},
                                     onClick,
                                     locale = "en", // ← add locale prop (defaults to EN)
                                   }) {
  const name = studio.name || "Studio EMS";
  const image = studio.photoUrls?.[0];
  const address = studio.address || "Άγνωστη τοποθεσία";

  // helper: format meters/kilometers per locale
  const formatDistance = (meters) => {
    if (meters == null || !Number.isFinite(meters)) return null;
    if (meters < 1000) {
      return locale === "en" ? `${Math.round(meters)} m` : `${Math.round(meters)} μ`;
    }
    const km = (meters / 1000).toFixed(1);
    return locale === "en" ? `${km} km` : `${km} χλμ`;
  };

  const distance =
    typeof studio.distance === "number" ? studio.distance : null;
  const sway =
    typeof studio.sway_distance === "number" ? studio.sway_distance : null;

  const distanceLabel = formatDistance(distance);
  const swayLabel = formatDistance(sway);

  const awayWord = locale === "en" ? "away" : "μακριά";

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-64"
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {/* Εικόνα */}
      <div className="relative w-full h-[50%]">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Περιεχόμενο */}
      <div className="flex flex-col flex-1 p-4">
        <h4 className="text-gray-900 font-semibold leading-tight line-clamp-2">
          {name}
        </h4>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{address}</p>

        <div className="mt-auto space-y-1 text-sm font-medium text-gray-800">
          {distanceLabel && <p>{distanceLabel} {awayWord}</p>}
          {swayLabel && <p>{swayLabel} {awayWord}</p>}
        </div>
      </div>
    </div>
  );
}
