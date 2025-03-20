<template>
  <NuxtLink
    class="flex items-end gap-4 group p-2 -m-2 rounded-lg"
    :to="education.url"
    target="_blank"
    external
  >
    <div class="max-w-sm">
      <h3 class="text-sm font-medium group-hover:text-primary-600">
        {{ education.name }}
      </h3>
      <p class="text-gray-400 text-sm">{{ education.year }}</p>
      <p class="text-gray-400 text-sm">{{ education.description }}</p>
    </div>
    <div
      class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"
    ></div>
    <UAvatar
      :src="education.thumbnail"
      :ui="{ rounded: 'rounded z-10 relative' }"
      size="md"
      :alt="education.name"
    />
  </NuxtLink>
</template>

<script setup>
defineProps({
  education: {
    type: Object,
    required: true,
  },
});
</script>
<!-- Test -->