import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — премиальный клининг`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/artclean/",
    display: "standalone",
    background_color: "#ede8dc",
    theme_color: "#ede8dc",
    lang: "ru",
    icons: [
      { src: "/artclean/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/artclean/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/artclean/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
