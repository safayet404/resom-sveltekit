import { l as ensure_array_like, m as attr, e as escape_html } from "./index3.js";
function ByStyle($$payload) {
  const style = [
    {
      id: 1,
      name: "Casual",
      slug: "casual",
      image: "/casual.png"
    },
    {
      id: 2,
      name: "Formal",
      slug: "formal",
      image: "/formal.png"
    },
    {
      id: 3,
      name: "Party",
      slug: "party",
      image: "/party.png"
    },
    {
      id: 4,
      name: "Gym",
      slug: "gym",
      image: "/gym.png"
    }
  ];
  const each_array = ensure_array_like(Array(Math.ceil(style.length / 2)));
  $$payload.out += `<section class="bg-[#F2F2F2] mt-10"><div class="container mx-auto px-4"><h1 class="pt-10 mb-10 text-lg sm:text-2xl md:text-4xl font-bold text-center uppercase">Browse By Style</h1> <div class="grid grid-cols-12 gap-5"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    each_array[i];
    if (i % 2 === 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="col-span-5 border rounded-xl shadow-md"><div class="relative rounded-xl overflow-hidden bg-gray-100 h-40 sm:h-52 md:h-72 lg:h-96"><a${attr("href", `/category/${style[i * 2]?.slug}`)}><img${attr("src", style[i * 2]?.image)}${attr("alt", style[i * 2]?.name)} class="w-full h-full object-cover"> <h2 class="absolute top-4 left-4 text-black text-lg font-semibold">${escape_html(style[i * 2]?.name)}</h2></a></div></div> <div class="col-span-7 border rounded-xl shadow-md"><div class="relative rounded-xl overflow-hidden bg-gray-100 h-40 sm:h-52 md:h-72 lg:h-96"><a${attr("href", `/category/${style[i * 2 + 1]?.slug}`)}><img${attr("src", style[i * 2 + 1]?.image)}${attr("alt", style[i * 2 + 1]?.name)} class="w-full h-full object-cover"> <h2 class="absolute top-4 left-4 text-black text-lg font-semibold">${escape_html(style[i * 2 + 1]?.name)}</h2></a></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="mb-10 col-span-7 border rounded-xl shadow-md"><div class="relative rounded-xl overflow-hidden bg-gray-100 h-40 sm:h-52 md:h-72 lg:h-96"><a${attr("href", `/category/${style[i * 2]?.slug}`)}><img${attr("src", style[i * 2]?.image)}${attr("alt", style[i * 2]?.name)} class="w-full h-full object-cover"> <h2 class="absolute top-4 left-4 text-black text-lg font-semibold">${escape_html(style[i * 2]?.name)}</h2></a></div></div> <div class="mb-10 col-span-5 border rounded-xl shadow-md"><div class="relative rounded-xl overflow-hidden bg-gray-100 h-40 sm:h-52 md:h-72 lg:h-96"><a${attr("href", `/category/${style[i * 2 + 1]?.slug}`)}><img${attr("src", style[i * 2 + 1]?.image)}${attr("alt", style[i * 2 + 1]?.name)} class="w-full h-full object-cover"> <h2 class="absolute top-4 left-4 text-black text-lg font-semibold">${escape_html(style[i * 2 + 1]?.name)}</h2></a></div></div>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></div></section>`;
}
export {
  ByStyle as B
};
