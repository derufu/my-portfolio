<template>
  <main class="min-h-screen">
    <AppHeader class="mb-10" title="Video Editing" :description="description" />
    <AppVideoPlayer />
    <div
      v-if="channelUrl || facebookUrl"
      class="mt-8 flex flex-wrap justify-center gap-3"
    >
      <UButton
        v-if="channelUrl"
        :to="channelUrl"
        target="_blank"
        external
        color="red"
        variant="soft"
        icon="mdi:youtube"
      >
        Watch the full channel on YouTube
      </UButton>
      <UButton
        v-if="facebookUrl"
        :to="facebookUrl"
        target="_blank"
        external
        color="blue"
        variant="soft"
        icon="mdi:facebook"
      >
        More edits on Facebook
      </UButton>
    </div>

    <AppFacebookVideos class="mt-14" />
  </main>
</template>

<script setup>
const { video } = useAppConfig();
const channelUrl = video?.channelUrl;
const facebookUrl = video?.facebookUrl;

const description =
  "Beyond building software, I edit and produce videos. Here's a compilation of my video editing work — the playlist below is straight from YouTube, and I post most of my edits on the Project DocTrack Facebook page.";

useSeoMeta({
  title: "Video Editing | Delf Boston",
  description,
});
</script>
