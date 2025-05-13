import { l as ensure_array_like, e as escape_html, m as attr, c as bind_props, a as pop, p as push, o as head } from "../../../../chunks/index3.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { R as Rating } from "../../../../chunks/Rating.js";
import { f as favorite } from "../../../../chunks/favorite.js";
import { y as fallback } from "../../../../chunks/utils.js";
import "../../../../chunks/functions.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
function CommonCategory($$payload, $$props) {
  push();
  let title = $$props["title"];
  let initialProducts = fallback($$props["initialProducts"], () => [], true);
  let initialLimit = fallback($$props["initialLimit"], 4);
  let expandBy = fallback($$props["expandBy"], 10);
  let fetchUrl = $$props["fetchUrl"];
  let slug = $$props["slug"];
  let product = [...initialProducts];
  let loading = false;
  let hasMore = true;
  let favoriteItems = [];
  function isInFavorite(id) {
    return favoriteItems.some((item) => item.id === id);
  }
  product = [...initialProducts];
  if (slug) {
    hasMore = true;
  }
  favorite.subscribe((items) => {
    favoriteItems = items;
  });
  const each_array = ensure_array_like(product);
  $$payload.out += `<section class="mx-auto container mt-10 px-4"><h1 class="mx-auto text-center text-lg sm:text-xl md:text-4xl md:mt-10 uppercase font-bold mb-10">${escape_html(title)}</h1> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:grid-cols-3"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$payload.out += `<a${attr("href", `/product-details/${item.id}`)} class="cursor-pointer group block relative"><div class="transition-transform duration-300 hover:scale-105 relative"><img alt="product-img" class="w-full h-auto object-cover rounded-xl border"${attr("src", item?.image)}> <button type="button" class="absolute top-2 right-3 text-lg z-10" aria-label="Add to favorite">`;
    Icon($$payload, {
      icon: isInFavorite(item.id) ? "material-symbols:favorite" : "material-symbols:favorite-outline"
    });
    $$payload.out += `<!----></button></div> <h2 class="capitalize text-xs mb-2 md:text-sm lg:text-base font-poppins mt-3">${escape_html(item?.name)}</h2> <div class="flex gap-3">`;
    Rating($$payload, { rate: item?.rating });
    $$payload.out += `<!----> <p class="text-xs items-center flex">${escape_html(item.rating)}/5</p></div> <div class="flex font-poppins gap-4">`;
    if (item?.discount) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="font-semibold text-sm sm:text-base md:text-xl mt-2">$${escape_html((item.price - item.price * item.discount / 100).toFixed(2))}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<p class="font-semibold mt-2 text-xs sm:text-base md:text-xl text-black">$${escape_html(item?.price)}</p>`;
    }
    $$payload.out += `<!--]--> `;
    if (item?.discount) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="flex gap-5"><p class="font-semibold mt-2 text-xs sm:text-base md:text-xl text-gray-400 line-through">$${escape_html(item?.price)}</p> <p class="bg-[#FFEBEB] text-[#FF3333] mt-3 md:mt-2 text-[8px] md:text-xs lg:text-sm md:px-3 md:py-1 px-1 py-1 my-auto rounded-full">- ${escape_html(item?.discount)} %</p></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></a>`;
  }
  $$payload.out += `<!--]--></div> `;
  if (hasMore) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-center"><button class="mx-auto mt-10 border px-5 md:px-14 py-2 text-xs sm:text-sm md:text-base font-medium rounded-3xl"${attr("disabled", loading, true)}>`;
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `View More`;
    }
    $$payload.out += `<!--]--></button></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section>`;
  bind_props($$props, {
    title,
    initialProducts,
    initialLimit,
    expandBy,
    fetchUrl,
    slug
  });
  pop();
}
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Category</title>`;
    $$payload2.out += `<meta name="description" content="Product Category Page">`;
  });
  $$payload.out += `<section class="container mx-auto px-4 py-10 mt-10"><h1 class="text-base sm:text-lg text-center md:text-2xl font-bold lg:mt-0 mt-10 sm:mt-20 mb-6">Products in ${escape_html(data.categoryName)}</h1> `;
  if (data.products.length > 0) {
    $$payload.out += "<!--[-->";
    CommonCategory($$payload, {
      initialProducts: data.products,
      fetchUrl: `/api/category-products?slug=${data.slug}`,
      initialLimit: 4,
      slug: data.slug,
      expandBy: 10
    });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p>No products found in this category.</p>`;
  }
  $$payload.out += `<!--]--></section>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
