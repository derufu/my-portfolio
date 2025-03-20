<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      EDUCATIONAL BACKGROUND
    </h2>
    <div class="space-y-4">
      <AppEducationCard v-for="(education, id) in educations" :key="id" :education="education" />
    </div>
    <div class="flex items-center justify-center mt-6 text-sm">
      <UButton label="All educations &rarr;" to="/educations" variant="link" color="gray" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: educations } = await useAsyncData("educations-home", () =>
  queryContent("/educations").limit(3).find()
);
</script>
