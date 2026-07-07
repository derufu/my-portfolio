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
  SITE_IMAGE,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_SOCIALS,
  SITE_TITLE,
  SITE_URL,
} from "~/utils/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Delf Carl Boston",
  alternateName: ["Delf Boston", "Delfincarlos Boston"],
  url: SITE_URL,
  image: SITE_IMAGE,
  jobTitle: "Web Developer & Video Editor",
  description: SITE_DESCRIPTION,
  sameAs: SITE_SOCIALS,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Davao City",
    addressCountry: "PH",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: ["Delf Carl Boston", "Delf Boston Portfolio"],
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  author: {
    "@type": "Person",
    name: "Delf Carl Boston",
    alternateName: "Delf Boston",
  },
};

useHead({
  title: SITE_TITLE,
  titleTemplate: "%s",
  meta: [
    { name: "description", content: SITE_DESCRIPTION },
    { name: "keywords", content: SITE_KEYWORDS },
    { name: "author", content: "Delf Carl Boston" },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: SITE_TITLE },
    { property: "og:description", content: SITE_DESCRIPTION },
    { property: "og:image", content: SITE_IMAGE },
    { property: "og:url", content: SITE_URL },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: SITE_TITLE },
    { name: "twitter:description", content: SITE_DESCRIPTION },
    { name: "twitter:image", content: SITE_IMAGE },
  ],
  link: [{ rel: "canonical", href: SITE_URL }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(personSchema),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify(websiteSchema),
    },
  ],
});
</script>
