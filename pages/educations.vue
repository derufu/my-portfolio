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
  "";
useSeoMeta({
  title: "Educations | Delf Boston",
  description,
});

const { data: educations } = await useAsyncData("educations-all", () =>
  queryContent("/educations").find()
);
</script>
