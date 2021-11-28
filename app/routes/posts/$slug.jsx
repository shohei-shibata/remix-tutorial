import { useLoaderData } from "remix";
import { getPost } from "~/post";

export let loader = async ({ params }) => {
  return getPost(params.slug);
};

export default function PostSlug() {
  let post = useLoaderData();
  return (
		<div dangerouslySetInnerHTML={{ __html: post.html }} />
  );
}
