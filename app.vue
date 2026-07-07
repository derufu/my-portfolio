<template>
  <NuxtLoadingIndicator color="#14b8a6" />
  <AppBackgroundShapes />
  <AppNavbar />
  <div class="h-32"></div>
  <UContainer>
    <NuxtPage />
  </UContainer>
  <div class="h-32"></div>
  <AppFooter />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>

<script setup>
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL,
  personSchema,
  profilePageSchema,
  websiteSchema,
} from "~/utils/site";

useHead({
  titleTemplate: "%s",
  meta: [
    { name: "description", content: SITE_DESCRIPTION },
    { name: "keywords", content: SITE_KEYWORDS },
    { name: "author", content: "Delf Carl Boston" },
    { name: "creator", content: "Delf Carl Boston" },
    { name: "publisher", content: "Delf Boston" },
    { name: "application-name", content: "Delf Boston Portfolio" },
    {
      name: "google-site-verification",
      content: "google271a59d4b9c24142",
    },
    { name: "geo.region", content: "PH-11" },
    { name: "geo.placename", content: "Davao City" },
    { name: "theme-color", content: "#14b8a6" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Delf Boston" },
    { property: "og:locale", content: "en_PH" },
    { property: "og:title", content: SITE_TITLE },
    { property: "og:description", content: SITE_DESCRIPTION },
    { property: "og:image", content: SITE_OG_IMAGE },
    { property: "og:url", content: SITE_URL },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: "@im.delfincarlos" },
    { name: "twitter:title", content: SITE_TITLE },
    { name: "twitter:description", content: SITE_DESCRIPTION },
    { name: "twitter:image", content: SITE_OG_IMAGE },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(personSchema()),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify(websiteSchema()),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify(profilePageSchema()),
    },
  ],
});
</script>
