import { globby } from "globby";
import fs from "fs";
import matter from "gray-matter";

const postsPath = await globby(["src/pages/blog"]);

const objects = [];
for (const postPath of postsPath) {
  if (postPath.endsWith(".md")) {
    const fileContents = fs.readFileSync(postPath, "utf8");
    const { data, content } = matter(fileContents);

    if (!(data.draft && Boolean(data.draft))) {
      const slug = postPath.replace(".md", "").replace("src/pages/", "");

      objects.push({
        objectID: `/${slug}/`,
        title: data.title,
        author: data.author,
        tags: data.tags,
        category: data.category,
        date: data.pubDate,
        slug: `/${slug}/`,
        content: content,
      });
    }
  }
}

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/index.json", JSON.stringify(objects), "utf8");
