import { globby } from "globby";
import fs from "fs";
import matter from "gray-matter";

const postsPath = await globby(["src/pages/blog"]);

const objects = postsPath.map((postPath) => {
  if (postPath.endsWith(".md")) {
    const fileContents = fs.readFileSync(postPath, "utf8");
    const { data, content } = matter(fileContents);

    if (Boolean(data.draft) == false) {
      const slug = postPath.replace(".md", "").replace("src/pages/", "");

      return {
        title: data.title,
        author: data.author,
        tags: data.tags,
        category: data.category,
        date: data.pubDate,
        slug: slug,
        content: content,
      };
    }
  }
});

fs.writeFileSync("dist/index.json", objects);
