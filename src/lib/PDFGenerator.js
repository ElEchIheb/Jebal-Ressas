import { formatAssetSize } from "./localAssets";

function createSections({ assetList, generationDate, language }) {
  const sectionsByLanguage = {
    fr: {
      title: "Jebel Ressas Experience",
      subtitle: `Project report generated on ${generationDate}`,
      sections: [
        {
          title: "1. Project Overview",
          lines: [
            "Name: Jebel Ressas Experience",
            "Purpose: Deliver a premium eco-tourism frontend focused on Jebel Ressas with local media, smart guidance, interactive 3D, mapping, and a downloadable report."
          ]
        },
        {
          title: "2. Technologies Used",
          lines: [
            "React",
            "Vite",
            "Leaflet",
            "Three.js",
            "GSAP",
            "jsPDF",
            "Automatic local asset manifest from public/assets"
          ]
        },
        {
          title: "3. Features",
          lines: [
            "Smart AI Assistant with intent scoring and action suggestions",
            "3D Visualization with procedural terrain, lighting, fog, and hover points",
            "Interactive Map for massif, approach, and summit",
            "Gallery system with image/video filters and smooth lightbox",
            "Local hero video support when MP4 is available"
          ]
        },
        {
          title: "4. Design Approach",
          lines: [
            "Eco-tourism concept built around the materiality of the mountain, cinematic spacing, and premium motion.",
            "UX strategy: clear orientation first, then exploration, then documentation via PDF."
          ]
        },
        {
          title: "5. Assets Used",
          lines: assetList.length
            ? assetList
            : ["No local assets were detected in public/assets at generation time."]
        },
        {
          title: "6. How to Run Project",
          lines: ["npm install", "npm run dev", "npm run build", "npm run preview"]
        },
        {
          title: "7. Future Improvements",
          lines: [
            "Replace the stylized terrain with a higher fidelity terrain model if survey data becomes available.",
            "Add optional live weather integration and route condition updates.",
            "Add multilingual structured trip plans and downloadable offline notes."
          ]
        }
      ]
    },
    ar: {
      title: "Jebel Ressas Experience",
      subtitle: `Generated on ${generationDate}`,
      sections: [
        {
          title: "1. Project Overview",
          lines: [
            "Name: Jebel Ressas Experience",
            "Purpose: A premium eco-tourism frontend focused on Jebel Ressas with local media, smart guidance, interactive 3D, mapping, and a downloadable report."
          ]
        },
        {
          title: "2. Technologies Used",
          lines: [
            "React",
            "Vite",
            "Leaflet",
            "Three.js",
            "GSAP",
            "jsPDF",
            "Automatic local asset manifest from public/assets"
          ]
        },
        {
          title: "3. Features",
          lines: [
            "Smart AI Assistant with intent scoring and action suggestions",
            "3D Visualization with procedural terrain, lighting, fog, and hover points",
            "Interactive Map for massif, approach, and summit",
            "Gallery system with image/video filters and smooth lightbox",
            "Local hero video support when MP4 is available"
          ]
        },
        {
          title: "4. Design Approach",
          lines: [
            "Eco-tourism concept centered on the mountain, cinematic pacing, and premium readability.",
            "UX strategy: orient the visitor, then immerse them, then let them export the project summary."
          ]
        },
        {
          title: "5. Assets Used",
          lines: assetList.length
            ? assetList
            : ["No local assets were detected in public/assets at generation time."]
        },
        {
          title: "6. How to Run Project",
          lines: ["npm install", "npm run dev", "npm run build", "npm run preview"]
        },
        {
          title: "7. Future Improvements",
          lines: [
            "Replace the stylized terrain with a higher fidelity terrain model if survey data becomes available.",
            "Add optional live weather integration and route condition updates.",
            "Add multilingual structured trip plans and downloadable offline notes."
          ]
        }
      ]
    }
  };

  return sectionsByLanguage[language] ?? sectionsByLanguage.fr;
}

function addWrappedText(doc, text, x, y, width, lineHeight) {
  const lines = doc.splitTextToSize(text, width);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

export async function generateProjectReport({ assets, language = "fr" }) {
  const module = await import("jspdf");
  const { jsPDF } = module;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 52;
  const contentWidth = pageWidth - margin * 2;
  const lineHeight = 18;

  const generationDate = new Intl.DateTimeFormat(language === "ar" ? "ar-TN" : "en-GB", {
    dateStyle: "long"
  }).format(new Date());

  const assetList = assets.map(
    (asset) => `${asset.name} - ${asset.type} - ${formatAssetSize(asset.size)}`
  );

  const report = createSections({ assetList, generationDate, language });
  let y = margin;

  const ensureSpace = (requiredHeight = 80) => {
    if (y + requiredHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  doc.setFillColor(24, 40, 31);
  doc.roundedRect(margin, margin, contentWidth, 88, 18, 18, "F");
  doc.setTextColor(247, 242, 232);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(report.title, margin + 24, margin + 34);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(report.subtitle, margin + 24, margin + 58);
  y = margin + 120;

  doc.setTextColor(28, 38, 31);

  report.sections.forEach((section) => {
    ensureSpace(110);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(section.title, margin, y);
    y += 22;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    section.lines.forEach((line) => {
      ensureSpace(44);
      y = addWrappedText(doc, `• ${line}`, margin, y, contentWidth, lineHeight) + 6;
    });

    y += 10;
  });

  doc.save(`jebel-ressas-experience-report-${language}.pdf`);
}
