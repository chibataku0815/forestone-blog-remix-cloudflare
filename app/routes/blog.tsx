// app/routes/blog.tsx
import { Outlet, json, useLoaderData } from "@remix-run/react";

export default function Blog() {
	return (
		<div className="p-10 prose">
			<Outlet />
		</div>
	);
}
