import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { AIChat } from "./components/AIChat";
import { Gallery } from "./components/Gallery";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { MapPanel } from "./components/MapPanel";
import { SectionHeading } from "./components/SectionHeading";
import { ThreeScene } from "./components/ThreeScene";
import { content } from "./content";
import { generateProjectReport } from "./lib/PDFGenerator";
import { buildMediaPlan, localAssets } from "./lib/localAssets";

const galleryNarratives = {
  fr: {
    image: [
      {
        title: "Panorama local du massif",
        text: "Une lecture ample de Jebel Ressas, utile pour installer le site et la profondeur du paysage."
      },
      {
        title: "Face rocheuse et vegetation",
        text: "Un cadrage qui met en tension la matiere minerale et le tapis vegetal au premier plan."
      },
      {
        title: "Sommet et repere visuel",
        text: "Une image liee a l'arrivee, a l'altitude et a la sensation de point haut."
      },
      {
        title: "Crete et lumiere nocturne",
        text: "Une ambiance plus dramatique qui rappelle la force du relief dans un contexte urbain lointain."
      }
    ],
    video: {
      title: "Sequence video locale",
      text: "La video est utilisee comme fond hero et comme media immersif dans la galerie."
    }
  },
  ar: {
    image: [
      {
        title: "بانوراما محلية للجبل",
        text: "لقطة واسعة تثبّت حضور جبل الرصاص وعمق المشهد المحيط به."
      },
      {
        title: "واجهة صخرية ونباتات",
        text: "إطار يبرز العلاقة بين المادة الصخرية والغطاء النباتي في المقدمة."
      },
      {
        title: "القمة والعلامة البصرية",
        text: "صورة مرتبطة بالوصول والارتفاع وإحساس النقطة العليا."
      },
      {
        title: "الحافة والضوء الليلي",
        text: "جو أكثر درامية يبيّن قوة التضاريس مع حضور المدينة في البعيد."
      }
    ],
    video: {
      title: "مقطع فيديو محلي",
      text: "الفيديو يُستخدم كخلفية للبطل وكوسيط غامر داخل المعرض."
    }
  }
};

