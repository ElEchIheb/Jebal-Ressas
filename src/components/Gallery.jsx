import { useEffect, useMemo, useState, useTransition } from "react";
import { formatAssetSize } from "../lib/localAssets";

export function Gallery({ copy, items }) {
  const [filter, setFilter] = useState("all");
  const [activeItem, setActiveItem] = useState(null);
  const [isPending, startTransition] = useTransition();

  const filteredItems = useMemo(() => {
    if (filter === "all") {
      return items;
    }

    return items.filter((item) => item.type === filter.slice(0, -1));
  }, [filter, items]);

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

  return (
    <>
      <div className="gallery-toolbar" data-reveal>
        {Object.entries(copy.filters).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={filter === key ? "is-active" : ""}
            onClick={() => {
              startTransition(() => setFilter(key));
            }}
          >
            {label}
          </button>
        ))}

        <span className="gallery-toolbar__status">
          {isPending ? "..." : `${filteredItems.length} / ${items.length}`}
        </span>
      </div>

      {filteredItems.length ? (
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <button
              className={`gallery-card gallery-card--${item.type}`}
              key={item.id}
              type="button"
              onClick={() => setActiveItem(item)}
              aria-label={`${copy.mediaLabel[item.type]} ${item.title}`}
              data-reveal
            >
              <div className="gallery-card__media">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    autoPlay
                  />
                ) : (
                  <img src={item.src} alt={item.title} loading="lazy" />
                )}
              </div>

              <div className="gallery-card__overlay">
                <span>{copy.mediaLabel[item.type]}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="gallery-empty glass-panel" data-reveal>
          <p>{copy.empty}</p>
        </div>
      )}

      {activeItem ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setActiveItem(null)}
        >
          <button
            className="lightbox__close"
            type="button"
            aria-label={copy.closeLightbox}
            onClick={() => setActiveItem(null)}
          >
            ×
          </button>

          <div className="lightbox__panel glass-panel" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox__media">
              {activeItem.type === "video" ? (
                <video src={activeItem.src} controls autoPlay playsInline preload="metadata" />
              ) : (
                <img src={activeItem.src} alt={activeItem.title} />
              )}
            </div>

            <div className="lightbox__content">
              <span>{copy.mediaLabel[activeItem.type]}</span>
              <h3>{activeItem.title}</h3>
              <p>{activeItem.text}</p>
              <small>{`${activeItem.name} · ${formatAssetSize(activeItem.size)}`}</small>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
