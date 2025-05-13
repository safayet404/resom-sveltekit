// +server.js
import { fetchCategoryTree } from "$lib/saleor/categories";
import { json } from "@sveltejs/kit";

export async function GET() {
    const categories = await fetchCategoryTree();
    console.log("a", categories);
    return json(categories);



}
