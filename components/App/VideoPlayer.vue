<template>
  <div
    v-if="!playlistId"
    class="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white/50 p-10 text-center dark:border-gray-700 dark:bg-white/5"
  >
    <Icon name="mdi:youtube" class="h-10 w-10 text-red-500" />
    <p class="text-sm font-medium text-gray-700 dark:text-gray-200">
      No playlist configured yet
    </p>
    <p class="max-w-sm text-xs text-gray-500 dark:text-gray-400">
      Add your YouTube playlist URL or ID to
      <code class="font-mono">video.playlistId</code> in
      <code class="font-mono">app.config.ts</code> and every video in it will
      show up here automatically.
    </p>
  </div>

  <div
    v-else
    class="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-zoop ring-1 ring-gray-200 dark:shadow-zoopdark dark:ring-white/10"
  >
    <iframe
      v-if="activated"
      :src="embedUrl"
      title="Video editing playlist"
      class="absolute inset-0 h-full w-full"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>

    <button
      v-else
      type="button"
      class="group absolute inset-0 flex items-center justify-center"
      aria-label="Play playlist"
      @click="activated = true"
    >
      <img
        v-if="thumbnail"
        :src="thumbnail"
        alt="Video editing playlist thumbnail"
        class="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
        loading="lazy"
      />
      <span
        v-else
        class="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
      ></span>
      <span
        class="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition group-hover:scale-110 group-hover:bg-red-500"
      >
        <Icon name="heroicons-solid:play" class="ml-1 h-7 w-7 text-white" />
      </span>
      <span
        class="absolute bottom-4 text-xs font-medium uppercase tracking-wide text-white/90"
      >
        Play playlist
      </span>
    </button>
  </div>
</template>

<script setup>
const { video } = useAppConfig();

const activated = ref(false);

const playlistId = computed(() => {
  const raw = (video?.playlistId || "").trim();
  if (!raw) return "";
  const match = raw.match(/[?&]list=([^&]+)/);
  return match ? match[1] : raw;
});

const thumbnail = computed(() => video?.thumbnail || "");

const embedUrl = computed(
  () =>
    `https://www.youtube.com/embed/videoseries?list=${playlistId.value}&autoplay=1&rel=0`
);
</script>
