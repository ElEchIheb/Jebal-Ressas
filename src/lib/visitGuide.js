function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[؟?!.,;،]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hashText(value) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }

  return Math.abs(hash);
}

function pick(items, seed) {
  return items[seed % items.length];
}

const guideKnowledge = {
  fr: {
    greetings: ["bonjour", "salut", "bonsoir", "hello"],
    thanks: ["merci", "merci beaucoup"],
    greetingReplies: [
      "Avec plaisir. Dites-moi si vous cherchez le plus beau moment, un conseil de marche, ou simplement un endroit ou vous poser face a la vue.",
      "Je suis la pour vous aider a preparer une marche douce, choisir la meilleure lumiere, ou trouver un coin plus calme du massif."
    ],
    thanksReplies: [
      "Avec joie. Si vous voulez, je peux encore vous aider pour la lumiere, le rythme de marche ou ce qu'il vaut mieux emporter.",
      "Toujours avec plaisir. Revenez vers moi si vous hesitez sur l'heure, l'equipement ou l'endroit ou vous arreter."
    ],
    responseOpeners: [
      "Pour profiter de Jebel Ressas sans brusquer la marche, je vous conseillerais ceci.",
      "Si vous voulez garder la visite douce et lumineuse, voici ce que je vous dirais.",
      "Pour sentir le massif dans de bonnes conditions, j'irais dans cette direction."
    ],
    responseClosers: [
      "L'important est de laisser a la montagne le temps de s'ouvrir devant vous.",
      "Mieux vaut avancer calmement et garder de la place pour regarder loin.",
      "Ici, la plus belle visite reste souvent celle qui prend son temps."
    ],
    fallbackReplies: [
      "Si c'est votre premiere venue, commencez par une heure douce, gardez un rythme tranquille et laissez la lumiere vous guider vers les points hauts.",
      "Pour une visite sereine, venez quand le soleil est plus doux, prenez de l'eau, et accordez-vous des pauses pour regarder la plaine respirer sous le massif."
    ],
    topics: [
      {
        keywords: ["moment", "meilleur", "heure", "quand", "matin", "soir", "visiter", "visite", "saison"],
        replies: [
          "Le matin reste souvent le moment le plus leger: l'air est plus frais, la lumiere plus nette, et la marche se pose naturellement. En fin d'apres-midi, la roche prend aussi une tres belle profondeur si vous gardez du temps pour redescendre avant la nuit.",
          "Les heures douces sont les plus belles ici. Tenez-vous plutot au debut du jour, ou a la lumiere de fin d'apres-midi quand les reliefs se dessinent avec plus de calme."
        ],
        actions: ["panorama", "relief"]
      },
      {
        keywords: ["marcher", "marche", "randonnee", "difficile", "difficulte", "sentier", "montee", "rythme"],
        replies: [
          "La montagne se laisse mieux vivre a pas reguliers. Inutile de forcer le rythme: une montee souple, quelques pauses courtes et un souffle stable suffisent a garder la marche agreable.",
          "Le plus simple est d'aborder Jebel Ressas avec patience. Avancez legerement, laissez vos pauses venir avant la fatigue et gardez assez d'energie pour profiter de la vue en haut."
        ],
        actions: ["experience", "relief"]
      },
      {
        keywords: ["securite", "prudent", "prudence", "danger", "soleil", "chaleur", "vent", "fatigue"],
        replies: [
          "Sur ce massif, le bon reflexe est simple: surveillez la chaleur, respectez le vent et n'attendez pas l'essoufflement pour faire une pause. Si le terrain cesse d'etre clair, mieux vaut ralentir ou revenir sur vos pas.",
          "La serenite vient souvent des gestes les plus simples: regarder la lumiere, sentir le vent, boire avant d'avoir soif et s'arreter des que la fatigue coupe le plaisir de marcher."
        ],
        actions: ["visit", "relief"]
      },
      {
        keywords: ["emporter", "prendre", "sac", "chaussures", "eau", "casquette", "vetement", "equipement"],
        replies: [
          "Prenez surtout l'essentiel: de l'eau, des chaussures stables, une protection contre le soleil et une couche legere si le vent se leve sur la hauteur.",
          "Pour marcher tranquillement, il vaut mieux rester simple: un petit sac, de l'eau en quantite suffisante, un bon appui aux pieds et quelque chose pour vous proteger du soleil."
        ],
        actions: ["visit", "experience"]
      },
      {
        keywords: ["photo", "photos", "photographie", "lumiere", "coucher", "lever", "image"],
        replies: [
          "La roche est particulierement belle quand la lumiere vient de cote. Tot le matin et plus tard dans la journee, les reliefs gagnent en profondeur et les contrastes restent plus delicats.",
          "Si vous venez pour les images, cherchez les moments ou le soleil est plus bas. La pierre claire, les ombres allongees et l'ouverture sur la plaine donnent alors le plus beau souffle au paysage."
        ],
        actions: ["gallery", "panorama"]
      },
      {
        keywords: ["calme", "repos", "pause", "vue", "panorama", "horizon", "coin", "belvedere"],
        replies: [
          "Pour retrouver du calme, cherchez un replat ou la marche ralentit d'elle-meme. C'est souvent la que le regard se pose le mieux sur la plaine et que le vent devient presque une compagnie.",
          "Les endroits les plus memorables sont souvent ceux ou l'on s'arrete sans y penser. Un coin plus haut, une ligne de crete, un espace ou la vue s'ouvre: il suffit parfois d'une pause silencieuse pour sentir le lieu."
        ],
        actions: ["relief", "panorama", "gallery"]
      }
    ]
  },
  ar: {
    greetings: ["مرحبا", "اهلا", "أهلا", "سلام", "صباح", "مساء"],
    thanks: ["شكرا", "مشكور", "ممتن"],
    greetingReplies: [
      "بكل سرور. اسألني عن الوقت الأجمل، أو عن إيقاع المشي، أو عن موضع ترتاح فيه العين على الأفق.",
      "أنا هنا لأساعدك في اختيار ساعة لطيفة للمجيء، وما تحتاجه للمشي، وأين تتسع الإطلالة أكثر."
    ],
    thanksReplies: [
      "على الرحب والسعة. إذا أحببت، أستطيع أن أساعدك أيضا في وقت الزيارة أو ما يستحسن حمله معك.",
      "يسعدني ذلك. عد إليّ متى شئت إذا أردت نصيحة عن الضوء أو المشي أو أماكن التوقف."
    ],
    responseOpeners: [
      "إذا أردت أن تعيش جبل الرصاص بهدوء وجمال، فهذا ما أنصحك به.",
      "لكي تبقى الزيارة خفيفة ومريحة، أميل إلى هذا الاختيار.",
      "إذا كنت تبحث عن أجمل حضور للجبل، فابدأ من هنا."
    ],
    responseClosers: [
      "الأجمل هنا أن تترك للجبل وقتا كافيا كي ينفتح أمامك.",
      "خذ المشي بهدوء واترك جزءا من الوقت للنظر البعيد.",
      "في هذا المكان، الزيارة الأجمل هي التي لا تستعجل."
    ],
    fallbackReplies: [
      "إذا كانت هذه زيارتك الأولى، فاختر ساعة لطيفة من النهار، وخذ ماء كافيا، وامش بإيقاع هادئ يترك لك مساحة للنظر والتأمل.",
      "لزيارة مريحة، ابدأ في ضوء هادئ، واحمل ما يكفي من الماء، وخذ استراحات قصيرة كلما اتسعت الرؤية أمامك."
    ],
    topics: [
      {
        keywords: ["وقت", "متى", "أفضل", "زيارة", "الصباح", "المساء", "غروب", "شروق"],
        replies: [
          "أجمل وقت هنا هو الوقت الذي يكون فيه الضوء هادئا. الصباح الباكر يمنحك هواء ألطف وخطوات أخف، وآخر النهار يعطي الصخر عمقا جميلا إذا تركت وقتا كافيا للنزول.",
          "الساعة اللطيفة هي أفضل بداية. اختر أول النهار أو ما قبل الغروب، حين تلين الحرارة ويصبح شكل الجبل أوضح وأهدأ."
        ],
        actions: ["panorama", "relief"]
      },
      {
        keywords: ["مشي", "مسار", "صعود", "صعوبة", "رحلة", "وتيرة", "تعب"],
        replies: [
          "هذا الجبل أجمل حين تمشيه بإيقاع ثابت من دون استعجال. توقف قليلا قبل أن يثقل النفس، ودع الصعود يبقى سلسا حتى لا تفقد متعة الطريق.",
          "الأفضل هنا أن تجعل الخطوات منتظمة وخفيفة. لا حاجة إلى السرعة؛ فالجبل يكشف نفسه بهدوء، وكل وقفة قصيرة تعيد لك صفاء المشي."
        ],
        actions: ["experience", "relief"]
      },
      {
        keywords: ["سلامة", "حذر", "شمس", "حر", "رياح", "خطر", "أمان"],
        replies: [
          "لزيارة مطمئنة، راقب الشمس والريح، واشرب قبل أن يشتد العطش، ولا تواصل الصعود إذا صار التعب يقطع هدوء الرحلة أو إذا فقد المسار وضوحه.",
          "السلامة هنا تبدأ من الإصغاء للجسد وللمكان: ضوء شديد يعني راحة، ريح قوية تعني تمهلا، وتعب مفاجئ يعني وقفة قصيرة قبل أي قرار آخر."
        ],
        actions: ["visit", "relief"]
      },
      {
        keywords: ["أحمل", "أخذ", "حقيبة", "ماء", "حذاء", "قبعة", "ملابس"],
        replies: [
          "خذ معك ما يكفيك فقط: ماء، حذاء ثابت، ما يقيك الشمس، وطبقة خفيفة إذا تبدلت الريح فوق الارتفاع.",
          "البساطة هي الأفضل هنا: ماء كاف، حذاء مريح وثابت، غطاء للشمس، وشيء خفيف يرافقك إذا صار الهواء أبرد في الأعلى."
        ],
        actions: ["visit", "experience"]
      },
      {
        keywords: ["صورة", "تصوير", "ضوء", "لقطة", "مشهد", "غروب", "شروق"],
        replies: [
          "الضوء المائل هو الأجمل على هذا الصخر. في الصباح الباكر أو قبل الغروب بقليل، تصبح الخطوط أوضح والظلال أعمق من دون قسوة.",
          "إذا جئت من أجل الصور، فابحث عن الساعات التي تكون فيها الشمس منخفضة. عندها يتنفس المشهد أكثر، وتبدو القمة والسهل في توازن جميل."
        ],
        actions: ["gallery", "panorama"]
      },
      {
        keywords: ["هدوء", "استراحة", "إطلالة", "أين", "أفق", "منظر", "قمة"],
        replies: [
          "إن كنت تبحث عن السكينة، فابحث عن فسحة يتباطأ فيها المشي من تلقاء نفسه. هناك عادة تستقر العين على السهل ويصبح الهواء جزءا من التجربة.",
          "أجمل المواضع ليست دائما الأعلى فقط، بل تلك التي تجعلك تقف من دون أن تشعر. فسحة صغيرة، طرف قمة، أو مكان تنفتح منه الرؤية بهدوء."
        ],
        actions: ["relief", "panorama", "gallery"]
      }
    ]
  }
};

