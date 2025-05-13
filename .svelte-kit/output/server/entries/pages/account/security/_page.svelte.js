import { c as bind_props, a as pop, p as push } from "../../../../chunks/index3.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  console.log("Logged in user:", data.user);
  $$payload.out += `<section class="container mx-auto p-4 bg-white rounded-lg"><div class="p-5">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div><h1 class="mb-4">Password</h1> <p class="mb-3">*******</p> <p class="text-red-600 font-medium"><span class="px-3 py-1 font-bold rounded-full border border-red-600">!</span> You already have a password. Do you want to <button class="underline">reset</button> it or <button class="underline">forgot</button> it?</p></div>`;
  }
  $$payload.out += `<!--]--></div></section>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
