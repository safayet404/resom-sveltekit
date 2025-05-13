import { l as ensure_array_like, k as store_get, o as head, m as attr, e as escape_html, u as unsubscribe_stores, a as pop, p as push } from "../../../chunks/index3.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { f as favorite } from "../../../chunks/favorite.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$favorite", favorite));
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Wishlist</title>`;
    $$payload2.out += `<meta name="description" content="Product Wishlist Page">`;
  });
  $$payload.out += `<section class="container mx-auto p-4"><div class="grid grid-cols-1 mt-20"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$payload.out += `<div class="border rounded-2xl flex items-center gap-2 p-5 mb-4 w-full"><div><button aria-label="Delete item" class="text-lg text-red-600">`;
    Icon($$payload, { icon: "material-symbols:delete" });
    $$payload.out += `<!----></button></div> <div class="flex gap-3 w-full"><img class="w-20 h-20"${attr("src", item?.image)} alt="product_image"> <div class="flex flex-col justify-between w-full"><div><h1 class="font-medium text-sm md:text-lg">${escape_html(item?.name)}</h1> <div class="flex font-poppins gap-4">`;
    if (item?.discount) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="font-semibold text-base md:text-xl mt-2">$${escape_html(item?.price - (item.price * item.discount / 100).toFixed(2))}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<p class="font-semibold mt-2 text-base md:text-xl text-black">$${escape_html(item?.price)}</p>`;
    }
    $$payload.out += `<!--]--> `;
    if (item?.discount) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="flex gap-5"><p class="font-semibold mt-2 text-base md:text-xl text-gray-400 line-through">$${escape_html(item?.price)}</p> <p class="bg-[#FFEBEB] text-[#FF3333] mt-3 md:mt-2 text-[8px] md:text-xs lg:text-sm md:px-3 md:py-1 px-1 py-1 my-auto rounded-full">- ${escape_html(item?.discount)} %</p></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div> <div class="flex justify-end mt-auto"><a class="px-4 py-1 rounded-3xl text-white bg-black"${attr("href", `/product-details/${item?.id}`)}>Buy Now</a></div></div></div></div>`;
  }
  $$payload.out += `<!--]--></div></section>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
