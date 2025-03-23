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
  "I’ve worked on tons of little experiences over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.";
useSeoMeta({
  title: "experiences | Delf Boston",
  description,
});

const { data: experiences } = await useAsyncData("experiences-all", () =>
  queryContent("/experiences").find()
);
</script>
