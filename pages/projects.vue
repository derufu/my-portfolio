<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Projects" :description="description" />
    <div class="space-y-4">
      <AppProjectCard
        v-for="(project, id) in projects"
        :key="id"
        :project="project"
      />
    </div>
  </main>
</template>

<script setup>
import { brandedDescription, pageTitle } from "~/utils/site";

const description = brandedDescription(
  "Web development projects by Delf Boston — Vue, Nuxt, Laravel, and full-stack apps built for government, education, and community organizations in the Philippines.",
);

usePageSeo({
  title: pageTitle("Projects"),
  description,
});

const { data: projects } = await useAsyncData("projects-all", () =>
  queryContent("/projects").find()
);
</script>
