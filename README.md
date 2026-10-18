# gurubalamurugan.dev

My personal website and blog, built with [Eleventy](https://www.11ty.dev/).

## Run it locally

```bash
npm install
npm start        # preview at http://localhost:8080
npm run build    # build the site into _site/
```

## Write a post

1. Create a Markdown file in `src/blog/`, for example `src/blog/my-post.md`.
2. Add this at the top:

   ```markdown
   ---
   title: My post title
   date: 2026-10-20
   description: One sentence about the post.
   ---
   ```

3. Write the post below it.
4. Add `draft: true` to keep a post out of the published site.

## Publish

Pushing to `main` builds the site and deploys it to GitHub Pages (see `.github/workflows/deploy.yml`).
