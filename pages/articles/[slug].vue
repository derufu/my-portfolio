<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <ContentDoc v-slot="{ doc }" tag="article">
        <article>
          <h1>{{ doc.title }}</h1>
          <ContentRenderer :value="doc" />
        </article>
      </ContentDoc>
    </div>
  </main>
</template>

<script setup>
import { pageTitle } from "~/utils/site";

const route = useRoute();
const { slug } = route.params;

const { data: doc } = await useAsyncData(`article-${slug}`, () =>
  queryContent("/articles").where({ _path: `/articles/${slug}` }).findOne()
);

const title = doc.value?.title
  ? pageTitle(doc.value.title)
  : pageTitle("Article");

const description =
  doc.value?.description ||
  `Article by Delf Carl Boston (Delf Boston) on web development and programming.`;

usePageSeo({
  title,
  description,
  path: `/articles/${slug}`,
  type: "article",
});

useHead({
  meta: [{ property: "article:author", content: "Delf Carl Boston" }],
});
</script>

<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
