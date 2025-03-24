<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Experiences" :description="description" />
    <div class="space-y-4">
      <AppExperienceCard
        v-for="(experience, id) in experiences"
        :key="id"
        :experience="experience"
      />
    </div>
  </main>
</template>

<script setup>
const description =
  "These are some of the company I've had the pleasure of working on.";
  useSeoMeta({
  title: 'Experiences | Delf Boston',
  ogTitle: 'Delf Boston',
  ogImage: '/public/projects/DELF.png',
  twitterCard: 'summary_large_image',
})
const { data: experiences } = await useAsyncData("experiences-all", () =>
  queryContent("/experiences").find()
);
</script>
