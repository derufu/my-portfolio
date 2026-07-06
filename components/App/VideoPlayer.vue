<template>
  <div
    v-if="!playlistId && !configuredIds.length"
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

  <div v-else class="space-y-4">
    <div
      class="relative w-full overflow-hidden rounded-xl bg-black shadow-zoop ring-1 ring-gray-200 dark:shadow-zoopdark dark:ring-white/10"
      style="aspect-ratio: 16 / 9"
    >
      <div v-show="activated" class="absolute inset-0 h-full w-full">
        <div ref="playerEl" class="h-full w-full"></div>
      </div>

      <button
        v-if="!activated"
        type="button"
        class="group absolute inset-0 flex items-center justify-center"
        aria-label="Shuffle and play"
        @click="activate()"
      >
        <span
          class="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
        ></span>
        <span
          class="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition group-hover:scale-110 group-hover:bg-red-500"
        >
          <Icon name="heroicons-solid:play" class="ml-1 h-7 w-7 text-white" />
        </span>
        <span
          class="absolute bottom-4 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-white/90"
        >
          <Icon name="mdi:shuffle-variant" class="h-4 w-4" />
          Shuffle &amp; play
        </span>
      </button>
    </div>

    <div>
      <div class="flex items-center justify-between gap-3">
        <p
          class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400"
        >
          {{ choices.length ? "Choose a video" : "Videos" }}
        </p>
        <UButton
          size="xs"
          color="gray"
          variant="soft"
          icon="mdi:shuffle-variant"
          label="Shuffle"
          :disabled="!choices.length && !playlistId"
          @click="shuffleAndPlay()"
        />
      </div>

      <div
        v-if="choices.length"
        class="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4"
      >
        <button
          v-for="(id, i) in choices"
          :key="id + i"
          type="button"
          class="group relative overflow-hidden rounded-lg ring-1 transition"
          :class="
            i === currentIndex
              ? 'ring-2 ring-primary-500'
              : 'ring-gray-200 hover:ring-gray-300 dark:ring-white/10 dark:hover:ring-white/25'
          "
          style="aspect-ratio: 16 / 9"
          :aria-label="`Play video ${i + 1}`"
          @click="play(i)"
        >
          <img
            :src="thumbUrl(id)"
            :alt="`Video ${i + 1}`"
            loading="lazy"
            class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <span
            class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100"
            :class="{ 'opacity-100': i === currentIndex }"
          >
            <Icon
              name="heroicons-solid:play"
              class="h-6 w-6 text-white drop-shadow"
            />
          </span>
        </button>
      </div>

      <p
        v-else-if="activated"
        class="mt-3 text-xs text-gray-400 dark:text-gray-500"
      >
        Loading videos from the playlist…
      </p>
      <p v-else class="mt-3 text-xs text-gray-400 dark:text-gray-500">
        Hit play to shuffle through the reel, or pick a specific video once it
        loads.
      </p>
    </div>
  </div>
</template>

<script setup>
const { video } = useAppConfig();

const activated = ref(false);
const apiVideos = ref([]);
const currentIndex = ref(-1);
const playerEl = ref(null);

let player = null;
let poll = null;
let didAutoStart = false;
let pendingIndex = null;

const playlistId = computed(() => {
  const raw = (video?.playlistId || "").trim();
  if (!raw) return "";
  const match = raw.match(/[?&]list=([^&]+)/);
  return match ? match[1] : raw;
});

function extractVideoId(input) {
  if (!input) return "";
  const s = String(input).trim();
  const m = s.match(
    /(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/
  );
  if (m) return m[1];
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  return "";
}

const configuredIds = computed(() =>
  (video?.videos || []).map(extractVideoId).filter(Boolean)
);

// Choices come from a curated config list when present, otherwise from the
// playlist as read live by the YouTube IFrame API.
const choices = computed(() =>
  configuredIds.value.length ? configuredIds.value : apiVideos.value
);

function thumbUrl(id) {
  return `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
}

function loadYouTubeApi() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev();
      resolve(window.YT);
    };
    if (!document.querySelector("script[data-yt-iframe-api]")) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.setAttribute("data-yt-iframe-api", "true");
      document.head.appendChild(s);
    }
  });
}

async function activate(index = null) {
  if (activated.value) {
    if (index != null) play(index);
    return;
  }
  pendingIndex = index;
  activated.value = true;
  await nextTick();
  const YT = await loadYouTubeApi();

  const playerVars = {
    autoplay: 1,
    rel: 0,
    modestbranding: 1,
    playsinline: 1,
  };
  if (!configuredIds.value.length && playlistId.value) {
    playerVars.listType = "playlist";
    playerVars.list = playlistId.value;
  }

  player = new YT.Player(playerEl.value, {
    width: "100%",
    height: "100%",
    playerVars,
    events: { onReady, onStateChange },
  });
}

function onReady(event) {
  player = event.target;
  if (configuredIds.value.length) {
    player.loadPlaylist({ playlist: configuredIds.value });
  }
  startPoll();
}

function onStateChange() {
  syncCurrentIndex();
  maybeAutoStart();
}

function getList() {
  try {
    const list = player && player.getPlaylist && player.getPlaylist();
    return Array.isArray(list) ? list : [];
  } catch (_) {
    return [];
  }
}

function syncCurrentIndex() {
  try {
    if (player && player.getPlaylistIndex) {
      const i = player.getPlaylistIndex();
      if (typeof i === "number" && i >= 0) currentIndex.value = i;
    }
  } catch (_) {
    /* noop */
  }
}

function maybeAutoStart() {
  if (didAutoStart) return;
  const list = getList();
  if (!configuredIds.value.length && list.length) apiVideos.value = list;
  const size = choices.value.length;
  if (!size) return;

  didAutoStart = true;
  let target;
  if (pendingIndex != null) {
    // user picked a specific video
    target = Math.min(pendingIndex, size - 1);
  } else {
    // no explicit pick → shuffle and start on a random video
    target = Math.floor(Math.random() * size);
    try {
      player.setShuffle(true);
    } catch (_) {
      /* noop */
    }
  }
  pendingIndex = null;
  try {
    player.playVideoAt(target);
  } catch (_) {
    /* noop */
  }
  currentIndex.value = target;
}

function startPoll() {
  let tries = 0;
  poll = setInterval(() => {
    tries += 1;
    maybeAutoStart();
    syncCurrentIndex();
    if (didAutoStart || tries > 24) {
      clearInterval(poll);
      poll = null;
    }
  }, 500);
}

function play(index) {
  if (!activated.value) {
    activate(index);
    return;
  }
  try {
    player.playVideoAt(index);
    currentIndex.value = index;
  } catch (_) {
    /* noop */
  }
}

function shuffleAndPlay() {
  const size = choices.value.length;
  if (!activated.value) {
    activate(size ? Math.floor(Math.random() * size) : null);
    return;
  }
  if (!size) return;
  const next = Math.floor(Math.random() * size);
  try {
    player.setShuffle(true);
    player.playVideoAt(next);
    currentIndex.value = next;
  } catch (_) {
    /* noop */
  }
}

onBeforeUnmount(() => {
  if (poll) clearInterval(poll);
  try {
    player && player.destroy && player.destroy();
  } catch (_) {
    /* noop */
  }
});
</script>
