<template>
  <section v-if="items.length">
    <div class="mb-4 flex items-center gap-2">
      <Icon name="mdi:facebook" class="h-5 w-5 text-[#1877F2]" />
      <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-100">
        Featured edits on Facebook
      </h3>
    </div>
    <!-- masonry so portrait (reel) and landscape videos each keep their own shape -->
    <div class="columns-2 gap-3 sm:columns-3">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="mb-3 break-inside-avoid overflow-hidden rounded-xl bg-black shadow-zoop ring-1 ring-gray-200 dark:shadow-zoopdark dark:ring-white/10"
        :style="{ aspectRatio: item.portrait ? '9 / 16' : '16 / 9' }"
      >
        <iframe
          :src="item.src"
          class="h-full w-full"
          style="border: none; overflow: hidden"
          scrolling="no"
          frameborder="0"
          loading="lazy"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
const { video } = useAppConfig();

function buildSrc(href, portrait) {
  const width = portrait ? 360 : 560;
  const height = portrait ? 640 : 314;
  const params = new URLSearchParams({
    href,
    show_text: "false",
    width: String(width),
    height: String(height),
    t: "0",
  });
  return `https://www.facebook.com/plugins/video.php?${params.toString()}`;
}

// Each entry is either a permalink string or { href, orientation }.
// Orientation defaults to portrait for reels and landscape otherwise, but can
// be overridden per video.
function normalize(entry) {
  const href = typeof entry === "string" ? entry : entry?.href;
  if (!href) return null;
  const orientation = typeof entry === "object" ? entry.orientation : undefined;
  const portrait = orientation
    ? orientation === "portrait"
    : /\/reel\//.test(href);
  return { src: buildSrc(href, portrait), portrait };
}

const items = computed(() =>
  (video?.facebookVideos || []).map(normalize).filter(Boolean)
);
</script>
