import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { Gallery } from "./components/Gallery";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { MountainExplore } from "./components/MountainExplore";
import { SectionHeading } from "./components/SectionHeading";
import { VisitGuide } from "./components/VisitGuide";
import { content } from "./content";
import { buildMediaPlan } from "./lib/localAssets";

function App() {
  const [lang, setLang] = useState("fr");
  const [isSwitching, setIsSwitching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const appRef = useRef(null);
  const t = useMemo(() => content[lang], [lang]);
  const mediaPlan = useMemo(() => buildMediaPlan(), []);

  const galleryItems = useMemo(() => {
    const captions = t.gallery.captions;

    return mediaPlan.galleryImages.map((asset, index) => ({
      ...asset,
      alt: captions[index % Math.max(1, captions.length)]
    }));
  }, [mediaPlan.galleryImages, t.gallery.captions]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.direction;
    setIsNavOpen(false);

    const timeoutId = window.setTimeout(() => {
      setIsSwitching(false);
    }, 260);

    return () => window.clearTimeout(timeoutId);
  }, [lang, t.direction]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = appRef.current;

    if (!root) {
      return undefined;
    }

    const elements = Array.from(root.querySelectorAll("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !appRef.current) {
      return undefined;
    }

    let cancelled = false;
    let context;

    const animate = async () => {
      const module = await import("gsap");
      const gsap = module.gsap ?? module.default ?? module;

      if (cancelled || !appRef.current) {
        return;
      }

      context = gsap.context(() => {
        gsap.fromTo(
          ".hero__copy > *",
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.92,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.1
          }
        );

        gsap.fromTo(
          ".hero__aside",
          { y: 36, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 1.02, ease: "power3.out", delay: 0.2 }
        );
      }, appRef);
    };

    animate();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [lang]);

  const toggleLanguage = () => {
    setIsSwitching(true);
    startTransition(() => {
      setLang((current) => (current === "fr" ? "ar" : "fr"));
    });
  };

  const scrollToSection = (id) => {
    setIsNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={`app ${t.direction === "rtl" ? "is-rtl" : ""} ${isSwitching ? "is-switching" : ""}`}
      ref={appRef}
    >
      <div className="ambient ambient--sky" aria-hidden="true" />
      <div className="ambient ambient--earth" aria-hidden="true" />
      <div className="ambient ambient--mist" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header
        className={`topbar glass-panel ${isScrolled ? "topbar--scrolled" : ""} ${
          isNavOpen ? "topbar--nav-open" : ""
        }`}
      >
        <button className="brand" type="button" onClick={() => scrollToSection("top")}>
          <span className="brand__mark" aria-hidden="true" />
          <span>{t.navigation.brand}</span>
        </button>

        <nav
          className={`nav-list ${isNavOpen ? "is-open" : ""}`}
          id="site-nav"
          aria-label={t.navigation.navLabel}
        >
          {t.navigation.sections.map((section) => (
            <button key={section.id} type="button" onClick={() => scrollToSection(section.id)}>
              {section.label}
            </button>
          ))}
        </nav>

        <div className="topbar__actions">
          <button
            className={`menu-toggle ${isNavOpen ? "is-open" : ""}`}
            type="button"
            aria-controls="site-nav"
            aria-expanded={isNavOpen}
            aria-label={isNavOpen ? t.common.close : t.navigation.navLabel}
            onClick={() => setIsNavOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
          <LanguageSwitcher lang={t.languageLabel} label={t.switchLabel} onToggle={toggleLanguage} />
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero__media" aria-hidden="true">
            {mediaPlan.heroVideo ? (
              <video
                className="hero__video"
                src={mediaPlan.heroVideo.src}
                poster={mediaPlan.heroImage?.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : mediaPlan.heroImage ? (
              <img className="hero__image" src={mediaPlan.heroImage.src} alt="" />
            ) : (
              <div className="hero__empty" />
            )}

            <div className="hero__overlay" />
          </div>

          <div className="section-shell hero__shell">
            <div className="hero__copy">
              <span className="section-heading__kicker">{t.hero.kicker}</span>
              <h1>{t.hero.title}</h1>
              <p className="hero__description">{t.hero.description}</p>

              <div className="hero__actions">
                <button className="button button--primary" type="button" onClick={() => scrollToSection("story")}>
                  {t.hero.primaryAction}
                </button>
                <button className="button button--ghost" type="button" onClick={() => scrollToSection("relief")}>
                  {t.hero.secondaryAction}
                </button>
              </div>

              <div className="hero__note glass-panel">
                <strong>{t.hero.noteTitle}</strong>
                <p>{t.hero.noteText}</p>
              </div>
            </div>

            <aside className="hero__aside glass-panel">
              <div className="hero__aside-media">
                {mediaPlan.heroImage ? (
                  <img src={mediaPlan.heroImage.src} alt={t.hero.previewAlt} />
                ) : (
                  <div className="media-fallback">{t.common.emptyMedia}</div>
                )}
              </div>

              <div className="hero__stats">
                {t.hero.stats.map((item) => (
                  <article className="stat-card" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section-shell" id="story">
          <SectionHeading kicker={t.story.kicker} title={t.story.title} text={t.story.text} />

          <div className="story-layout">
            <figure className="media-panel glass-panel" data-reveal>
              {mediaPlan.storyImage ? (
                <img src={mediaPlan.storyImage.src} alt={t.story.imageAlt} loading="lazy" />
              ) : (
                <div className="media-fallback">{t.common.emptyMedia}</div>
              )}
            </figure>

            <div className="story-grid">
              {t.story.moments.map((moment) => (
                <article className="insight-card glass-panel" key={moment.title} data-reveal>
                  <span className="insight-card__eyebrow">{moment.eyebrow}</span>
                  <h3>{moment.title}</h3>
                  <p>{moment.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="experience">
          <SectionHeading
            kicker={t.experiences.kicker}
            title={t.experiences.title}
            text={t.experiences.text}
          />

          <div className="experience-grid">
            {t.experiences.items.map((item, index) => {
              const media = mediaPlan.experienceImages[index] ?? mediaPlan.heroImage;

              return (
                <article className="experience-card glass-panel" key={item.title} data-reveal>
                  <div className="experience-card__media">
                    {media ? (
                      <img src={media.src} alt={item.title} loading="lazy" />
                    ) : (
                      <div className="media-fallback">{t.common.emptyMedia}</div>
                    )}
                  </div>
                  <div className="experience-card__body">
                    <span className="insight-card__eyebrow">{item.eyebrow}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section-shell" id="relief">
          <SectionHeading kicker={t.relief.kicker} title={t.relief.title} text={t.relief.text} />
          <MountainExplore copy={t.relief} />
        </section>

        <section className="section-shell" id="panorama">
          <SectionHeading kicker={t.panorama.kicker} title={t.panorama.title} text={t.panorama.text} />

          <div className="panorama-layout">
            <figure className="panorama-image glass-panel" data-reveal>
              {mediaPlan.panoramaImage ? (
                <img src={mediaPlan.panoramaImage.src} alt={t.panorama.imageAlt} loading="lazy" />
              ) : (
                <div className="media-fallback">{t.common.emptyMedia}</div>
              )}
            </figure>

            <div className="panorama-stack">
              <article className="quote-card glass-panel" data-reveal>
                <span className="insight-card__eyebrow">{t.panorama.panelLabel}</span>
                <h3>{t.panorama.panelTitle}</h3>
                <p>{t.panorama.panelText}</p>
              </article>

              {t.panorama.details.map((detail) => (
                <article className="detail-card glass-panel" key={detail.title} data-reveal>
                  <span className="detail-card__number">{detail.number}</span>
                  <h3>{detail.title}</h3>
                  <p>{detail.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="gallery">
          <SectionHeading kicker={t.gallery.kicker} title={t.gallery.title} text={t.gallery.text} />
          <Gallery copy={t.gallery} items={galleryItems} />
        </section>

        <section className="section-shell" id="emotion">
          <SectionHeading kicker={t.emotion.kicker} title={t.emotion.title} text={t.emotion.text} />

          <div className="emotion-layout">
            <div className="quote-grid">
              {t.emotion.quotes.map((quote) => (
                <article className="quote-card glass-panel" key={quote.text} data-reveal>
                  <p className="quote-card__text">"{quote.text}"</p>
                  <span className="quote-card__context">{quote.context}</span>
                </article>
              ))}
            </div>

            <figure className="emotion-media glass-panel" data-reveal>
              {mediaPlan.emotionImage ? (
                <img src={mediaPlan.emotionImage.src} alt={t.emotion.imageAlt} loading="lazy" />
              ) : (
                <div className="media-fallback">{t.common.emptyMedia}</div>
              )}
            </figure>
          </div>
        </section>

        <section className="section-shell" id="visit">
          <div className="cta-shell glass-panel" data-reveal>
            <div className="cta-shell__media" aria-hidden="true">
              {mediaPlan.panoramaImage ? (
                <img src={mediaPlan.panoramaImage.src} alt="" loading="lazy" />
              ) : (
                <div className="hero__empty" />
              )}
              <div className="cta-shell__overlay" />
            </div>

            <div className="cta-shell__copy">
              <span className="section-heading__kicker">{t.cta.kicker}</span>
              <h2>{t.cta.title}</h2>
              <p>{t.cta.text}</p>

              <div className="hero__actions">
                <button className="button button--primary" type="button" onClick={() => scrollToSection("top")}>
                  {t.cta.primaryAction}
                </button>
                <button className="button button--ghost" type="button" onClick={() => scrollToSection("gallery")}>
                  {t.cta.secondaryAction}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-shell">
<p>
  {t.footer.note}{" "}
  <a href={t.footer.link} target="_blank" rel="noreferrer">
    Lien LinkedIn
  </a>
</p>
      </footer>

      <VisitGuide copy={t.guide} lang={lang} onAction={scrollToSection} />
    </div>
  );
}

export default App;
