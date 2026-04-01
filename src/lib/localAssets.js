import assetCatalog from "virtual:local-assets";

function withIds(items) {
  return items.map((item, index) => ({
    ...item,
    order: index
  }));
}

export const localAssets = {
  all: withIds(assetCatalog.all),
  images: withIds(assetCatalog.images),
  videos: withIds(assetCatalog.videos)
};

function cycle(items, index) {
  if (!items.length) {
    return null;
  }

  return items[index % items.length];
}

export function buildMediaPlan() {
  const { images, videos, all } = localAssets;

  return {
    all,
    images,
    videos,
    heroVideo: videos[0] ?? null,
    heroPoster: images[0] ?? null,
    overviewImage: cycle(images, 1) ?? cycle(images, 0),
    backgroundImage: cycle(images, 2) ?? cycle(images, 0),
    guideImage: cycle(images, 2) ?? cycle(images, 0),
    reportImage: cycle(images, 3) ?? cycle(images, 0),
    experienceMedia: [cycle(images, 0), cycle(images, 2), cycle(images, 3)].filter(Boolean),
    galleryMedia: all
  };
}

export function formatAssetSize(size) {
  if (!Number.isFinite(size)) {
    return "0 KB";
  }

  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(size / 1024))} KB`;
}
