// app/.server/posts.tsx
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { sortBy } from "lodash-es";

export type Frontmatter = {
	title: string;
	description: string;
	published: string; // YYYY-MM-DD
	featured: boolean;
};

export type PostMeta = {
	slug: string;
	frontmatter: Frontmatter;
};

/**
 * Retrieves and sorts blog posts by their published date in descending order.
 *
 * @returns {Promise<PostMeta[]>} A promise that resolves to an array of post metadata.
 */
export const getPosts = async (): Promise<PostMeta[]> => {
	const postsDirectory = path.join(process.cwd(), "posts");
	const filenames = fs.readdirSync(postsDirectory);

	const posts = filenames.map((filename) => {
		const filePath = path.join(postsDirectory, filename);
		const fileContents = fs.readFileSync(filePath, "utf8");
		const { data } = matter(fileContents);

		// Remove 'blog.' prefix from filename
		const slug = filename.replace(/^blog\./, "").replace(/\.mdx$/, "");

		return {
			slug,
			frontmatter: data as Frontmatter,
		};
	});

	return sortBy(
		posts,
		(post) => new Date(post.frontmatter.published),
	).reverse();
};
