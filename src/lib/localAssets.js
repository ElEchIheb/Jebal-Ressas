import assetCatalog from "virtual:local-assets";

function withIds(items) {
  return items.map((item, index) => ({
    ...item,
    order: index
  }));
}

function cycle(items, index) {
  if (!items.length) {
    return null;
  }

  return items[index % items.length];
}

export const localAssets = {
  all: withIds(assetCatalog.all),
  images: withIds(assetCatalog.images),
  videos: withIds(assetCatalog.videos)
};

export function buildMediaPlan() {
  const { all, images, videos } = localAssets;

  return {
    all,
    images,
    videos,
    heroVideo: videos[0] ?? null,
    heroImage: cycle(images, 0),
    storyImage: cycle(images, 1) ?? cycle(images, 0),
    panoramaImage: cycle(images, 2) ?? cycle(images, 0),
    emotionImage: cycle(images, 3) ?? cycle(images, 1) ?? cycle(images, 0),
    experienceImages: [0, 1, 2, 3].map((index) => cycle(images, index)).filter(Boolean),
    galleryImages: images
  };
}
