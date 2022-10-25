import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://nir.galons.io",
  integrations: [sitemap(), tailwind({ config: { applyBaseStyles: false } }), partytown(), mdx(), compress()],
  markdown: {
    shikiConfig: {
      theme: "dracula-soft",
    },
  },
});
