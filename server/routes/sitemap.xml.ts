import { serverQueryContent } from "#content/server";
import { SITE_ROUTES, SITE_URL } from "~/utils/site";

export default defineEventHandler(async (event) => {
  const lastmod = new Date().toISOString().split("T")[0];

  let articlePaths: string[] = [];
  try {
    const articles = await serverQueryContent(event)
      .where({ _path: { $contains: "/articles/" } })
      .only(["_path"])
      .find();
    articlePaths = articles.map((article) => article._path as string);
  } catch {
    articlePaths = [];
  }

  const paths = [...new Set([...SITE_ROUTES, ...articlePaths])];
  const urls = paths
    .map((path) => {
      const loc =
        path === "/" ? SITE_URL : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
      const priority =
        path === "/" ? "1.0" : path.startsWith("/articles/") ? "0.7" : "0.8";

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  setHeader(event, "content-type", "application/xml");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
});
