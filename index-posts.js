import fs from "fs";
import { remark } from "remark";
import { globby } from "globby";
import matter from "gray-matter";
import strip from "strip-markdown";

const postsPath = await globby(["src/pages/blog"]);

async function main() {
  const objects = [];
  for (const postPath of postsPath) {
    if (postPath.endsWith(".md")) {
      const fileContents = fs.readFileSync(postPath, "utf8");
      const { data, content } = matter(fileContents);

      if (!(data.draft && Boolean(data.draft))) {
        const uri = postPath.replace(".md", "").replace("src/pages/", "");

        // Strip markdown and remove new lines.
        let cleanContent = await remark().use(strip).process(content);
        cleanContent = cleanContent.value.replace(/(\r\n|\n|\r)/gm, "");

        // Split the content to chunks of 1000 words.
        var splitString = cleanContent.split(" ");
        let numberOfChunks = 1;
        while (splitString.length) {
          const chunkedContent = splitString.splice(0, 1000).join(" ");

          objects.push({
            objectID: `/${uri}/:${numberOfChunks * 1000 - 1000}:${numberOfChunks * 1000}`,
            title: data.title,
            author: data.author,
            tags: data.tags,
            category: data.category,
            date: data.pubDate,
            uri: `/${uri}/`,
            content: chunkedContent,
          });

          numberOfChunks += 1;
        }
      }
    }
  }

  // Save the index.json file with all the Algolia objects.
  fs.mkdirSync("dist", { recursive: true });
  fs.writeFileSync("dist/index.json", JSON.stringify(objects), "utf8");
}

main();
