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
import { brandedDescription, pageTitle } from "~/utils/site";

const description = brandedDescription(
  "Education background of Delf Carl Boston — graduate studies and college training in information technology and related fields in the Philippines.",
);

usePageSeo({
  title: pageTitle("Education"),
  description,
});

const { data: educations } = await useAsyncData("educations-all", () =>
  queryContent("/educations").find()
);
</script>
