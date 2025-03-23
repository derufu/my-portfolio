<template>
  <div class="space-y-6 text-center">
    <NuxtImg
      preset="cover"
      src="/projects/DELF.png"
      class="h-36 w-36 sm:h-36 sm:w-36 ring-2 border ring-gray-200 border-gray-300 bg-white dark:bg-gray-900 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 rounded-full mx-auto"
    />
    <h1 class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
      Hello! I'm Delf Boston
    </h1>
    <p class="text-gray-900 dark:text-gray-400">
      a web developer, video editor, and network manager working in City Government of Davao, Philippines.
      I create web applications and sites using JavaScript, Laravel, Vue, &amp; Node. After years of
      procrastination, I’ve finally built this website a personal space to share my quirky experiments, creative
      projects, and thoughts, mostly about tech and design.
    </p>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Delf Boston",
  description:
    "I'm Delf Boston, a web developer, videographer, photographer, video editor, and network manager from Davao City Philippines."
});
</script>
