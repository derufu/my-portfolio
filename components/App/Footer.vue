<template>
  <footer
    class="max-w-2xl mx-auto text-gray-400 dark:text-gray-600 text-sm text-center pb-8"
  >
    <br>
    <p>
      © {{ year }}
      <span itemprop="name">Delf Carl Boston</span> (Delf Boston). All rights
      reserved.
    </p>
    <p class="mt-1 text-xs">
      Web developer &amp; video editor · Davao City, Philippines
    </p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>
