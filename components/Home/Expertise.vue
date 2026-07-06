<template>
  <section>
    <HomeSectionHeading>What I do</HomeSectionHeading>
    <div class="grid gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="area in areas"
        :key="area.title"
        :to="area.to"
        class="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-zoop transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:shadow-zoopdark dark:hover:border-white/20"
      >
        <div
          class="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          :class="area.glow"
          aria-hidden="true"
        ></div>
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm"
          :class="area.badge"
        >
          <Icon :name="area.icon" class="h-6 w-6" />
        </div>
        <h3 class="mt-4 font-semibold text-gray-900 dark:text-white">
          {{ area.title }}
        </h3>
        <p class="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
          {{ area.description }}
        </p>
        <div class="mt-4 flex flex-wrap gap-1.5">
          <span
            v-for="tag in area.tags"
            :key="tag"
            class="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300"
          >
            {{ tag }}
          </span>
        </div>
        <span
          class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400"
        >
          {{ area.cta }}
          <Icon
            name="heroicons:arrow-long-right"
            class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
const areas = [
  {
    title: "Web Development",
    description:
      "Designing and building responsive, performant web apps and sites end to end — from database to polished UI.",
    icon: "solar:code-square-outline",
    tags: ["JavaScript", "Vue", "Nuxt", "Laravel", "Node"],
    cta: "See projects",
    to: "/projects",
    badge: "bg-gradient-to-br from-primary-500 to-cyan-500",
    glow: "bg-primary-400/50 dark:bg-primary-500/40",
  },
  {
    title: "Video Editing",
    description:
      "Cutting story-driven videos with clean pacing, motion graphics, sound design, and cinematic color grading.",
    icon: "solar:videocamera-record-outline",
    tags: ["Premiere Pro", "After Effects", "Color Grading", "Motion Graphics"],
    cta: "Watch the reel",
    to: "/videos",
    badge: "bg-gradient-to-br from-fuchsia-500 to-rose-500",
    glow: "bg-fuchsia-400/50 dark:bg-fuchsia-500/40",
  },
];
</script>
