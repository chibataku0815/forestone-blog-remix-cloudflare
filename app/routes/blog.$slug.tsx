// app/routes/blog.$slug.tsx
import { json, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/.server/getPosts";

export const loader = async ({ params }: { params: { slug: string } }) => {
	const posts = await getPosts();
	console.log(params.slug);
	// console.log(posts);
	const post = posts.find((post) => post.slug === params.slug);
	console.log(post);
	return json(post);
};

export default function BlogPost() {
	const post = useLoaderData<typeof loader>();
	return (
		<div>
			<h1>{post.frontmatter.title}</h1>
			<p>{post.frontmatter.published}</p>
			<p>{post.frontmatter.description}</p>
		</div>
	);
}