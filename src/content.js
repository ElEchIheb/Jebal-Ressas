export const content = {
  fr: {
    direction: "ltr",
    languageLabel: "FR",
    switchLabel: "العربية",
    navigation: {
      brand: "Jebel Ressas",
      navLabel: "Navigation principale",
      sections: [
        { id: "story", label: "Arrivee" },
        { id: "experience", label: "Moments" },
        { id: "relief", label: "Relief" },
        { id: "panorama", label: "Panorama" },
        { id: "gallery", label: "Galerie" },
        { id: "emotion", label: "Emotions" },
        { id: "visit", label: "Visite" }
      ]
    },
    common: {
      close: "Fermer",
      backToTop: "Retour en haut",
      openLightbox: "Ouvrir l'image",
      emptyMedia: "Ici, une image de Jebel Ressas prolongera le paysage."
    },
    hero: {
      kicker: "Jebel Ressas / Ben Arous / Tunisie",
      title: "Le silence prend de l'altitude a Jebel Ressas.",
      description:
        "Quand la montagne apparait, l'air change deja. La roche claire, le vent libre et la lumiere vaste installent une marche lente, presque meditative, ou chaque pas ouvre un peu plus l'horizon.",
      primaryAction: "Entrer dans le paysage",
      secondaryAction: "Explorer le relief",
      noteTitle: "Premiere respiration",
      noteText:
        "On vient ici pour sentir le relief se lever au-dessus de la plaine, pour laisser le bruit tomber derriere soi et pour marcher dans une lumiere qui semble plus nette qu'ailleurs.",
      previewAlt: "Vue de Jebel Ressas",
      stats: [
        { label: "Altitude", value: "795 m" },
        { label: "Region", value: "Ben Arous" },
        { label: "Atmosphere", value: "Vent et silence" }
      ]
    },
    story: {
      kicker: "Arrivee",
      title: "On approche Jebel Ressas comme on entre dans un lieu garde par le vent.",
      text:
        "D'abord, la montagne se dessine de loin. Puis la pierre devient plus presente, la vegetation se rarifie par endroits, et la sensation d'espace s'ouvre peu a peu autour de vous.",
      imageAlt: "Pente de Jebel Ressas",
      moments: [
        {
          eyebrow: "Approche",
          title: "La montagne se detache lentement",
          text:
            "La silhouette de Jebel Ressas surgit avec douceur, nette sur le ciel, comme une ligne ancienne qui rappelle la force tranquille du lieu."
        },
        {
          eyebrow: "Souffle",
          title: "Le vent ouvre l'espace",
          text:
            "Plus on avance, plus l'air devient vif. Il passe sur les herbes et sur la roche, apportant une clarte simple qui reveille les sens."
        },
        {
          eyebrow: "Calme",
          title: "Le silence devient une presence",
          text:
            "Le regard se pose plus loin, le rythme ralentit, et l'on entre dans une forme de quietude que seule la montagne sait installer."
        }
      ]
    },
    experiences: {
      kicker: "A vivre",
      title: "Quatre facons de laisser la montagne vous parler.",
      text:
        "A Jebel Ressas, la journee peut etre sportive, contemplative ou simplement lumineuse. Chaque moment prend une couleur differente selon l'heure et la hauteur.",
      items: [
        {
          eyebrow: "Randonnee",
          title: "Suivre les pentes pierreuses",
          text:
            "Marcher ici, c'est sentir la matiere sous les pieds et lire le terrain a mesure que la montagne se devoile."
        },
        {
          eyebrow: "Exploration",
          title: "Chercher les lignes les plus douces",
          text:
            "Les flancs et les replats invitent a observer le relief, a choisir un point d'appui, a avancer avec patience."
        },
        {
          eyebrow: "Photographie",
          title: "Attendre la lumiere sur la roche",
          text:
            "Le massif aime les ombres longues, les ciels clairs et les contrastes delicats entre la pierre et la plaine."
        },
        {
          eyebrow: "Repos",
          title: "S'asseoir face a l'horizon",
          text:
            "Par moments, il suffit de s'arreter, d'ecouter le vent et de laisser la vue faire le reste."
        }
      ]
    },
    relief: {
      kicker: "Explorer le relief",
      title: "La montagne se laisse approcher par le regard.",
      text:
        "Faites glisser doucement le massif pour suivre les cretes, reperer les passages plus doux et sentir comment la hauteur organise le paysage.",
      loading: "Le relief apparait...",
      hint: "Glissez doucement pour suivre les lignes du massif.",
      leadLabel: "Sous la lumiere",
      leadTitle: "Chaque face raconte une autre allure du lieu.",
      leadText:
        "Selon l'angle, Jebel Ressas parait plus abrupt, plus ouvert ou plus calme. Prenez le temps de tourner autour de ses lignes pour sentir sa presence differente d'un versant a l'autre.",
      activeLabel: "Point de regard",
      points: [
        {
          id: "viewpoint",
          shortLabel: "Belvedere",
          title: "Belvedere sur la plaine",
          text:
            "Ici, le regard s'elargit et la montagne laisse toute la plaine respirer sous vos yeux.",
          position: [0.2, 2.45, -0.35]
        },
        {
          id: "trail",
          shortLabel: "Sente douce",
          title: "Montee plus lisible",
          text:
            "Le flanc le plus doux donne envie d'une progression lente, reglee par le souffle et la lumiere.",
          position: [-1.55, 0.8, 1.1]
        },
        {
          id: "calm",
          shortLabel: "Pause calme",
          title: "Replat pour reprendre souffle",
          text:
            "Un endroit ou l'on s'arrete volontiers pour boire un peu d'eau, ecouter le vent et regarder plus loin.",
          position: [1.6, 0.95, 0.95]
        }
      ]
    },
    panorama: {
      kicker: "Depuis la hauteur",
      title: "Au sommet, le regard s'etire jusqu'a l'horizon.",
      text:
        "La recompense de Jebel Ressas tient autant dans la vue que dans la sensation d'ouverture. Le ciel parait plus large, la plaine plus calme, et le silence plus profond.",
      imageAlt: "Panorama depuis Jebel Ressas",
      panelLabel: "Ligne de crete",
      panelTitle: "La lumiere circule ici sans obstacle.",
      panelText:
        "Depuis les hauteurs, tout semble plus simple: les formes du terrain, la profondeur du ciel, la distance entre soi et le tumulte du quotidien.",
      details: [
        {
          number: "01",
          title: "Le ciel",
          text:
            "Il s'ouvre en grand au-dessus de la crete, presque liquide dans sa clarte, et accompagne chaque pause du regard."
        },
        {
          number: "02",
          title: "La plaine",
          text:
            "En contrebas, elle s'etale comme une respiration lente, donnant a la montagne toute sa noblesse de belvedere."
        },
        {
          number: "03",
          title: "Le silence",
          text:
            "La hauteur ne coupe pas le monde; elle l'eloigne juste assez pour le rendre plus doux."
        }
      ]
    },
    gallery: {
      kicker: "Galerie",
      title: "La lumiere change, la montagne aussi.",
      text: "Quelques instants de Jebel Ressas, entre pierre, vegetation et horizon ouvert.",
      empty: "Des images de Jebel Ressas viendront prolonger cette respiration.",
      openLightbox: "Ouvrir l'image",
      closeLightbox: "Fermer l'image",
      captions: [
        "Premiere lumiere sur Jebel Ressas",
        "Relief et vegetation sur le flanc de la montagne",
        "Ligne de crete au-dessus de la plaine",
        "Pierre claire sous un ciel ouvert"
      ]
    },
    emotion: {
      kicker: "Ce que l'on emporte",
      title: "Certaines montagnes laissent surtout une sensation.",
      text:
        "Jebel Ressas n'impressionne pas seulement par sa forme. Il laisse dans le corps une clarte, une respiration plus ample et une envie calme d'y revenir.",
      imageAlt: "Atmosphere de Jebel Ressas",
      quotes: [
        {
          text: "Quand le vent passe sur la pierre, on a l'impression que la montagne respire.",
          context: "Au bord du sentier"
        },
        {
          text: "Depuis la crete, la lumiere semble aller moins vite.",
          context: "A l'heure doree"
        },
        {
          text: "Ici, le silence ne vide pas le paysage; il le rend plus present.",
          context: "Face a la plaine"
        }
      ]
    },
    cta: {
      kicker: "L'appel du lieu",
      title: "Il suffit d'une marche pour que Jebel Ressas reste en memoire.",
      text:
        "Venez tot, laissez la lumiere monter sur la roche, prenez le temps de regarder loin, puis redescendez avec cette sensation rare d'avoir retrouve de l'espace.",
      primaryAction: "Revenir au debut",
      secondaryAction: "Feuilleter la galerie",
      imageAlt: "Crete de Jebel Ressas"
    },
    guide: {
      launcher: "Guide",
      openLabel: "Ouvrir le guide",
      closeLabel: "Fermer le guide",
      title: "Compagnon de visite",
      intro:
        "Je peux vous aider a choisir le meilleur moment, le rythme de marche, ce qu'il vaut mieux emporter et les endroits ou la vue s'ouvre le plus.",
      quickLabel: "Questions utiles",
      quickQuestions: [
        "Quel moment est le plus beau pour venir ?",
        "Que faut-il emporter pour marcher sereinement ?",
        "Ou la vue est-elle la plus ouverte ?",
        "Comment garder la marche douce et agreable ?"
      ],
      placeholder: "Ecrivez votre question...",
      submit: "Envoyer",
      thinking: "Le guide vous repond...",
      speaker: {
        guide: "Guide",
        user: "Vous"
      },
      actions: {
        relief: "Explorer le relief",
        panorama: "Voir l'horizon",
        gallery: "Voir les images",
        experience: "Voir les moments a vivre",
        visit: "Preparer la venue"
      }
    },
footer: {
  note: "Tous droits réservés à Iheb El Ech",
  link: "https://www.linkedin.com/in/iheb-el-ech/"
}
  },
  ar: {
    direction: "rtl",
    languageLabel: "AR",
    switchLabel: "Francais",
    navigation: {
      brand: "جبل الرصاص",
      navLabel: "التنقل الرئيسي",
      sections: [
        { id: "story", label: "الوصول" },
        { id: "experience", label: "اللحظات" },
        { id: "relief", label: "الجبل" },
        { id: "panorama", label: "البانوراما" },
        { id: "gallery", label: "المعرض" },
        { id: "emotion", label: "الأثر" },
        { id: "visit", label: "الزيارة" }
      ]
    },
    common: {
      close: "إغلاق",
      backToTop: "العودة إلى الأعلى",
      openLightbox: "افتح الصورة",
      emptyMedia: "هنا تمتد صورة من جبل الرصاص لتكمل المشهد."
    },
    hero: {
      kicker: "جبل الرصاص / بن عروس / تونس",
      title: "هنا يرتفع الصمت مع الجبل.",
      description:
        "حين يلوح جبل الرصاص من بعيد، يتبدل الهواء قبل أن تبدأ الخطوات. صخر فاتح، ريح حرة، وضوء واسع يجعل المشي أبطأ وأعمق، كأن الزمن نفسه يلين فوق السفح.",
      primaryAction: "ادخل إلى المشهد",
      secondaryAction: "استكشف الجبل",
      noteTitle: "النفس الأول",
      noteText:
        "يأتي الناس إلى هذا الجبل ليشعروا بعلو الصخر فوق السهل، وليتركوا الضجيج خلفهم، وليمشوا داخل ضوء واضح يمنح المكان هيبته الهادئة.",
      previewAlt: "مشهد من جبل الرصاص",
      stats: [
        { label: "الارتفاع", value: "795م" },
        { label: "الموقع", value: "بن عروس" },
        { label: "الإحساس", value: "هواء وصمت" }
      ]
    },
    story: {
      kicker: "الوصول",
      title: "الاقتراب من جبل الرصاص يشبه الدخول إلى مكان تحفظه الريح.",
      text:
        "في البداية يظهر الجبل كخط واضح في الأفق، ثم تقترب الحجارة، وتخف كثافة النبات في بعض المواضع، ويتسع الفراغ من حولك شيئا فشيئا.",
      imageAlt: "سفح جبل الرصاص",
      moments: [
        {
          eyebrow: "الاقتراب",
          title: "الجبل يخرج من الأفق بهدوء",
          text:
            "تظهر كتلة جبل الرصاص بثبات ووضوح، كأنها علامة قديمة تعرف الطريق وتمنح المكان ثقله الهادئ."
        },
        {
          eyebrow: "الهواء",
          title: "الريح تفتح المسافة",
          text:
            "كلما تقدمت صار الهواء أخف وأصفى. يمر فوق العشب والصخر ويوقظ الحواس دون ضجيج."
        },
        {
          eyebrow: "السكينة",
          title: "الصمت يصبح حضورا",
          text:
            "يتباطأ الإيقاع، يبتعد ما حولك قليلا، ويبدأ الجبل في منحك ذلك الصفاء الذي لا يوجد إلا في الأماكن المرتفعة."
        }
      ]
    },
    experiences: {
      kicker: "ما يمكن عيشه",
      title: "أربع طرق كي تترك الجبل يتحدث إليك.",
      text:
        "في جبل الرصاص يمكن لليوم أن يكون مشيا وتأملا وتصويرا وراحة. كل لحظة تأخذ لونها الخاص بحسب الضوء والارتفاع.",
      items: [
        {
          eyebrow: "المشي",
          title: "اتباع السفوح الحجرية",
          text: "المشي هنا يعني أن تشعر بالأرض تحت قدميك، وأن تقرأ التضاريس خطوة بعد خطوة."
        },
        {
          eyebrow: "الاستكشاف",
          title: "البحث عن المسارات الألين",
          text: "تدعوك المنحدرات والفسحات الصغيرة إلى التأمل في شكل الجبل واختيار طريقك بهدوء."
        },
        {
          eyebrow: "التصوير",
          title: "انتظار الضوء على الصخر",
          text: "هذا المكان يحب الظلال الطويلة والسماء الصافية والتباين الرقيق بين الحجر والسهل."
        },
        {
          eyebrow: "الراحة",
          title: "الجلوس أمام الأفق",
          text: "أحيانا يكفي أن تتوقف، أن تستمع إلى الريح، وأن تترك للمشهد مهمته كاملة."
        }
      ]
    },
    relief: {
      kicker: "استكشف الجبل",
      title: "اقترب من الجبل بعينيك قبل خطواتك.",
      text:
        "حرّك المشهد بهدوء لتتبع خطوط القمم، وتلاحظ الممرات الألين، وتشعر كيف يرتب الارتفاع هذا الفضاء الواسع.",
      loading: "يتشكل الجبل...",
      hint: "حرّك المشهد بهدوء لتتبع خطوط الجبل.",
      leadLabel: "تحت الضوء",
      leadTitle: "كل جهة تمنح الجبل هيئة مختلفة.",
      leadText:
        "من زاوية يبدو أكثر حدّة، ومن أخرى يبدو أهدأ وأوسع. خذ وقتك في الدوران حول ملامحه لتشعر بتبدل حضوره من سفح إلى آخر.",
      activeLabel: "موضع نظر",
      points: [
        {
          id: "viewpoint",
          shortLabel: "إطلالة",
          title: "إطلالة على السهل",
          text: "هنا يتسع النظر، ويترك الجبل للسهل أن يتنفس كاملا تحت عينيك.",
          position: [0.2, 2.45, -0.35]
        },
        {
          id: "trail",
          shortLabel: "ممر هادئ",
          title: "صعود أكثر ليونة",
          text: "هذا الجانب يدعو إلى مشي متدرج، تنظمه الأنفاس وترافقه خفة الضوء.",
          position: [-1.55, 0.8, 1.1]
        },
        {
          id: "calm",
          shortLabel: "استراحة",
          title: "فسحة لالتقاط النفس",
          text: "مكان مناسب للتوقف، لشربة ماء قصيرة، ولإصغاء هادئ إلى الريح قبل مواصلة الطريق.",
          position: [1.6, 0.95, 0.95]
        }
      ]
    },
    panorama: {
      kicker: "من العلو",
      title: "عند القمة يتمدد النظر حتى آخر الأفق.",
      text:
        "هبة جبل الرصاص ليست في المشهد وحده، بل في الإحساس الواسع الذي يرافقه. السماء أكبر، والسهل أهدأ، والصمت أعمق.",
      imageAlt: "بانوراما من جبل الرصاص",
      panelLabel: "خط القمة",
      panelTitle: "الضوء يمر هنا بلا عائق.",
      panelText:
        "من الأعلى تبدو الأشياء أبسط: شكل الأرض، عمق السماء، والمسافة التي تفصل القلب عن صخب اليوم.",
      details: [
        {
          number: "01",
          title: "السماء",
          text: "تنفتح فوق القمة باتساع نادر، صافية وخفيفة، وتمنح كل وقفة معنى أطول."
        },
        {
          number: "02",
          title: "السهل",
          text: "يمتد في الأسفل كتنفس بطيء، فيزيد الجبل حضورا ويمنح الوقوف فوقه رهبة جميلة."
        },
        {
          number: "03",
          title: "الصمت",
          text: "العلو لا يقطع العالم، لكنه يبعده بالقدر الذي يجعل كل شيء أكثر لطفا."
        }
      ]
    },
    gallery: {
      kicker: "المعرض",
      title: "كل تبدل في الضوء يكشف وجها آخر للجبل.",
      text: "لحظات من جبل الرصاص بين الصخر والنبات واتساع الأفق.",
      empty: "ستأتي صور جبل الرصاص لتكمل هذا الهدوء.",
      openLightbox: "افتح الصورة",
      closeLightbox: "أغلق الصورة",
      captions: [
        "الضوء الأول على جبل الرصاص",
        "التقاء الصخر والنبات على السفح",
        "خط القمة فوق السهل",
        "صخر فاتح تحت سماء مفتوحة"
      ]
    },
    emotion: {
      kicker: "ما يبقى في الداخل",
      title: "بعض الجبال تترك في الذاكرة إحساسا قبل أن تترك صورة.",
      text:
        "جبل الرصاص لا يكتفي بشكل جميل في الأفق. إنه يترك في الجسد صفاء، وفي النفس اتساعا، وفي الذاكرة رغبة هادئة في العودة.",
      imageAlt: "أجواء جبل الرصاص",
      quotes: [
        {
          text: "حين تمر الريح فوق الصخر يبدو كأن الجبل يتنفس.",
          context: "على حافة المسار"
        },
        {
          text: "من القمة يصبح الضوء أبطأ وألين.",
          context: "وقت الغروب"
        },
        {
          text: "هنا لا يفرغ الصمت المكان، بل يجعله أوضح.",
          context: "أمام السهل"
        }
      ]
    },
    cta: {
      kicker: "نداء المكان",
      title: "تكفيك رحلة واحدة ليبقى جبل الرصاص معك.",
      text:
        "تعال في ساعة هادئة، دع الضوء يصعد على الصخر، وانظر بعيدا بما يكفي لتشعر أن المسافة اتسعت داخلك أيضا.",
      primaryAction: "العودة إلى البداية",
      secondaryAction: "تصفح المعرض",
      imageAlt: "قمة جبل الرصاص"
    },
    guide: {
      launcher: "دليلك",
      openLabel: "افتح الدليل",
      closeLabel: "أغلق الدليل",
      title: "دليلك في الجبل",
      intro:
        "أستطيع أن أساعدك في اختيار الوقت الأجمل، وإيقاع المشي الأنسب، وما يستحسن أن تحمله معك، وأين تتسع الإطلالة أكثر.",
      quickLabel: "أسئلة مفيدة",
      quickQuestions: [
        "ما أجمل وقت للزيارة؟",
        "ماذا أحمل معي للمشي؟",
        "أين تكون الإطلالة الأوسع؟",
        "كيف أجعل الرحلة هادئة ومريحة؟"
      ],
      placeholder: "اكتب سؤالك...",
      submit: "إرسال",
      thinking: "الدليل يجيبك...",
      speaker: {
        guide: "الدليل",
        user: "أنت"
      },
      actions: {
        relief: "استكشف الجبل",
        panorama: "شاهد الأفق",
        gallery: "شاهد الصور",
        experience: "شاهد لحظات الزيارة",
        visit: "استعد للقدوم"
      }
    },
footer: {
  note: "جميع الحقوق محفوظة لدى إيهاب العش – Iheb El Ech",
  link: "https://www.linkedin.com/in/iheb-el-ech/"
}
  }
};
