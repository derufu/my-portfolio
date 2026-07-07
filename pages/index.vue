<template>
  <main class="min-h-screen">
    <div class="space-y-20">
      <HomeIntro />
      <HomeExpertise />
      <HomeToolbox />
      <HomeFeaturedProjects />
      <HomeFeaturedVideo />
      <HomeEducation />
      <HomeSocialLinks />
    </div>
  </main>
</template>

<script setup>
import { SITE_DESCRIPTION } from "~/utils/site";

usePageSeo({
  title: "",
  description: SITE_DESCRIPTION,
  path: "/",
});
</script>
