import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_OG_IMAGE,
  SITE_TITLE,
  siteUrl,
} from "~/utils/site";

type PageSeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export function usePageSeo(options: PageSeoOptions) {
  const route = useRoute();
  const path = options.path ?? route.path;
  const canonical = siteUrl(path);
  const isHome = path === "/";
  const title = isHome ? SITE_TITLE : options.title;
  const description = options.description || SITE_DESCRIPTION;
  const image = options.image ?? (isHome ? SITE_OG_IMAGE : SITE_IMAGE);

  useSeoMeta({
    title,
    description,
    keywords: SITE_KEYWORDS,
    author: "Delf Carl Boston",
    ogType: options.type ?? "website",
    ogSiteName: "Delf Boston",
    ogLocale: SITE_LOCALE,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: canonical,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    robots: options.noindex ? "noindex, nofollow" : "index, follow",
  });

  useHead({
    link: [{ rel: "canonical", href: canonical }],
  });
}
