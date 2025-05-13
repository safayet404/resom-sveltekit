import { l as ensure_array_like, m as attr, e as escape_html, c as bind_props, a as pop, p as push } from "./index3.js";
import { R as Rating } from "./Rating.js";
import { y as fallback } from "./utils.js";
function SearchResultProduct($$payload, $$props) {
  push();
  let displayed;
  let results = fallback($$props["results"], () => [], true);
  let initialLimit = fallback($$props["initialLimit"], 4);
  let expandBy = fallback($$props["expandBy"], 10);
  let visible = initialLimit;
  displayed = results.slice(0, visible);
  $$payload.out += `<section class="mx-auto container mt-10 px-4">`;
  if (displayed.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(displayed);
    $$payload.out += `<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$payload.out += `<a${attr("href", `/product-details/${item.id}`)} class="group block"><img${attr("src", item.image)}${attr("alt", item.name)} class="w-full h-auto object-cover rounded-xl border mb-3 transition-transform duration-300 group-hover:scale-105"> <h2 class="capitalize text-xs mb-2 md:text-sm lg:text-base font-poppins mt-3">${escape_html(item?.name)}</h2> <div class="flex gap-3">`;
      Rating($$payload, { rate: item?.rating });
      $$payload.out += `<!----> <p class="text-xs items-center flex">${escape_html(item.rating)}/5</p></div> <div class="flex font-poppins gap-4">`;
      if (item?.discount) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="font-semibold text-base md:text-xl mt-2">$${escape_html((item.price - item.price * item.discount / 100).toFixed(2))}</p>`;
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
      $$payload.out += `<!--]--></div></a>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (displayed.length < results.length) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="text-center mt-8"><button class="px-6 py-2 rounded-full border text-sm hover:bg-gray-100">View More</button></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="text-center text-gray-500 mt-10">No results found.</p>`;
  }
  $$payload.out += `<!--]--></section>`;
  bind_props($$props, { results, initialLimit, expandBy });
  pop();
}
export {
  SearchResultProduct as S
};
