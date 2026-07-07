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
import { brandedDescription, pageTitle } from "~/utils/site";

const { video } = useAppConfig();
const channelUrl = video?.channelUrl;
const facebookUrl = video?.facebookUrl;

const description = brandedDescription(
  "Video editing portfolio by Delf Carl Boston — story-driven edits, motion graphics, color grading, and reels compiled from YouTube and social media work.",
);

usePageSeo({
  title: pageTitle("Video Editing"),
  description,
});
</script>
