import { useEffect, useState } from "react";

export function Gallery({ copy, items }) {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    if (!activeItem) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  if (!items.length) {
    return (
      <div className="gallery-empty glass-panel" data-reveal>
        <p>{copy.empty}</p>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => (
          <button
            className="gallery-card"
            key={item.id}
            type="button"
            onClick={() => setActiveItem(item)}
            aria-label={`${copy.openLightbox} ${item.alt}`}
            data-reveal
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {activeItem ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.alt}
          onClick={() => setActiveItem(null)}
        >
          <button
            className="lightbox__close"
            type="button"
            aria-label={copy.closeLightbox}
            onClick={() => setActiveItem(null)}
          >
            x
          </button>

          <div className="lightbox__panel lightbox__panel--media" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox__media">
              <img src={activeItem.src} alt={activeItem.alt} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
