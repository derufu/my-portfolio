export const SITE_URL = "https://delfboston.site";

export const SITE_NAME = "Delf Boston";

export const SITE_FULL_NAME = "Delf Carl Boston";

export const SITE_TITLE =
  "Delf Boston | Delf Carl Boston — Web Developer & Video Editor Portfolio";

export const SITE_DESCRIPTION =
  "Official portfolio of Delf Carl Boston (Delf Boston) — web developer and video editor based in Davao City, Philippines. Explore web development projects, video editing work, experience, and ways to hire Delf Boston.";

export const SITE_KEYWORDS = [
  "Delf Boston",
  "Delf Carl Boston",
  "Delfincarlos Boston",
  "Delf Boston portfolio",
  "Delf Carl Boston portfolio",
  "Delf Boston web developer",
  "Delf Carl Boston web developer",
  "Delf Boston video editor",
  "web developer Davao City",
  "video editor Philippines",
  "Vue developer",
  "Nuxt developer",
  "Laravel developer",
].join(", ");

export const SITE_IMAGE = `${SITE_URL}/projects/DELF.png`;

export const SITE_OG_IMAGE = `${SITE_URL}/preview.jpg`;

export const SITE_LOCALE = "en_PH";

export const SITE_ROUTES = [
  "/",
  "/projects",
  "/videos",
  "/experiences",
  "/educations",
  "/contact",
  "/articles",
  "/lab",
  "/bookmarks",
  "/whats-in-my-bag",
];

export const SITE_SOCIALS = [
  "https://github.com/derufu",
  "https://www.linkedin.com/in/delfcarlboston/",
  "https://www.instagram.com/im.delfincarlos/",
  "https://www.facebook.com/delfcarlboston",
];

export function siteUrl(path = "/") {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageTitle(page: string) {
  return `${page} | Delf Boston | Delf Carl Boston`;
}

export function brandedDescription(sentence: string) {
  return `${sentence} — Delf Boston (Delf Carl Boston), web developer & video editor in Davao City, Philippines.`;
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_FULL_NAME,
    givenName: "Delf",
    additionalName: "Carl",
    familyName: "Boston",
    alternateName: ["Delf Boston", "Delfincarlos Boston", "derufu"],
    url: SITE_URL,
    image: SITE_IMAGE,
    jobTitle: ["Web Developer", "Video Editor", "Network Manager"],
    description: SITE_DESCRIPTION,
    email: "mailto:delf.boston@gmail.com",
    sameAs: SITE_SOCIALS,
    knowsAbout: [
      "Web Development",
      "Video Editing",
      "Vue.js",
      "Nuxt",
      "Laravel",
      "Node.js",
      "Motion Graphics",
      "Color Grading",
    ],
    worksFor: {
      "@type": "Organization",
      name: "City Government of Davao",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Davao City",
        addressCountry: "PH",
      },
    },
    homeLocation: {
      "@type": "Place",
      name: "Davao City, Philippines",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Davao City",
      addressRegion: "Davao del Sur",
      addressCountry: "PH",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: [
      SITE_FULL_NAME,
      "Delf Boston Portfolio",
      "Delf Carl Boston Portfolio",
    ],
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    name: SITE_TITLE,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    mainEntity: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}
