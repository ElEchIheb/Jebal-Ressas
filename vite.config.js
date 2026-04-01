import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const mediaExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".mp4"]);
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function toLabel(fileName) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function createLocalAssetsManifestPlugin() {
  const virtualId = "virtual:local-assets";
  const resolvedVirtualId = `\0${virtualId}`;
  const assetsDirectory = path.resolve(projectRoot, "public/assets");

  const readAssets = () => {
    if (!fs.existsSync(assetsDirectory)) {
      return [];
    }

    return fs
      .readdirSync(assetsDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => mediaExtensions.has(path.extname(name).toLowerCase()))
      .sort((left, right) => left.localeCompare(right, "en"))
      .map((name, index) => {
        const extension = path.extname(name).toLowerCase();
        const absolutePath = path.join(assetsDirectory, name);
        const stats = fs.statSync(absolutePath);

        return {
          id: `${extension.replace(".", "")}-${index}-${name}`,
          name,
          label: toLabel(name),
          extension,
          type: imageExtensions.has(extension) ? "image" : "video",
          size: stats.size,
          src: `/assets/${name}`
        };
      });
  };

  return {
    name: "local-assets-manifest",
    resolveId(id) {
      if (id === virtualId) {
        return resolvedVirtualId;
      }

      return null;
    },
    load(id) {
      if (id !== resolvedVirtualId) {
        return null;
      }

      const all = readAssets();
      const images = all.filter((asset) => asset.type === "image");
      const videos = all.filter((asset) => asset.type === "video");
      const manifest = { all, images, videos };

      return `export default ${JSON.stringify(manifest, null, 2)};`;
    }
  };
}

export default defineConfig({
  plugins: [react(), createLocalAssetsManifestPlugin()],
  server: {
    host: "0.0.0.0",
    port: 5173
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/scheduler")) {
            return "react-vendor";
          }

          if (id.includes("node_modules/three")) {
            return "three-vendor";
          }

          if (id.includes("node_modules/leaflet")) {
            return "leaflet-vendor";
          }

          if (id.includes("node_modules/gsap")) {
            return "motion-vendor";
          }

          if (id.includes("node_modules/jspdf")) {
            return "report-vendor";
          }

          return undefined;
        }
      }
    }
  }
});
