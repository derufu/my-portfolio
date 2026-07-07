<template>
  <section>
    <HomeSectionHeading>Tools &amp; stack</HomeSectionHeading>
    <div class="space-y-6">
      <div v-for="group in groups" :key="group.title">
        <p
          class="mb-3 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400"
        >
          <Icon :name="group.icon" class="h-4 w-4" :class="group.iconColor" />
          {{ group.title }}
        </p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tool in group.tools"
            :key="tool.name"
            class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-white/25"
          >
            <Icon :name="tool.icon" class="h-4 w-4" :class="tool.color" />
            {{ tool.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const groups = [
  {
    title: "Web development",
    icon: "solar:code-square-outline",
    iconColor: "text-primary-500",
    tools: [
      { name: "Laravel", icon: "logos:laravel" },
      { name: "Vue", icon: "logos:vue" },
      { name: "React", icon: "logos:react" },
      { name: "PHP", icon: "logos:php" },
      { name: "MySQL", icon: "logos:mysql-icon" },
      { name: "PostgreSQL", icon: "logos:postgresql" },
    ],
  },
  {
    title: "Video editing",
    icon: "solar:videocamera-record-outline",
    iconColor: "text-fuchsia-500",
    tools: [
      { name: "After Effects", icon: "logos:adobe-after-effects" },
      { name: "Premiere Pro", icon: "logos:adobe-premiere" },
      {
        name: "DaVinci Resolve",
        icon: "simple-icons:davinciresolve",
        color: "text-sky-500",
      },
      { name: "Canva", icon: "simple-icons:canva", color: "text-cyan-500" },
      {
        name: "CapCut",
        icon: "mdi:content-cut",
        color: "text-gray-800 dark:text-gray-100",
      },
      {
        name: "Higgsfield",
        icon: "mdi:auto-fix",
        color: "text-fuchsia-500",
      },
    ],
  },
];
</script>