export function createGuideReply(message, lang = "fr") {
  const locale = guideKnowledge[lang] ?? guideKnowledge.fr;
  const normalized = normalizeText(message);
  const seed = hashText(normalized || String(Date.now()));

  if (!normalized) {
    return {
      text: pick(locale.fallbackReplies, seed),
      actions: ["relief", "experience"]
    };
  }

  if (locale.greetings.some((keyword) => normalized.includes(normalizeText(keyword)))) {
    return {
      text: pick(locale.greetingReplies, seed),
      actions: ["experience", "panorama"]
    };
  }

  if (locale.thanks.some((keyword) => normalized.includes(normalizeText(keyword)))) {
    return {
      text: pick(locale.thanksReplies, seed),
      actions: ["gallery", "visit"]
    };
  }

  const matches = locale.topics
    .map((topic) => ({
      topic,
      score: topic.keywords.reduce(
        (total, keyword) => total + (normalized.includes(normalizeText(keyword)) ? 1 : 0),
        0
      )
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score);

  if (!matches.length) {
    return {
      text: pick(locale.fallbackReplies, seed),
      actions: ["relief", "gallery"]
    };
  }

  const selected = matches.slice(0, 2).map((entry) => entry.topic);
  const body = selected
    .map((topic, index) => pick(topic.replies, seed + index * 17))
    .join(" ");
  const actions = Array.from(new Set(selected.flatMap((topic) => topic.actions))).slice(0, 3);

  return {
    text: `${pick(locale.responseOpeners, seed)} ${body} ${pick(locale.responseClosers, seed + 9)}`.trim(),
    actions
  };
}
