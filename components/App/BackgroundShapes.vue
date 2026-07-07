<template>
  <div
    class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    aria-hidden="true"
  >
    <!-- soft gradient blobs -->
    <div
      class="shape-float absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl dark:bg-primary-500/15"
    ></div>
    <div
      class="shape-float-slow absolute -right-28 top-32 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/10"
    ></div>
    <div
      class="shape-float absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10"
    ></div>

    <!-- geometric outline shapes -->
    <div
      class="shape-spin absolute right-10 top-24 h-16 w-16 rounded-xl border border-primary-500/20 dark:border-primary-400/20"
    ></div>
    <div
      class="shape-float-slow absolute left-8 top-1/3 h-10 w-10 rotate-45 border border-fuchsia-500/20 dark:border-fuchsia-400/20"
    ></div>
    <div
      class="shape-float absolute bottom-24 right-1/4 h-0 w-0 border-x-[16px] border-b-[28px] border-x-transparent border-b-cyan-500/20 dark:border-b-cyan-400/20"
    ></div>
    <div
      class="shape-spin-slow absolute bottom-1/3 left-16 h-12 w-12 rounded-full border border-dashed border-gray-400/20 dark:border-white/10"
    ></div>

    <!-- faint dot grid -->
    <div class="dot-grid absolute inset-0 opacity-[0.35] dark:opacity-20"></div>
  </div>
</template>

<style scoped>
.dot-grid {
  background-image: radial-gradient(currentColor 0.5px, transparent 0.5px);
  background-size: 22px 22px;
  color: rgb(148 163 184 / 0.25);
}

@keyframes floaty {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-18px) translateX(10px);
  }
}

@keyframes spin-slow {
  to {
    transform: rotate(360deg);
  }
}

.shape-float {
  animation: floaty 12s ease-in-out infinite;
}
.shape-float-slow {
  animation: floaty 18s ease-in-out infinite;
}
.shape-spin {
  animation: spin-slow 26s linear infinite;
}
.shape-spin-slow {
  animation: spin-slow 40s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .shape-float,
  .shape-float-slow,
  .shape-spin,
  .shape-spin-slow {
    animation: none;
  }
}
</style>
