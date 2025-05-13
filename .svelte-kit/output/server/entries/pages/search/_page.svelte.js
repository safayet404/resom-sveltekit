import { o as head, e as escape_html, c as bind_props, a as pop, p as push } from "../../../chunks/index3.js";
import { S as SearchResultProduct } from "../../../chunks/SearchResultProduct.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  let sorted = [...data.results];
  {
    const base = [...data.results];
    {
      sorted = base;
    }
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Search Result</title>`;
    $$payload2.out += `<meta name="description" content="Product Search Result">`;
  });
  $$payload.out += `<section class="container mx-auto p-4"><div class="flex justify-between mt-20 items-center mb-4"><div class="flex flex-col gap-2"><h2 class="text-xl font-semibold">Search: "${escape_html(data.q)}"</h2> <p>${escape_html(sorted.length)} items found for "${escape_html(data?.q)}"</p></div> <select class="border px-2 py-1 rounded text-sm"><option value="default">Default</option><option value="priceLow">Price: Low to High</option><option value="priceHigh">Price: High to Low</option><option value="ratingHigh">Rating: High to Low</option></select></div> `;
  SearchResultProduct($$payload, {
    results: sorted,
    initialLimit: 4,
    expandBy: 10
  });
  $$payload.out += `<!----></section>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
