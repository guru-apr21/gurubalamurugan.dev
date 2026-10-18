import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

const site = {
  title: "Guru Balamurugan",
  url: "https://gurubalamurugan.dev",
  description: "Notes and writing on software engineering by Guru Balamurugan.",
};

export default function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", site);
  eleventyConfig.addGlobalData("year", new Date().getFullYear());

  // Static files copied as-is into the built site.
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/icons": "/" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2":
      "fonts/source-serif-4-normal.woff2",
    "node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-italic.woff2":
      "fonts/source-serif-4-italic.woff2",
  });

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "en",
      title: site.title,
      subtitle: site.description,
      base: site.url + "/",
      author: { name: site.title },
    },
  });

  // Posts are Markdown files in src/blog. Drafts (draft: true) only show locally.
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date),
  );
  eleventyConfig.addFilter("isoDate", (date) => date.toISOString().slice(0, 10));

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
