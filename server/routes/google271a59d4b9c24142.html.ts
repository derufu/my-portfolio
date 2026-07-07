export default defineEventHandler((event) => {
  setHeader(event, "content-type", "text/plain; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=0, must-revalidate");
  return "google-site-verification: google271a59d4b9c24142.html";
});
