import { l as ensure_array_like, e as escape_html, m as attr, c as bind_props, a as pop, p as push, o as head } from "../../chunks/index3.js";
import { H as Hero } from "../../chunks/Hero.js";
import { I as Icon } from "../../chunks/Icon.js";
import { R as Rating } from "../../chunks/Rating.js";
import { f as favorite } from "../../chunks/favorite.js";
import "../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { y as fallback } from "../../chunks/utils.js";
import { B as ByStyle } from "../../chunks/ByStyle.js";
import { u as user } from "../../chunks/auth2.js";
function Category($$payload) {
  $$payload.out += `<section class="mx-auto px-4 container mt-10"><div class="grid grid-cols-3 md:grid-cols-3 gap-5 items-start"><div class="relative hover:scale-105 transition-transform duration-300"><a href="/category/sweatshirts"><img class="w-full object-cover" alt="category" src="/cat1.png"> <div class="absolute inset-0 bg-black opacity-45"></div> <h1 class="absolute text-white font-bold text-base md:text-3xl left-3 md:left-10 bottom-2 md:bottom-5">Sweatshirts</h1></a></div> <div class="relative hover:scale-105 transition-transform duration-300"><a href="/category/t-shirts"><img class="w-full object-cover" alt="category" src="/cat2.png"> <div class="absolute inset-0 bg-black opacity-45"></div> <h1 class="absolute text-white font-bold text-base md:text-3xl left-3 md:left-10 bottom-2 md:bottom-5">T Shirt</h1></a></div> <div class="relative hover:scale-105 transition-transform duration-300"><a href="/category/polo-shirts-2"><img class="w-full object-cover" alt="category" src="/cat3.png"> <div class="absolute inset-0 bg-black opacity-45"></div> <h1 class="absolute text-white font-bold text-base md:text-3xl left-3 md:left-10 bottom-2 md:bottom-5">Polo Shirt</h1></a></div></div></section>`;
}
function CommonProduct($$payload, $$props) {
  push();
  let title = $$props["title"];
  let initialProducts = fallback($$props["initialProducts"], () => [], true);
  let initialLimit = fallback($$props["initialLimit"], 4);
  let expandBy = fallback($$props["expandBy"], 10);
  let product = [...initialProducts];
  let loading = false;
  let favoriteItems = [];
  function isInFavorite(id) {
    return favoriteItems.some((item) => item.id === id);
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
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-center"><button class="mx-auto mt-10 border px-5 md:px-14 py-2 text-xs sm:text-sm md:text-base font-medium rounded-3xl"${attr("disabled", loading, true)}>`;
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `View More`;
    }
    $$payload.out += `<!--]--></button></div>`;
  }
  $$payload.out += `<!--]--></section>`;
  bind_props($$props, {
    title,
    initialProducts,
    initialLimit,
    expandBy
  });
  pop();
}
function Affiliate($$payload) {
  $$payload.out += `<section class="container mx-auto p-4"><div class="flex flex-wrap sm:flex-nowrap justify-between gap-10"><div class="mt-5"><h1 class="font-bold capitalize text-lg sm:text-xl md:text-4xl">Join our affiliate team</h1> <p class="text-[10px] w-[70%] md:text-sm mt-3">Success in affiliate marketing is not just about selling
                products, it’s about building trust and providing value. When
                you help others find what they need, success will follow.</p> <button class="px-8 bg-[#D9D9D9] rounded-lg mt-3 font-semibold py-2 text-black">Get Started Today</button></div> <div class="flex items-center"><img alt="affiliate" src="/affiliate.png" class="rounded-lg"></div></div></section>`;
}
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  const { newArrivals, topSelling } = data;
  user.set(data.user);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Home</title>`;
    $$payload2.out += `<meta name="description" content="Svelte demo app">`;
  });
  $$payload.out += `<section>`;
  Hero($$payload);
  $$payload.out += `<!----> `;
  Category($$payload);
  $$payload.out += `<!----> `;
  CommonProduct($$payload, {
    title: "New Arrival",
    initialProducts: newArrivals,
    initialLimit: 4,
    expandBy: 10
  });
  $$payload.out += `<!----> `;
  CommonProduct($$payload, {
    title: "Top Selling",
    initialProducts: topSelling,
    initialLimit: 4,
    expandBy: 10
  });
  $$payload.out += `<!----> `;
  ByStyle($$payload);
  $$payload.out += `<!----> `;
  Affiliate($$payload);
  $$payload.out += `<!----></section>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
