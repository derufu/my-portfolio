<template>
  <main class="min-h-screen">
    <AppHeader class="mb-10" title="Video Editing" :description="description" />
    <AppVideoPlayer />
    <div v-if="channelUrl" class="mt-8 flex justify-center">
      <UButton
        :to="channelUrl"
        target="_blank"
        external
        color="red"
        variant="soft"
        icon="mdi:youtube"
      >
        Watch the full channel on YouTube
      </UButton>
    </div>
  </main>
</template>

<script setup>
const { video } = useAppConfig();
const channelUrl = video?.channelUrl;

const description =
  "Beyond building software, I edit and produce videos. Here's a compilation of my video editing work — the full playlist is embedded below, straight from YouTube.";

useSeoMeta({
  title: "Video Editing | Delf Boston",
  description,
});
</script>
