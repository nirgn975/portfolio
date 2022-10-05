import { defineConfig } from "astro/config";

import { astroImageTools } from "astro-imagetools";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://nir.galons.io",
  integrations: [sitemap(), tailwind(), astroImageTools],
});
