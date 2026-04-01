const intentLibrary = {
  greeting: {
    keywords: {
      fr: ["bonjour", "salut", "hello", "bonsoir"],
      ar: ["مرحبا", "السلام", "اهلا", "أهلا", "سلام"]
    },
    responses: {
      fr: "Bonjour. Je peux vous aider sur la visite, la securite, l'acces, les vues, la galerie, la scene 3D et le rapport du projet.",
      ar: "مرحباً. أستطيع مساعدتك في الزيارة، والسلامة، والوصول، والإطلالات، والمعرض، والمشهد ثلاثي الأبعاد، وتقرير المشروع."
    },
    actions: ["map", "three", "gallery"]
  },
  timing: {
    keywords: {
      fr: ["meilleur", "moment", "heure", "quand", "visiter", "saison", "matin", "soir"],
      ar: ["أفضل", "وقت", "متى", "زيارة", "فصل", "صباح", "مساء"]
    },
    responses: {
      fr: "Pour une sortie plus confortable, privilegiez surtout les matins et les periodes temperes. La lumiere y est plus belle et l'effort reste plus facile a gerer.",
      ar: "لزيارة أكثر راحة يفضّل الانطلاق صباحاً وفي الفترات المعتدلة، لأن الضوء يكون أجمل والجهد أسهل في الإدارة."
    },
    actions: ["map", "gallery"]
  },
  safety: {
    keywords: {
      fr: ["securite", "danger", "safety", "prudence", "risque", "soleil", "eau", "urgence"],
      ar: ["سلامة", "أمان", "خطر", "حذر", "ماء", "شمس", "طوارئ"]
    },
    responses: {
      fr: "Gardez de l'eau, des chaussures stables, une protection solaire et un telephone charge. Evitez les passages exposes si la meteo est incertaine et gardez toujours une marge pour la descente.",
      ar: "احمل ماءً كافياً، وحذاءً ثابتاً، وحماية من الشمس، وهاتفاً مشحوناً. وتجنّب المواضع المكشوفة إذا كان الطقس غير مستقر، واترك هامشاً آمناً للنزول."
    },
    actions: ["map"]
  },
  gear: {
    keywords: {
      fr: ["equipement", "porter", "chaussures", "sac", "materiel", "eau", "veste"],
      ar: ["معدات", "أحمل", "حذاء", "حقيبة", "ماء", "سترة", "عتاد"]
    },
    responses: {
      fr: "Le kit de base reste simple: chaussures a bonne accroche, eau, couche legere contre le vent, telephone charge et petit sac pour garder les mains libres.",
      ar: "التجهيز الأساسي بسيط: حذاء ثابت، وماء، وطبقة خفيفة ضد الريح، وهاتف مشحون، وحقيبة صغيرة تترك اليدين حرتين."
    },
    actions: ["map"]
  },
  access: {
    keywords: {
      fr: ["acces", "acces", "commencer", "depart", "approche", "parking", "carte", "itineraire"],
      ar: ["وصول", "بداية", "انطلاق", "مقاربة", "موقف", "خريطة", "مسار"]
    },
    responses: {
      fr: "Le meilleur repere de preparation reste la carte interactive: vous y retrouvez le massif, le point d'approche et le sommet pour structurer votre visite avant de partir.",
      ar: "أفضل نقطة للتهيؤ هي الخريطة التفاعلية، لأنها تجمع الجبل، ونقطة الاقتراب، والقمة في قراءة واحدة قبل الانطلاق."
    },
    actions: ["map"]
  },
  views: {
    keywords: {
      fr: ["vue", "panorama", "photo", "photographie", "belvedere", "sommet", "ciel", "lumiere"],
      ar: ["إطلالة", "منظر", "صورة", "تصوير", "بانوراما", "قمة", "ضوء"]
    },
    responses: {
      fr: "Pour les vues fortes, visez la ligne de crete, le sommet et les moments ou la lumiere modele bien la roche. La galerie locale vous aide aussi a comparer les cadrages deja disponibles.",
      ar: "للحصول على أفضل الإطلالات ركّز على خط القمة واللحظات التي يبرز فيها الضوء شكل الصخر. كما يساعدك المعرض المحلي على مقارنة الزوايا المتاحة."
    },
    actions: ["gallery", "three"]
  },
  difficulty: {
    keywords: {
      fr: ["difficulte", "niveau", "dur", "effort", "fatigue", "combien"],
      ar: ["صعوبة", "مستوى", "جهد", "تعب", "كم", "شاق"]
    },
    responses: {
      fr: "La difficulte depend surtout du rythme, de la chaleur et de votre preparation. Gardez un tempo regulier, partez leger et utilisez la carte pour bien lire l'approche avant de monter.",
      ar: "درجة الصعوبة تتعلق أكثر بالوتيرة، والحرارة، والاستعداد الشخصي. حافظ على إيقاع ثابت، وانطلق بخفة، واقرأ مسار الاقتراب جيداً عبر الخريطة."
    },
    actions: ["map"]
  },
  three: {
    keywords: {
      fr: ["3d", "trois", "scene", "relief", "exploration", "model"],
      ar: ["ثلاثي", "3d", "مجسم", "مشهد", "تضاريس", "استكشاف"]
    },
    responses: {
      fr: "La scene 3D sert a mieux comprendre la silhouette de Jebel Ressas: rotation libre, zoom doux, points survolables et lumiere plus realiste pour lire les volumes.",
      ar: "المشهد ثلاثي الأبعاد يساعد على فهم هيئة جبل الرصاص بشكل أفضل: تدوير حر، وتكبير ناعم، ونقاط يمكن التحويم فوقها، وإضاءة أقرب للواقع."
    },
    actions: ["three"]
  },
  report: {
    keywords: {
      fr: ["rapport", "pdf", "telecharger", "download", "tech", "projet"],
      ar: ["تقرير", "pdf", "تحميل", "تقنيات", "مشروع"]
    },
    responses: {
      fr: "Le rapport PDF resume le projet, les technologies, les fonctionnalites, l'approche design, les medias locaux et les prochaines evolutions. Vous pouvez le generer a tout moment.",
      ar: "تقرير PDF يلخّص المشروع، والتقنيات، والوظائف، ونهج التصميم، والوسائط المحلية، والتحسينات المستقبلية. ويمكن توليده في أي وقت."
    },
    actions: ["report"]
  }
};

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(values) {
  return Array.from(new Set(values));
}

