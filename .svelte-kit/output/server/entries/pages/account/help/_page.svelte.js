import { l as ensure_array_like, m as attr, e as escape_html } from "../../../../chunks/index3.js";
function _page($$payload) {
  let questions = [
    "Fabric Type",
    "Return Policy",
    "Shipping Time",
    "In Stock",
    "Pockets Included"
  ];
  let customValue = "";
  let accordions = [
    {
      title: "What is Resom, and what do you offer?",
      content: "Resom is a modern lifestyle brand offering high-quality apparel, accessories, and footwear for men, women, and kids. We focus on timeless designs, premium fabrics, and sustainable practices to keep you looking stylish and feeling comfortable. Let us know how we can help."
    },
    {
      title: "Where are you located?",
      content: "Ships within 2–5 business days."
    },
    {
      title: "What are your business hour",
      content: "30-day return window with free pickup."
    }
  ];
  let openIndices = [];
  const each_array = ensure_array_like(questions);
  const each_array_1 = ensure_array_like(accordions);
  $$payload.out += `<div class="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between"><div class="mt-10"><div class="w-full"><input${attr("value", customValue)} placeholder="Send a message the seller" class="p-3 w-[70%] border border-black rounded-lg"> <button class="bg-black text-white font-semibold p-3 rounded-lg">Send</button></div> <div class="flex flex-wrap space-x-2"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$payload.out += `<button class="p-3 mt-4 text-[#606060] bg-[#F3F3F3] rounded-lg">${escape_html(item)}</button>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="w-full mt-10"><h2 class="font-semibold text-lg underline mb-5">General Information</h2> <!--[-->`;
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    let item = each_array_1[i];
    $$payload.out += `<div class="overflow-hidden border-b mb-2"><button class="w-full text-left py-3 font-semibold flex justify-between"><span>${escape_html(item.title)}</span> <span>${escape_html(openIndices.includes(i) ? "-" : "+")}</span></button> `;
    if (openIndices.includes(i)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="px-4 py-3 text-gray-700 border-t">${escape_html(item.content)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
}
export {
  _page as default
};
