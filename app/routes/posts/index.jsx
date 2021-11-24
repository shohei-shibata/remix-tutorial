// Next: https://remix.run/docs/en/v1/tutorials/blog#pulling-from-a-data-source

import { Link, useLoaderData } from "remix";
import { getPosts } from "~/post.js";

export let loader = () => {
	return getPosts();
}

export default function Posts() {
	let posts = useLoaderData();
	console.log(posts);
	return (
		<div>
			<h1>Posts</h1>
			<ul>
				{posts.map(post => (
					<li key={post.slug}>
						<Link to={post.slug}>{post.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
