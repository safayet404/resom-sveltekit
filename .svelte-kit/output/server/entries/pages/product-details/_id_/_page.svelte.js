import { l as ensure_array_like, e as escape_html, b as attr_style, h as stringify, g as attr_class, o as head, m as attr, c as bind_props, a as pop, p as push } from "../../../../chunks/index3.js";
import "../../../../chunks/client.js";
import { f as fixImageUrl } from "../../../../chunks/fixImageUrl.js";
import { S as SearchResultProduct } from "../../../../chunks/SearchResultProduct.js";
import { R as Rating } from "../../../../chunks/Rating.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { I as Icon, h as html } from "../../../../chunks/Icon.js";
import { B as ByStyle } from "../../../../chunks/ByStyle.js";
function Review($$payload) {
  const ratings = [
    { stars: 5, count: 195 },
    { stars: 4, count: 96 },
    { stars: 3, count: 48 },
    { stars: 2, count: 31 },
    { stars: 1, count: 0 }
  ];
  const maxCount = Math.max(...ratings.map((r) => r.count));
  const each_array = ensure_array_like(ratings);
  $$payload.out += `<div class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3"><div class="flex flex-col justify-center mx-auto text-center mt-10"><h1 class="text-3xl text-gray-600"><span class="font-bold text-4xl text-black">4.7</span> /5</h1> <div class="mx-auto mt-2">`;
  Rating($$payload, { rate: 4 });
  $$payload.out += `<!----></div> <p class="text-gray-500">370 Reviews</p> <button class="px-5 py-1 mt-2 font-medium border rounded-md bg-black text-white">Write Review</button></div> <div class="space-y-3 mt-6"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let { stars, count } = each_array[$$index];
    $$payload.out += `<div class="flex items-center space-x-3"><span class="text-sm w-12">${escape_html(stars)} Star${escape_html(stars > 1 ? "s" : "")}</span> <div class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"><div class="h-full bg-black transition-all duration-300"${attr_style(`width: ${stringify(maxCount ? count / maxCount * 100 : 0)}%`)}></div></div> <span class="text-sm w-8 text-right">${escape_html(count)}</span></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mt-10"><h1 class="text-4xl font-bold mx-auto text-center">95%</h1> <p class="text-black text-center text-sm">of our customers come back for more</p> <p class="text-gray-600 text-center text-sm">Praised for its perfect blend of style,comfort and quality</p></div></div>`;
}
function DetailsRatingfaq($$payload) {
  let activeTab = "rating";
  let tabs = [
    { name: "details", label: "Product Details" },
    { name: "rating", label: "Rating" },
    { name: "faq", label: "FAQ" }
  ];
  const each_array = ensure_array_like(tabs);
  $$payload.out += `<section class="container mx-auto p-4"><div class="grid grid-cols-3 gap-10"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tab = each_array[$$index];
    $$payload.out += `<button${attr_class(`text-center ${activeTab === tab.name ? "border-b border-black" : "border-none"} pb-3`)}>${escape_html(tab.label)}</button>`;
  }
  $$payload.out += `<!--]--></div> `;
  {
    $$payload.out += "<!--[2-->";
    Review($$payload);
  }
  $$payload.out += `<!--]--></section>`;
}
function UserReview($$payload) {
  $$payload.out += `<section class="container mx-auto p-4"><div class="flex justify-between border-b pb-3"><h1 class="font-semibold">Reviewed by 370 Customers</h1> <p>Most Recent</p></div> <div class="mt-5"><div class="flex flex-wrap justify-between"><h1 class="font-semibold">5 star Reviewed by Sarah W.</h1> <p class="text-sm text-gray-600">12 December 2024</p></div> <div><p class="text-gray-500 text-xs md:text-sm mb-3 mt-5">I absolutely love this dress.This fabrics feels amazing,and the
                fit is just perfect.Highly recommende it !</p> <div class="flex flex-wrap justify-between"><div class="flex gap-2"><img src="/review.png" class="w-20 h-20" alt="product"> <img src="/review.png" class="w-20 h-20" alt="product"> <img src="/review.png" class="w-20 h-20" alt="product"></div> <div class="flex gap-2 items-end"><p class="text-sm text-gray-500">Was this helpful?</p> `;
  Icon($$payload, { icon: "solar:like-broken" });
  $$payload.out += `<!----> `;
  Icon($$payload, { icon: "solar:dislike-broken" });
  $$payload.out += `<!----></div></div></div></div></section>`;
}
function _page($$payload, $$props) {
  push();
  let matchedVariant, finalPrice;
  let data = $$props["data"];
  let product;
  let relatedProducts;
  let selectedImage;
  let selectedColor;
  let selectedSize;
  let quantity = 1;
  let isOpen = false;
  function normalize(val) {
    return val?.toLowerCase().replace(/\s+/g, "-");
  }
  if (data) {
    product = data.product;
    relatedProducts = data.relatedProducts;
  }
  if (product) {
    selectedImage = product?.images?.[0];
    selectedColor = product?.colors?.[0];
    selectedSize = product?.sizes?.[0];
    quantity = 1;
    isOpen = false;
  }
  matchedVariant = product?.variantMap?.find((v) => {
    const variantSize = normalize(v.attributes.size);
    const variantColor = normalize(v.attributes.color);
    return (!selectedSize || variantSize === normalize(selectedSize)) && (!selectedColor || variantColor === normalize(selectedColor));
  });
  finalPrice = matchedVariant?.price ?? product?.basePrice;
  product?.basePrice;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Product Details</title>`;
    $$payload2.out += `<meta name="description" content="Product Details Page">`;
  });
  $$payload.out += `<!---->`;
  {
    const each_array = ensure_array_like(product?.images);
    $$payload.out += `<section class="container mx-auto p-4 mt-[40%] md:mt-[20%] lg:mt-[10%]"><div class="grid grid-cols-1 md:grid-cols-2 gap-10"><div class="grid grid-cols-12"><div class="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$payload.out += `<button class="w-20 h-20 p-0 border rounded overflow-hidden" type="button" aria-label="Select product image"><img${attr("src", fixImageUrl(item))} alt="product thumbnail"${attr_class(`w-full h-full object-cover rounded-lg ${item === selectedImage ? "border border-black" : ""}  `)}></button>`;
    }
    $$payload.out += `<!--]--></div> <div class="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-10"><img class="w-full h-auto object-cover rounded-lg"${attr("src", fixImageUrl(selectedImage))} alt="Product preview"></div></div> <div><h2 class="capitalize text-base sm:text-lg md:text-3xl lg:text-4xl font-poppins mt-3">${escape_html(product?.name)}</h2> <div class="flex mt-2 gap-3">`;
    Rating($$payload, { rate: product?.rating });
    $$payload.out += `<!----> <p class="text-sm items-center flex">${escape_html(product?.rating)}/5</p></div> <div class="flex gap-4 pb-3 md:pb-5 border-b">`;
    if (finalPrice != null) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="font-semibold mt-4 text-base sm:text-lg md:text-xl lg:text-3xl">$${escape_html(finalPrice)}</p>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<p class="text-sm text-gray-400 mt-4">Select size to see price</p>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (product?.sizes?.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(product.sizes);
      $$payload.out += `<p class="text-xs md:text-sm text-gray-400 mt-2">Select Size</p> <div class="flex flex-wrap gap-3 border-b mt-3 pb-3 md:pb-5"><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let size = each_array_1[$$index_1];
        $$payload.out += `<button type="button"${attr_class(`px-4 text-xs font-semibold sm:text-sm md:text-base ${selectedSize === size ? " bg-black text-white" : "bg-[#F0F0F0] text-[#606060]"} transition-all duration-300 rounded-3xl py-2`)}>${escape_html(size)}</button>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="w-full mt-5 border rounded-3xl overflow-hidden"><button class="w-full text-left px-4 py-2 font-semibold bg-gray-100 flex justify-between"><span>Product Details</span> <span>${escape_html(isOpen ? "-" : "+")}</span></button> `;
    if (isOpen) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="px-4 py-3 text-gray-700 border-t">${html(product?.description)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="flex gap-3"><div class="rounded-3xl w-[30%] bg-[#F0F0F0] px-10 mt-5 py-2"><div class="w-full flex items-center justify-center"><button class="px-3 text-center font-bold text-lg">-</button> <p class="px-3 font-semibold text-lg">${escape_html(quantity)}</p> <button class="px-3 text-center font-bold text-lg">+</button></div></div> <div class="w-[70%]"><button class="rounded-3xl text-white cursor-pointer font-semibold py-2 mt-5 bg-black w-full">Add to Cart</button></div></div></div></div></section>`;
  }
  $$payload.out += `<!----> `;
  SearchResultProduct($$payload, {
    results: relatedProducts,
    initialLimit: 4,
    expandBy: 10
  });
  $$payload.out += `<!----> `;
  DetailsRatingfaq($$payload);
  $$payload.out += `<!----> `;
  UserReview($$payload);
  $$payload.out += `<!----> `;
  ByStyle($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