function detectIntents(question, lang) {
  const normalizedQuestion = normalizeText(question);
  const tokens = normalizedQuestion.split(" ").filter(Boolean);

  const scored = Object.entries(intentLibrary)
    .map(([id, intent]) => {
      const keywords = intent.keywords[lang] ?? [];
      const score = keywords.reduce((total, keyword) => {
        const normalizedKeyword = normalizeText(keyword);
        const includesKeyword = normalizedQuestion.includes(normalizedKeyword);
        const tokenHit = tokens.some((token) => token.includes(normalizedKeyword) || normalizedKeyword.includes(token));
        return total + (includesKeyword || tokenHit ? 1 : 0);
      }, 0);

      return { id, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);

  return scored.slice(0, 3).map((item) => item.id);
}

function composeLead(intents, lang) {
  const firstIntent = intents[0];

  if (firstIntent === "safety" || firstIntent === "gear") {
    return lang === "ar"
      ? "لتحضير زيارة أكثر أماناً إلى جبل الرصاص:"
      : "Pour preparer une visite plus sure a Jebel Ressas :";
  }

  if (firstIntent === "views" || firstIntent === "three") {
    return lang === "ar"
      ? "إذا كان هدفك قراءة الجبل بصرياً بشكل أفضل:"
      : "Si votre but est de mieux lire le massif visuellement :";
  }

  return lang === "ar"
    ? "بحسب سؤالك حول جبل الرصاص:"
    : "D'apres votre question sur Jebel Ressas :";
}

function composeFallback(lang) {
  return lang === "ar"
    ? {
        text:
          "أستطيع مساعدتك في وقت الزيارة، والسلامة، والتجهيز، والوصول، والإطلالات، والمشهد ثلاثي الأبعاد، أو تقرير المشروع. جرّب سؤالاً أكثر تحديداً وسأقترح عليك الخطوة التالية أيضاً.",
        actions: ["map", "gallery", "three"]
      }
    : {
        text:
          "Je peux vous aider sur le moment ideal, la securite, l'equipement, l'acces, les vues, la scene 3D ou le rapport du projet. Posez une question plus precise et je vous proposerai aussi la bonne action.",
        actions: ["map", "gallery", "three"]
      };
}

export function createGuideReply(question, lang) {
  const intents = detectIntents(question, lang);

  if (!intents.length) {
    return composeFallback(lang);
  }

  if (intents.length === 1 && intents[0] === "greeting") {
    return {
      text: intentLibrary.greeting.responses[lang],
      actions: intentLibrary.greeting.actions
    };
  }

  const filteredIntents = intents.filter((intent) => intent !== "greeting");

  if (!filteredIntents.length) {
    return {
      text: intentLibrary.greeting.responses[lang],
      actions: intentLibrary.greeting.actions
    };
  }

  const actionIds = unique(filteredIntents.flatMap((intent) => intentLibrary[intent].actions));
  const detail = filteredIntents.map((intent) => intentLibrary[intent].responses[lang]).join(" ");
  const ending =
    lang === "ar"
      ? "إذا رغبت، يمكنني أيضاً أن أفتح لك القسم الأنسب الآن."
      : "Si vous voulez, je peux aussi vous orienter vers la bonne section maintenant.";

  return {
    text: `${composeLead(filteredIntents, lang)} ${detail} ${ending}`.trim(),
    actions: actionIds
  };
}
