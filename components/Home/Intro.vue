<template>
  <section class="relative">
    <div
      class="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex justify-center"
      aria-hidden="true"
    >
      <div
        class="h-56 w-56 rounded-full bg-gradient-to-tr from-primary-400/30 via-cyan-400/20 to-fuchsia-400/20 blur-3xl dark:from-primary-500/20 dark:via-cyan-500/10 dark:to-fuchsia-500/10"
      ></div>
    </div>

    <div class="flex flex-col items-center text-center">
      <div class="relative">
        <NuxtImg
          preset="cover"
          src="/projects/DELF.png"
          alt="Delf Boston"
          class="h-28 w-28 rounded-full border border-gray-300 bg-white object-cover ring-2 ring-gray-200 transition-all duration-300 hover:ring-4 dark:border-gray-800 dark:bg-gray-900 dark:ring-white/10"
        />
        <span
          class="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-black"
        >
          <span
            class="h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-black"
          ></span>
        </span>
      </div>

      <span
        class="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs font-medium text-gray-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
      >
        <span class="h-2 w-2 rounded-full bg-green-500"></span>
        Available for freelance & collaborations
      </span>

      <h1
        class="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
      >
        Hi, I'm Delf Boston
      </h1>

      <p class="mt-3 text-lg font-semibold">
        <span
          class="bg-gradient-to-r from-primary-500 to-cyan-400 bg-clip-text text-transparent"
        >
          Web Developer
        </span>
        <span class="text-gray-400">&amp;</span>
        <span
          class="bg-gradient-to-r from-fuchsia-500 to-rose-400 bg-clip-text text-transparent"
        >
          Video Editor
        </span>
      </p>

      <p class="mt-5 max-w-xl text-gray-600 dark:text-gray-400">
        I build fast, delightful web apps with Vue, Nuxt, Laravel &amp; Node —
        and craft story-driven videos with clean cuts, motion graphics, and
        color. Based in Davao City, Philippines, currently a web developer &amp;
        network manager at the City Government of Davao.
      </p>

      <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
        <UButton
          to="/projects"
          size="lg"
          color="primary"
          icon="solar:folder-with-files-outline"
          label="View my work"
        />
        <UButton
          to="/videos"
          size="lg"
          color="gray"
          variant="soft"
          icon="heroicons-solid:play"
          label="Watch my reel"
        />
      </div>

      <div class="mt-6 flex items-center justify-center gap-2">
        <UButton
          v-for="social in socials"
          :key="social.label"
          :to="social.url"
          :icon="social.icon"
          :aria-label="social.label"
          target="_blank"
          color="gray"
          variant="ghost"
          size="lg"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
useSeoMeta({
  title: "Delf Boston — Web Developer & Video Editor",
  description:
    "Delf Boston is a web developer and video editor from Davao City, Philippines, building web apps with Vue, Nuxt, Laravel & Node and editing story-driven videos.",
});

const socials = [
  { label: "GitHub", url: "https://github.com/derufu", icon: "mdi:github" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/delfcarlboston/",
    icon: "mdi:linkedin",
  },
  { label: "YouTube", url: "/videos", icon: "mdi:youtube" },
  {
    label: "Facebook",
    url: "https://www.facebook.com/projectdoctrack",
    icon: "mdi:facebook",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/im.delfincarlos/",
    icon: "mdi:instagram",
  },
];
</script>
