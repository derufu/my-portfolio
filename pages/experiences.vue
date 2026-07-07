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
import { brandedDescription, pageTitle } from "~/utils/site";

const description = brandedDescription(
  "Professional experience of Delf Boston — web development, IT, and network management roles across government, BPO, and education sectors in Davao City.",
);

usePageSeo({
  title: pageTitle("Experience"),
  description,
});

const { data: experiences } = await useAsyncData("experiences-all", () =>
  queryContent("/experiences").find()
);
</script>
