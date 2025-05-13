import { f as fetchCategoryTree } from "../../../../chunks/categories.js";
import { j as json } from "../../../../chunks/index.js";
async function GET() {
  const categories = await fetchCategoryTree();
  console.log("a", categories);
  return json(categories);
}
export {
  GET
};
