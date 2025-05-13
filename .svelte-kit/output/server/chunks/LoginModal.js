import { m as attr, c as bind_props, a as pop, p as push } from "./index3.js";
import { y as fallback } from "./utils.js";
import "./client.js";
import "./functions.js";
import "./Toaster.svelte_svelte_type_style_lang.js";
function LoginModal($$payload, $$props) {
  push();
  let canLogin;
  let isOpen = fallback($$props["isOpen"], false);
  let close = fallback($$props["close"], () => {
  });
  let email = "";
  let password = "";
  canLogin = email.trim() && password.trim();
  if (isOpen) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="fixed inset-0 backdrop-blur-lg bg-black bg-opacity-50 bg-blur flex justify-center items-center z-50"><div class="bg-white p-6 rounded-xl w-full max-w-sm relative"><button class="absolute top-2 right-3 text-red-500">✕</button> <h2 class="text-xl font-semibold mb-1">Are you an existing user?</h2> <div class="flex justify-between items-center mb-4"><p class="text-sm text-gray-600">Please log in first</p> <a href="/registration" class="text-sm text-blue-600">Registration</a></div> <input${attr("value", email)} placeholder="Email" class="w-full p-2 mb-3 border rounded bg-yellow-100"> <input type="password"${attr("value", password)} placeholder="Password" class="w-full p-2 mb-3 border rounded bg-yellow-100"> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <button${attr("disabled", !canLogin, true)} class="w-full bg-black text-white p-2 rounded">`;
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `Continue`;
    }
    $$payload.out += `<!--]--></button> <p class="text-xs text-center mt-3 text-gray-400">By continuing, I agree to their <a class="underline" href="/">privacy</a> and <a class="underline" href="/">policy</a></p></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { isOpen, close });
  pop();
}
export {
  LoginModal as L
};
