<template>
  <NuxtLoadingIndicator color="#14b8a6" />
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
// pages/index.vue
<script setup>
useHead({
  title: 'DelfBoston',
  meta: [
    { name: 'description', content: 'I develop websites' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'DelfBoston' },
    { property: 'og:description', content: 'I develop websites.' },
    { property: 'og:image', content: 'https://delfboston.site/projects/delf.png' },
    { property: 'og:url', content: 'https://delfboston.site' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'canonical', href: 'https://delfboston.site' }
  ]
})
</script>
