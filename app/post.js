import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import { marked } from "marked";

// relative to the server output not the source!
let postsPath = path.join(__dirname, "..", "posts");

export async function getPosts(slug) {
  let dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async filename => {
      let file = await fs.readFile(
        path.join(postsPath, filename)
      );
      let { attributes } = parseFrontMatter(
        file.toString()
      );
      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title
      };
    })
  );
}

export async function getPost(slug) {
  let filepath = path.join(postsPath, slug + ".md");
  let file = await fs.readFile(filepath);
  let { attributes, body } = parseFrontMatter(file.toString());
	let html = marked(body);

  return { slug, html, title: attributes.title };
}

export async function createPost(post) {
  let md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await fs.writeFile(
    path.join(postsPath, post.slug + ".md"),
    md
  );
  return getPost(post.slug);
}
