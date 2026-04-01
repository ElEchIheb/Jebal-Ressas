import { useEffect, useRef, useState } from "react";
import { geoFeatures } from "../content";
import { useInView } from "../lib/useInView";

const popupMarkup = (point, sourceUrl) =>
  `
    <div class="map-popup">
      <strong>${point.title}</strong>
      <p>${point.text}</p>
      <a href="${sourceUrl}" target="_blank" rel="noreferrer">${point.sourceLabel}</a>
    </div>
  `;

export function MapPanel({ copy, direction }) {
  const shellRef = useRef(null);
  const mapRef = useRef(null);
  const inView = useInView(shellRef, { rootMargin: "220px" });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!inView || !mapRef.current) {
      return undefined;
    }

    let map;
    let cancelled = false;

    const loadMap = async () => {
      const module = await import("leaflet");
      const L = module.default ?? module;

      if (cancelled || !mapRef.current) {
        return;
      }

      map = L.map(mapRef.current, {
        attributionControl: false,
        scrollWheelZoom: false,
        zoomControl: false
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18
      }).addTo(map);

      map.fitBounds(geoFeatures.bounds, { padding: [28, 28] });
      L.control.zoom({ position: direction === "rtl" ? "topleft" : "topright" }).addTo(map);

      copy.points.forEach((point) => {
        const feature = geoFeatures.points[point.id];
        const marker = L.marker(feature.coords, {
          icon: L.divIcon({
            className: `map-pin map-pin--${point.variant}`,
            html: "<span class=\"map-pin__core\"></span>",
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })
        }).addTo(map);

        marker.bindPopup(popupMarkup(point, feature.sourceUrl));
      });

      window.requestAnimationFrame(() => {
        map?.invalidateSize();
        setIsReady(true);
      });
    };

    loadMap();

    return () => {
      cancelled = true;

      if (map) {
        map.remove();
      }
    };
  }, [copy, direction, inView]);

  return (
    <section className="map-panel glass-panel" ref={shellRef} data-reveal>
      <div className="map-shell">
        <div className="map-container" ref={mapRef} />
        {!isReady ? <div className="panel-status">{copy.loading}</div> : null}
      </div>

      <div className="map-panel__meta">
        <div className="map-panel__legend">
          {copy.points.map((point) => (
            <span className="coord-chip" key={point.id}>
              <span className={`coord-chip__dot coord-chip__dot--${point.variant}`} />
              {point.legend}
            </span>
          ))}
        </div>
        <p>{copy.attribution}</p>
      </div>
    </section>
  );
}
