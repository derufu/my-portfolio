export default defineAppConfig({
  // Video editing showcase. Paste your YouTube playlist URL or ID into
  // `playlistId` (e.g. "https://www.youtube.com/playlist?list=PLxxxx" or "PLxxxx").
  // The Videos tab embeds the whole playlist, so every video in it shows up
  // automatically without having to list them one by one.
  video: {
    playlistId: "https://www.youtube.com/playlist?list=PLUvMn7DSsEnw",
    // Optional share token from YouTube's "Share → Embed" URL (?si=...).
    playlistSi: "WiObaUfKgMcfS_Pm",
    channelUrl: "",
    facebookUrl: "https://www.facebook.com/projectdoctrack",
    // Facebook video/reel permalinks to embed on the Video Editing page.
    facebookVideos: [
      "https://www.facebook.com/reel/839613512364414/",
      "https://www.facebook.com/projectdoctrack/videos/767740366143468/",
      "https://www.facebook.com/reel/2054848261968283/",
      "https://www.facebook.com/reel/1420216639468280/",
      "https://www.facebook.com/reel/1541887477550351/",
      "https://www.facebook.com/reel/1643772886704518/",
    ] as (string | { href: string; orientation?: "portrait" | "landscape" })[],
    thumbnail: "",
    // Optional curated choices. Leave empty to auto-load every video from the
    // playlist above (the player reads it live via the YouTube IFrame API).
    // To hand-pick / caption videos, add YouTube URLs or 11-char IDs here,
    // e.g. ["https://youtu.be/abc123XYZ90", "def456UVW12"].
    videos: [] as string[],
  },
  ui: {
    primary: "teal",
    gray: "neutral",
    formGroup: {
      help: "text-xs mt-1 text-gray-500 dark:text-gray-400",
      error: "text-xs mt-1 text-red-500 dark:text-red-400",
      label: {
        base: "text-sm block font-medium text-gray-500 dark:text-gray-200",
      },
    },
    button: {
      rounded:
        "rounded-md transition-transform active:scale-x-[0.98] active:scale-y-[0.99]",
    },
    modal: {
      overlay: {
        background: "bg-[rgba(0,8,47,.275)] saturate-50",
      },
      padding: "p-0",
      rounded: "rounded-t-2xl sm:rounded-xl",
      transition: {
        enterFrom: "opacity-0 translate-y-full sm:translate-y-0 sm:scale-x-95",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-x-100",
      },
    },
    container: {
      constrained: "max-w-2xl",
    },
  },
});
