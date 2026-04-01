export const geoFeatures = {
  center: [36.6092, 10.3344],
  bounds: [
    [36.5958, 10.3225],
    [36.6208, 10.3448]
  ],
  points: {
    massif: {
      coords: [36.6, 10.333],
      sourceUrl: "https://en.wikipedia.org/wiki/Djebel_Ressas"
    },
    trailhead: {
      coords: [36.617778, 10.335556],
      sourceUrl: "https://climbingaway.fr/en/climbing-areas/djebel-ressas"
    },
    summit: {
      coords: [36.60579, 10.33613],
      sourceUrl: "https://www.openstreetmap.org/node/2629774802"
    }
  }
};

export const content = {
  fr: {
    direction: "ltr",
    languageLabel: "FR",
    switchLabel: "العربية",
    navigation: {
      brand: "Jebel Ressas Experience",
      navLabel: "Navigation principale",
      sections: [
        { id: "overview", label: "Apercu" },
        { id: "experiences", label: "Moments" },
        { id: "map", label: "Carte" },
        { id: "three-d", label: "3D" },
        { id: "guide", label: "Guide IA" },
        { id: "gallery", label: "Galerie" },
        { id: "report", label: "Rapport" }
      ],
      guideButton: "Ouvrir le guide",
      reportButton: "Download Report"
    },
    common: {
      close: "Fermer",
      backToTop: "Retour en haut",
      openLightbox: "Ouvrir le media",
      emptyMedia: "Ajoutez des medias dans public/assets pour enrichir automatiquement l'experience."
    },
    hero: {
      kicker: "Jebel Ressas / Ben Arous / Tunisie",
      title: "Une experience locale, cinematique et interactive construite a partir de vos medias.",
      description:
        "Le site exploite automatiquement les images et la video de public/assets pour composer un parcours premium autour du relief, de la marche, de la securite et de la contemplation de Jebel Ressas.",
      primaryAction: "Voir la carte",
      secondaryAction: "Lancer la scene 3D",
      tertiaryAction: "Download Report",
      noteTitle: "Media pipeline local",
      noteText:
        "Si une video MP4 est presente, elle devient automatiquement le fond hero. Les images JPG, PNG et WEBP sont ensuite distribuees dans les cartes, la galerie et les sections de respiration visuelle.",
      stats: [
        { label: "Altitude repere", value: "795 m" },
        { label: "Massif localise", value: "Ben Arous" },
        { label: "Assets locaux", value: "Auto detectes" }
      ]
    },
    overview: {
      kicker: "Direction artistique",
      title: "Le design marie cinema naturel, lisibilite premium et navigation utile.",
      text:
        "Le systeme visuel s'appuie sur des contrastes plus nets, des transitions plus fluides, une video hero si disponible et des supports media qui restent 100% locaux.",
      highlights: [
        {
          eyebrow: "Local first",
          title: "Tous les visuels viennent de public/assets",
          text:
            "Aucune image externe n'est chargee. Le site detecte automatiquement vos fichiers et les attribue aux bonnes zones d'experience."
        },
        {
          eyebrow: "UX",
          title: "Une lecture claire entre emotion, orientation et action",
          text:
            "Chaque section mene soit vers la carte, soit vers la scene 3D, soit vers la galerie, soit vers le guide intelligent."
        },
        {
          eyebrow: "Performance",
          title: "Chargement progressif et medias optimises",
          text:
            "Les images sont en lazy-loading, la video hero reste en preload metadata et les modules lourds sont differes jusqu'a ce qu'ils soient utiles."
        }
      ]
    },
    experiences: {
      kicker: "Moments sur place",
      title: "Des cartes media qui traduisent le panorama, le sommet et l'ambiance du massif.",
      text:
        "Les medias locaux sont reutilises intelligemment pour evoquer la lecture du relief, les points de vue et l'intensite de la marche a Jebel Ressas.",
      items: [
        {
          eyebrow: "Panorama",
          title: "Lire le massif depuis la plaine",
          text:
            "Une premiere carte installe la silhouette du relief et la relation entre montagne, verdure et ciel ouvert."
        },
        {
          eyebrow: "Sommet",
          title: "Comprendre l'appel de la crete",
          text:
            "La seconde carte valorise les points hauts, les reperes de sommet et la sensation d'arrivee."
        },
        {
          eyebrow: "Atmosphere",
          title: "Observer la montagne quand la lumiere change",
          text:
            "La derniere carte laisse place au contraste plus dramatique, utile pour une lecture sensible du site."
        }
      ]
    },
    map: {
      kicker: "Carte interactive",
      title: "Situer Jebel Ressas, visualiser l'approche et repenser l'orientation avant la marche.",
      text:
        "La carte conserve des reperes publics utiles pour preparer le parcours: massif, point d'approche et sommet. Le guide IA peut ensuite renvoyer directement vers cette section.",
      loading: "Chargement de la carte...",
      attribution: "Fond de carte OpenStreetMap",
      cards: [
        {
          number: "01",
          title: "Point principal",
          text: "Le massif reste le centre narratif et visuel de toute l'experience."
        },
        {
          number: "02",
          title: "Approche",
          text: "Le point de depart sert de repere simple pour parler acces, rythme et equipement."
        },
        {
          number: "03",
          title: "Sommet",
          text: "La vue haute devient a la fois un objectif de marche et une cle de lecture photographique."
        }
      ],
      points: [
        {
          id: "massif",
          variant: "massif",
          title: "Jebel Ressas",
          text: "Repere principal du massif.",
          sourceLabel: "Source",
          legend: "Massif"
        },
        {
          id: "trailhead",
          variant: "trailhead",
          title: "Point d'approche",
          text: "Repere de parking / acces pour l'approche.",
          sourceLabel: "Source",
          legend: "Approche"
        },
        {
          id: "summit",
          variant: "summit",
          title: "Sommet",
          text: "Point haut de reference pour la vue.",
          sourceLabel: "Source",
          legend: "Sommet"
        }
      ]
    },
    three: {
      kicker: "Exploration 3D",
      title: "Une scene plus profonde, plus lumineuse et plus proche d'un relief vivant.",
      text:
        "Le nouveau terrain Three.js ajoute texture procedurale, ombres douces, ciel graduel, brouillard leger, points interactifs et camera plus fluide pour rendre l'exploration plus credible.",
      loading: "Chargement de la scene 3D...",
      facts: [
        {
          number: "A",
          title: "Terrain stylise",
          text: "La geometrie est deformee pour evoquer une masse rocheuse unique, avec relief et crete plus nets."
        },
        {
          number: "B",
          title: "Lumiere et matiere",
          text: "Le materiau utilise des textures generees localement dans le navigateur pour suggerer la roche et le sol."
        },
        {
          number: "C",
          title: "Interaction fluide",
          text: "Rotation, zoom, hover sur les points d'interet et animation lente renforcent la qualite percue."
        }
      ],
      labels: [
        {
          title: "Sommet",
          text: "Point haut a observer et a photographier.",
          position: [0.15, 2.65, -0.2]
        },
        {
          title: "Face rocheuse",
          text: "Une lecture plus minerale et plus abrupte.",
          position: [1.9, 1.2, 0.75]
        },
        {
          title: "Approche douce",
          text: "Zone plus lisible pour imaginer l'entree du parcours.",
          position: [-1.45, 0.5, 1.1]
        }
      ],
      hoverTitle: "Point survole"
    },
    guide: {
      kicker: "Guide intelligent",
      title: "Un assistant plus malin, capable de comprendre l'intention derriere la question.",
      text:
        "Le guide ne repond plus avec un bloc fixe. Il analyse les mots importants, combine plusieurs intentions si necessaire, propose une reponse evolutive et suggere la prochaine action la plus utile.",
      features: [
        {
          eyebrow: "Intentions",
          title: "Comprendre le besoin",
          text: "Timing, equipement, securite, vues, acces, photo et exploration 3D sont reconnus par une logique de score."
        },
        {
          eyebrow: "Actions",
          title: "Passer de la reponse a l'action",
          text: "Chaque reponse peut proposer d'ouvrir la carte, la galerie, la scene 3D ou le rapport."
        },
        {
          eyebrow: "Conversation",
          title: "Une interface plus vivante",
          text: "Boutons de questions, typing animation, panneau ouvrable et historique rendent l'echange beaucoup plus naturel."
        }
      ],
      openButton: "Ouvrir le guide IA"
    },
    assistant: {
      launcher: "Guide IA",
      openLabel: "Ouvrir le guide IA",
      closeLabel: "Fermer le guide IA",
      title: "Guide intelligent Jebel Ressas",
      intro:
        "Posez une question sur la visite, la securite, la meilleure lumiere, l'approche ou la scene 3D. Je peux aussi vous guider vers la carte, la galerie et le rapport.",
      placeholder: "Ex. meilleur moment pour y aller, niveau de difficulte, ou voir le sommet",
      submit: "Envoyer",
      thinking: "Le guide prepare une reponse...",
      quickQuestions: [
        "Quel est le meilleur moment pour marcher ?",
        "Quels conseils de securite suivre ?",
        "Ou commencer l'approche ?",
        "Quelles vues sont les plus photogeniques ?"
      ],
      speaker: {
        assistant: "Guide Jebel Ressas",
        user: "Vous"
      },
      actions: {
        map: "Voir la carte",
        gallery: "Voir la galerie",
        three: "Explorer la 3D",
        report: "Download Report"
      }
    },
    gallery: {
      kicker: "Galerie locale",
      title: "Filtrer images et video, puis ouvrir chaque media dans une lightbox plus douce.",
      text:
        "La galerie recense automatiquement tous les fichiers trouves dans public/assets. Les videos restent en preview silencieuse et les images se chargent seulement au moment opportun.",
      filters: {
        all: "Tout",
        images: "Images",
        videos: "Videos"
      },
      empty: "Aucun media local detecte dans public/assets.",
      closeLightbox: "Fermer la lightbox",
      mediaLabel: {
        image: "Image locale",
        video: "Video locale"
      }
    },
    report: {
      kicker: "Rapport PDF",
      title: "Generer un dossier complet du projet directement depuis le frontend.",
      text:
        "Le bouton telecharge un PDF avec l'overview du projet, les technologies, les fonctionnalites, l'approche design, la liste des medias locaux et la procedure de lancement.",
      button: "Download Report",
      generating: "Generation du rapport...",
      bullets: [
        "Vue d'ensemble du projet Jebel Ressas Experience",
        "Piles techniques et modules interactifs",
        "Liste des medias locaux detectes automatiquement",
        "Conseils de lancement et prochaines evolutions"
      ]
    },
    footer: {
      note:
        "Experience frontend locale pour Jebel Ressas avec video hero, galerie automatique, guide intelligent, scene 3D amelioree et rapport PDF telechargeable."
    }
  },
  ar: {
    direction: "rtl",
    languageLabel: "AR",
    switchLabel: "Français",
    navigation: {
      brand: "تجربة جبل الرصاص",
      navLabel: "التنقل الرئيسي",
      sections: [
        { id: "overview", label: "نظرة" },
        { id: "experiences", label: "اللحظات" },
        { id: "map", label: "الخريطة" },
        { id: "three-d", label: "ثلاثي الأبعاد" },
        { id: "guide", label: "الدليل الذكي" },
        { id: "gallery", label: "المعرض" },
        { id: "report", label: "التقرير" }
      ],
      guideButton: "افتح الدليل",
      reportButton: "حمّل التقرير"
    },
    common: {
      close: "إغلاق",
      backToTop: "العودة إلى الأعلى",
      openLightbox: "افتح الوسيط",
      emptyMedia: "أضف ملفات داخل public/assets ليتم توزيعها تلقائياً داخل التجربة."
    },
    hero: {
      kicker: "جبل الرصاص / بن عروس / تونس",
      title: "تجربة محلية غامرة ومصقولة تعتمد على الوسائط الموجودة لديك.",
      description:
        "الموقع يكتشف الصور والفيديو داخل public/assets ويعيد توظيفها تلقائياً في الواجهة، والبطاقات، والمعرض، والمشاهد البصرية الخاصة بجبل الرصاص.",
      primaryAction: "اعرض الخريطة",
      secondaryAction: "ابدأ المشهد ثلاثي الأبعاد",
      tertiaryAction: "حمّل التقرير",
      noteTitle: "خط وسائط محلي",
      noteText:
        "إذا وُجد فيديو MP4 فسيصبح خلفية البطل مباشرة. بعد ذلك يتم توزيع الصور المحلية على بطاقات التجربة والمعرض ومساحات السرد البصري.",
      stats: [
        { label: "ارتفاع مرجعي", value: "795 م" },
        { label: "الموقع", value: "بن عروس" },
        { label: "الوسائط المحلية", value: "اكتشاف تلقائي" }
      ]
    },
    overview: {
      kicker: "الهوية البصرية",
      title: "التصميم يمزج بين الطبيعة السينمائية والوضوح العملي والحركة الهادئة.",
      text:
        "الواجهة الجديدة تعتمد على وسائط محلية فقط، وتقدّم تبايناً أفضل، وانتقالات أنعم، وخلفية فيديو في القسم الأول عندما تكون متاحة.",
      highlights: [
        {
          eyebrow: "محلي بالكامل",
          title: "كل الصور والفيديو من public/assets",
          text:
            "لا يتم تحميل أي صورة خارجية. الموقع يكتشف الملفات تلقائياً ويضعها في المواضع المناسبة."
        },
        {
          eyebrow: "تجربة",
          title: "مسار واضح بين الشعور والمعلومة والفعل",
          text:
            "كل قسم يقود إلى الخريطة أو المشهد ثلاثي الأبعاد أو المعرض أو الدليل الذكي."
        },
        {
          eyebrow: "أداء",
          title: "تحميل تدريجي ووسائط أخف",
          text:
            "الصور تُحمّل عند الحاجة، والفيديو في البطل يستخدم metadata، والوحدات الثقيلة تؤجَّل حتى تصبح ضرورية."
        }
      ]
    },
    experiences: {
      kicker: "لحظات من المكان",
      title: "بطاقات بصرية تترجم المشهد، والقمة، وتبدل الضوء فوق الجبل.",
      text:
        "يُعاد استخدام الوسائط المحلية بذكاء لتمثيل شكل الجبل، وحضور القمة، وحساسية المشهد من الصباح حتى الضوء المتأخر.",
      items: [
        {
          eyebrow: "بانوراما",
          title: "قراءة الجبل من السهل",
          text:
            "البطاقة الأولى تبرز علاقة الكتلة الجبلية بالأشجار والأفق المفتوح."
        },
        {
          eyebrow: "قمة",
          title: "استيعاب جاذبية الخط العالي",
          text:
            "البطاقة الثانية تركز على لحظة الوصول وعلى العلامات المرتبطة بالقمة."
        },
        {
          eyebrow: "أجواء",
          title: "مراقبة الجبل حين يتغير الضوء",
          text:
            "البطاقة الثالثة تمنح مساحة للمشهد الأكثر درامية ولتجربة الضوء فوق الصخور."
        }
      ]
    },
    map: {
      kicker: "الخريطة التفاعلية",
      title: "حدّد الجبل، ونقطة الاقتراب، والقمة قبل بدء الرحلة.",
      text:
        "الخريطة تحتفظ بالإشارات العامة المفيدة للتهيؤ قبل المشي: الكتلة الجبلية، ونقطة الاقتراب، والقمة. ويمكن للدليل الذكي أن يوجّه إليها مباشرة.",
      loading: "جارٍ تحميل الخريطة...",
      attribution: "OpenStreetMap",
      cards: [
        {
          number: "01",
          title: "النقطة الرئيسية",
          text: "يبقى الجبل هو المركز البصري والتحريري للتجربة كلها."
        },
        {
          number: "02",
          title: "الاقتراب",
          text: "النقطة الثانية تساعد على الحديث عن الوصول، والوتيرة، وما يلزم من تجهيز."
        },
        {
          number: "03",
          title: "القمة",
          text: "القمة هي هدف بصري وهدف للمشي في الوقت نفسه."
        }
      ],
      points: [
        {
          id: "massif",
          variant: "massif",
          title: "جبل الرصاص",
          text: "المرجع الأساسي للمكان.",
          sourceLabel: "المصدر",
          legend: "الجبل"
        },
        {
          id: "trailhead",
          variant: "trailhead",
          title: "نقطة الاقتراب",
          text: "مرجع مبسط للوصول إلى بداية المسار.",
          sourceLabel: "المصدر",
          legend: "الاقتراب"
        },
        {
          id: "summit",
          variant: "summit",
          title: "القمة",
          text: "النقطة العليا المرجعية للمشهد.",
          sourceLabel: "المصدر",
          legend: "القمة"
        }
      ]
    },
    three: {
      kicker: "الاستكشاف ثلاثي الأبعاد",
      title: "مشهد أجمل وأكثر عمقاً مع ضوء أفضل وملمس أقرب للصخر الحقيقي.",
      text:
        "المشهد الجديد يضيف خامات إجرائية، وظلالاً ناعمة، وتدرجاً في السماء، وضباباً خفيفاً، ونقاطاً تفاعلية، وحركة بطيئة تجعل قراءة الجبل أكثر جاذبية.",
      loading: "جارٍ تحميل المشهد ثلاثي الأبعاد...",
      facts: [
        {
          number: "A",
          title: "تضاريس مصقولة",
          text: "الهندسة مشوهة بعناية لتوحي بجبل منفرد بكتلة صخرية أوضح."
        },
        {
          number: "B",
          title: "ضوء ومادة",
          text: "الخامة تُولّد داخل المتصفح لتعطي إحساساً بالصخر والتربة من دون أي ملفات خارجية."
        },
        {
          number: "C",
          title: "تفاعل سلس",
          text: "يمكن الدوران والتكبير والتحويم فوق النقاط المهمة مع حركة هادئة مستمرة."
        }
      ],
      labels: [
        {
          title: "القمة",
          text: "نقطة عالية مناسبة للقراءة والتصوير.",
          position: [0.15, 2.65, -0.2]
        },
        {
          title: "الواجهة الصخرية",
          text: "قراءة أكثر حدّة ووضوحاً للصخر.",
          position: [1.9, 1.2, 0.75]
        },
        {
          title: "الاقتراب الهادئ",
          text: "منطقة أسهل لتخيّل بداية الصعود.",
          position: [-1.45, 0.5, 1.1]
        }
      ],
      hoverTitle: "النقطة الحالية"
    },
    guide: {
      kicker: "الدليل الذكي",
      title: "مساعد يفهم نية السؤال ويقترح الخطوة التالية مباشرة.",
      text:
        "الرد لم يعد ثابتاً. الدليل يحلل الكلمات المهمة، ويجمع أكثر من نية عند الحاجة، ويقترح فتح الخريطة أو المعرض أو المشهد ثلاثي الأبعاد أو التقرير.",
      features: [
        {
          eyebrow: "النية",
          title: "يفهم نوع السؤال",
          text: "يستوعب الوقت الأنسب، السلامة، التجهيز، الوصول، الصور، والمشهد ثلاثي الأبعاد."
        },
        {
          eyebrow: "الفعل",
          title: "ينقلك إلى الخطوة المناسبة",
          text: "كل إجابة يمكن أن تتبعها أزرار عملية للانتقال مباشرة إلى الجزء المناسب."
        },
        {
          eyebrow: "الحوار",
          title: "واجهة محادثة أكثر حيوية",
          text: "أسئلة مقترحة، كتابة تدريجية، وفتح وإغلاق سلس يجعل الدليل أقرب إلى مساعد صغير فعلي."
        }
      ],
      openButton: "افتح الدليل الذكي"
    },
    assistant: {
      launcher: "الدليل الذكي",
      openLabel: "افتح الدليل",
      closeLabel: "أغلق الدليل",
      title: "دليل جبل الرصاص",
      intro:
        "اسأل عن وقت الزيارة، السلامة، التجهيز، الإطلالات، بداية الاقتراب أو المشهد ثلاثي الأبعاد. أستطيع أيضاً أن أوجّهك إلى المعرض أو التقرير.",
      placeholder: "مثال: ما أفضل وقت؟ ما درجة الصعوبة؟ أين تبدأ الإطلالة؟",
      submit: "إرسال",
      thinking: "الدليل يحضّر الإجابة...",
      quickQuestions: [
        "ما أفضل وقت للمشي؟",
        "ما أهم نصائح السلامة؟",
        "من أين تبدأ المقاربة؟",
        "أين أجد أفضل الصور؟"
      ],
      speaker: {
        assistant: "دليل جبل الرصاص",
        user: "أنت"
      },
      actions: {
        map: "افتح الخريطة",
        gallery: "اعرض المعرض",
        three: "ابدأ 3D",
        report: "حمّل التقرير"
      }
    },
    gallery: {
      kicker: "المعرض المحلي",
      title: "صفِّ الصور والفيديو ثم افتح كل وسيط داخل lightbox أنعم وأكثر أناقة.",
      text:
        "المعرض يقرأ كل الملفات الموجودة في public/assets تلقائياً. الفيديو يُعرض بمعاينة صامتة، والصور تُحمّل فقط عندما تصبح قريبة من المشاهدة.",
      filters: {
        all: "الكل",
        images: "الصور",
        videos: "الفيديو"
      },
      empty: "لا توجد وسائط محلية داخل public/assets.",
      closeLightbox: "أغلق lightbox",
      mediaLabel: {
        image: "صورة محلية",
        video: "فيديو محلي"
      }
    },
    report: {
      kicker: "تقرير PDF",
      title: "ولّد ملفاً كاملاً عن المشروع مباشرة من الواجهة.",
      text:
        "الزر يحمّل تقرير PDF يضم نظرة عامة، والتقنيات المستعملة، والوظائف، ونهج التصميم، وقائمة الوسائط المحلية، وطريقة تشغيل المشروع، والتحسينات المستقبلية.",
      button: "حمّل التقرير",
      generating: "جارٍ توليد التقرير...",
      bullets: [
        "ملخص مشروع Jebel Ressas Experience",
        "التقنيات والوحدات التفاعلية",
        "قائمة الوسائط المحلية المكتشفة تلقائياً",
        "طريقة التشغيل والنسخ القادمة"
      ]
    },
    footer: {
      note:
        "واجهة محلية بالكامل لجبل الرصاص مع فيديو بطل، معرض تلقائي، دليل ذكي، مشهد ثلاثي الأبعاد مطوّر، وتقرير PDF قابل للتنزيل."
    }
  }
};
