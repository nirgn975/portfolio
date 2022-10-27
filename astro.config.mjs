import rehypePrettyCode from "rehype-pretty-code";
import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import remarkToc from "remark-toc";
import mdx from "@astrojs/mdx";

const options = {
  theme: "one-dark-pro",
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://nir.galons.io",
  integrations: [sitemap(), tailwind({ config: { applyBaseStyles: false } }), partytown(), mdx(), compress()],
  markdown: {
    rehypePlugins: [[rehypePrettyCode, options]],
    syntaxHighlight: false,
    remarkPlugins: [remarkToc],
    extendDefaultPlugins: true, // Preserve Astro's default plugins: GitHub-flavored Markdown and Smartypants
  },
});
