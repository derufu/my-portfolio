<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Education" :description="description" />
    <div class="space-y-4">
      <AppEducationCard
        v-for="(education, id) in educations"
        :key="id"
        :education="education"
      />
    </div>
  </main>
</template>

<script setup>
const description =
  "I’ve worked on tons of little educations over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.";
useSeoMeta({
  title: "Educations | Delf Boston",
  description,
});

const { data: educations } = await useAsyncData("educations-all", () =>
  queryContent("/educations").find()
);
</script>