function App() {
  const [lang, setLang] = useState("fr");
  const [isSwitching, setIsSwitching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [guideOpenRequest, setGuideOpenRequest] = useState(0);
  const appRef = useRef(null);
  const t = useMemo(() => content[lang], [lang]);
  const mediaPlan = useMemo(() => buildMediaPlan(), []);

  const galleryItems = useMemo(() => {
    const narrative = galleryNarratives[lang];

    return mediaPlan.galleryMedia.map((asset, index) => {
      const copyBlock =
        asset.type === "video"
          ? narrative.video
          : narrative.image[index % Math.max(1, narrative.image.length)];

      return {
        ...asset,
        title: copyBlock.title,
        text: copyBlock.text
      };
    });
  }, [lang, mediaPlan.galleryMedia]);

  const heroStats = useMemo(
    () => [
      t.hero.stats[0],
      t.hero.stats[1],
      {
        label: t.hero.stats[2].label,
        value: `${localAssets.images.length} img / ${localAssets.videos.length} vid`
      }
    ],
    [t.hero.stats]
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.direction;

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const downloadReport = async () => {
    if (isGeneratingReport) {
      return;
    }

    setIsGeneratingReport(true);

    try {
      await generateProjectReport({ assets: mediaPlan.all, language: lang });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleGuideAction = (action) => {
    if (action === "report") {
      downloadReport();
      return;
    }

    if (action === "map") {
      scrollToSection("map");
      return;
    }

    if (action === "gallery") {
      scrollToSection("gallery");
      return;
    }

    if (action === "three") {
      scrollToSection("three-d");
    }
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

      <header className={`topbar glass-panel ${isScrolled ? "topbar--scrolled" : ""}`}>
        <button className="brand" type="button" onClick={() => scrollToSection("top")}>
          <span className="brand__mark" aria-hidden="true" />
          <span>{t.navigation.brand}</span>
        </button>

        <nav className="nav-list" aria-label={t.navigation.navLabel}>
          {t.navigation.sections.map((section) => (
            <button key={section.id} type="button" onClick={() => scrollToSection(section.id)}>
              {section.label}
            </button>
          ))}
        </nav>

        <div className="topbar__actions">
          <button
            className="button button--ghost button--compact"
            type="button"
            onClick={() => setGuideOpenRequest((current) => current + 1)}
          >
            {t.navigation.guideButton}
          </button>
          <button className="button button--ghost button--compact" type="button" onClick={downloadReport}>
            {isGeneratingReport ? t.report.generating : t.navigation.reportButton}
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
                poster={mediaPlan.heroPoster?.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : mediaPlan.heroPoster ? (
              <img className="hero__image" src={mediaPlan.heroPoster.src} alt="" />
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
                <button className="button button--primary" type="button" onClick={() => scrollToSection("map")}>
                  {t.hero.primaryAction}
                </button>
                <button className="button button--ghost" type="button" onClick={() => scrollToSection("three-d")}>
                  {t.hero.secondaryAction}
                </button>
                <button className="button button--ghost" type="button" onClick={downloadReport}>
                  {isGeneratingReport ? t.report.generating : t.hero.tertiaryAction}
                </button>
              </div>

              <div className="hero__note glass-panel">
                <strong>{t.hero.noteTitle}</strong>
                <p>{t.hero.noteText}</p>
              </div>
            </div>

            <aside className="hero__aside glass-panel">
              <div className="hero__aside-media">
                {mediaPlan.heroPoster ? (
                  <img src={mediaPlan.heroPoster.src} alt="Jebel Ressas preview" />
                ) : (
                  <div className="media-fallback">{t.common.emptyMedia}</div>
                )}
              </div>

              <div className="hero__stats">
                {heroStats.map((item) => (
                  <article className="stat-card" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section-shell" id="overview">
          <SectionHeading kicker={t.overview.kicker} title={t.overview.title} text={t.overview.text} />

          <div className="overview-layout">
            <figure className="media-panel glass-panel" data-reveal>
              {mediaPlan.overviewImage ? (
                <img src={mediaPlan.overviewImage.src} alt="Jebel Ressas local media" loading="lazy" />
              ) : (
                <div className="media-fallback">{t.common.emptyMedia}</div>
              )}
            </figure>

            <div className="insight-grid">
              {t.overview.highlights.map((item) => (
                <article className="insight-card glass-panel" key={item.title} data-reveal>
                  <span className="insight-card__eyebrow">{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="experiences">
          <SectionHeading
            kicker={t.experiences.kicker}
            title={t.experiences.title}
            text={t.experiences.text}
          />

          <div className="experience-grid">
            {t.experiences.items.map((item, index) => {
              const media = mediaPlan.experienceMedia[index] ?? mediaPlan.heroPoster;

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

        <section className="section-shell" id="map">
          <SectionHeading kicker={t.map.kicker} title={t.map.title} text={t.map.text} />

          <div className="feature-layout">
            <MapPanel copy={t.map} direction={t.direction} />

            <div className="detail-stack">
              {mediaPlan.backgroundImage ? (
                <article className="detail-media-card glass-panel" data-reveal>
                  <img src={mediaPlan.backgroundImage.src} alt="Jebel Ressas view" loading="lazy" />
                </article>
              ) : null}

              {t.map.cards.map((card) => (
                <article className="detail-card glass-panel" key={card.title} data-reveal>
                  <span className="detail-card__number">{card.number}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="three-d">
          <SectionHeading kicker={t.three.kicker} title={t.three.title} text={t.three.text} />

          <div className="feature-layout">
            <ThreeScene copy={t.three} />

            <div className="detail-stack">
              {mediaPlan.reportImage ? (
                <article className="detail-media-card glass-panel" data-reveal>
                  <img src={mediaPlan.reportImage.src} alt="Jebel Ressas summit view" loading="lazy" />
                </article>
              ) : null}

              {t.three.facts.map((fact) => (
                <article className="detail-card glass-panel" key={fact.title} data-reveal>
                  <span className="detail-card__number">{fact.number}</span>
                  <h3>{fact.title}</h3>
                  <p>{fact.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="guide">
          <SectionHeading kicker={t.guide.kicker} title={t.guide.title} text={t.guide.text} />

          <div className="guide-layout">
            <div className="detail-stack">
              {t.guide.features.map((feature) => (
                <article className="detail-card glass-panel" key={feature.title} data-reveal>
                  <span className="insight-card__eyebrow">{feature.eyebrow}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>

            <aside className="guide-panel glass-panel" data-reveal>
              <div className="guide-panel__media">
                {mediaPlan.guideImage ? (
                  <img src={mediaPlan.guideImage.src} alt="Guide visual" loading="lazy" />
                ) : (
                  <div className="media-fallback">{t.common.emptyMedia}</div>
                )}
              </div>

              <button
                className="button button--primary"
                type="button"
                onClick={() => setGuideOpenRequest((current) => current + 1)}
              >
                {t.guide.openButton}
              </button>
            </aside>
          </div>
        </section>

        <section className="section-shell" id="gallery">
          <SectionHeading kicker={t.gallery.kicker} title={t.gallery.title} text={t.gallery.text} />
          <Gallery copy={t.gallery} items={galleryItems} />
        </section>

        <section className="section-shell" id="report">
          <SectionHeading kicker={t.report.kicker} title={t.report.title} text={t.report.text} />

          <div className="report-shell glass-panel" data-reveal>
            <div className="report-shell__copy">
              <div className="report-shell__bullets">
                {t.report.bullets.map((bullet) => (
                  <span key={bullet}>{bullet}</span>
                ))}
              </div>

              <div className="hero__actions">
                <button className="button button--primary" type="button" onClick={downloadReport}>
                  {isGeneratingReport ? t.report.generating : t.report.button}
                </button>
                <button className="button button--ghost" type="button" onClick={() => scrollToSection("top")}>
                  {t.common.backToTop}
                </button>
              </div>
            </div>

            <div className="report-shell__media">
              {mediaPlan.reportImage ? (
                <img src={mediaPlan.reportImage.src} alt="Jebel Ressas report visual" loading="lazy" />
              ) : (
                <div className="media-fallback">{t.common.emptyMedia}</div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-shell">
        <p>{t.footer.note}</p>
      </footer>

      <AIChat
        copy={t.assistant}
        lang={lang}
        onAction={handleGuideAction}
        openRequest={guideOpenRequest}
      />
    </div>
  );
}

export default App;
