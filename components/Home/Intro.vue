<template>
  <div class="space-y-6">
    <NuxtImg src="/projects/DELF.png" alt="Delf Boston"
      class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-12 w-12 sm:h-16 sm:w-16"
      sizes="48px sm:64px" placeholder format="png" />
    <h1 class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
      Hello! I'm Delf Boston
    </h1>
    <p class="text-gray-900 dark:text-gray-400">
      a web developer, videographer, photographer, video editor, and network manager from Davao City,
      Philippines. I create web applications and sites using JavaScript, Laravel, Vue, &amp; Node. After years of
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
