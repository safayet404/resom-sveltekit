import { o as head, m as attr, a as pop, p as push } from "../../../chunks/index3.js";
import "../../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  let password = "";
  let confirmPassword = "";
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Reset Password</title>`;
    $$payload2.out += `<meta name="description" content="Reset Password">`;
  });
  $$payload.out += `<section class="max-w-md mx-auto p-6 mt-10 bg-white shadow rounded"><h2 class="text-2xl font-bold mb-4 text-center">Reset Your Password</h2> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<input type="password"${attr("value", password)} placeholder="New Password" class="w-full mb-4 p-2 border rounded"> <input type="password"${attr("value", confirmPassword)} placeholder="Confirm Password" class="w-full mb-4 p-2 border rounded"> <button class="w-full bg-black text-white py-2 rounded">Reset Password</button>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section>`;
  pop();
}
export {
  _page as default
};
