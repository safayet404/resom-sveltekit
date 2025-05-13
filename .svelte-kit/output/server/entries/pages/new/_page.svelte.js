import { A as AllProduct, p as product } from "../../../chunks/AllProduct.js";
import { B as ByStyle } from "../../../chunks/ByStyle.js";
import { H as Hero } from "../../../chunks/Hero.js";
function _page($$payload) {
  $$payload.out += `<section><div>`;
  Hero($$payload);
  $$payload.out += `<!----> `;
  AllProduct($$payload, { title: "NEW ARRIVALS", product });
  $$payload.out += `<!----> `;
  ByStyle($$payload);
  $$payload.out += `<!----></div></section>`;
}
export {
  _page as default
};
