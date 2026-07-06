<template>
  <div class="mb-6 flex items-center justify-between gap-4">
    <div class="flex items-center gap-3">
      <span
        class="h-px w-6 bg-gradient-to-r from-primary-500 to-transparent"
      ></span>
      <h2
        class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400"
      >
        <slot />
      </h2>
    </div>
    <UButton
      v-if="to"
      :label="cta"
      :to="to"
      trailing-icon="heroicons:arrow-long-right"
      variant="link"
      color="primary"
      size="xs"
      :padded="false"
    />
  </div>
</template>

<script setup>
defineProps({
  to: { type: String, default: "" },
  cta: { type: String, default: "View all" },
});
</script>
