<template>
  <section>
    <HomeSectionHeading to="/educations" cta="All education">
      Education
    </HomeSectionHeading>
    <div class="space-y-4">
      <AppEducationCard
        v-for="(education, id) in educations"
        :key="id"
        :education="education"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
const { data: educations } = await useAsyncData("educations-home", () =>
  queryContent("/educations").limit(3).find()
);
</script>
