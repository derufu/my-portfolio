<template>
  <section>
    <HomeSectionHeading>Let's connect</HomeSectionHeading>
    <div class="space-y-5">
      <NuxtLink
        v-for="link in links"
        :key="link.icon"
        :to="link.url"
        target="_blank"
        external
        class="flex items-end gap-4 dark:hover:text-gray-300 group"
      >
        <span class="text-sm">
          {{ link.name }}
        </span>
        <div
          class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"
        ></div>
        <Icon :name="link.icon" class="w-6 h-6"></Icon>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
const links = [
  // {
  //   name: "Twitter",
  //   url: "https://twitter.com/fayazara",
  //   icon: "mdi:twitter",
  // },
  {
    name: "GitHub",
    url: "https://github.com/derufu",
    icon: "mdi:github",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/delfcarlboston/",
    icon: "mdi:linkedin",
  },
  {
    name: "YouTube",
    url: "/videos",
    icon: "mdi:youtube",
  },
  {
    name: "Facebook (Project DocTrack)",
    url: "https://www.facebook.com/projectdoctrack",
    icon: "mdi:facebook",
  },
  // {
  //   name: "OnlineJobs.ph",
  //   url: "https://www.onlinejobs.ph/jobseekers/info/2645366",
  //   icon: "projects:onlinejobs",
  // },
  // {
  //   name: "Facebook",
  //   url: "https://www.facebook.com/delfcarlboston/",
  //   icon: "mdi:facebook",
  // },
];
</script>
