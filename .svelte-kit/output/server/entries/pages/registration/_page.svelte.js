import { m as attr, g as attr_class, a as pop, p as push } from "../../../chunks/index3.js";
import "../../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  let canRegister;
  let email = "";
  let password = "";
  let confirmPassword = "";
  canRegister = email.trim() && password.trim() && confirmPassword === password;
  $$payload.out += `<form class="max-w-md mx-auto p-4"><h2 class="text-xl font-bold mb-4">Create an Account</h2> <input type="email" placeholder="Email"${attr("value", email)} required class="w-full mb-3 p-2 border rounded bg-yellow-100"> <input type="password" placeholder="Password"${attr("value", password)} required class="w-full mb-3 p-2 border rounded bg-yellow-100"> <input type="password" placeholder="Confirm Password"${attr("value", confirmPassword)} required class="w-full mb-3 p-2 border rounded"> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <button type="submit"${attr_class(`w-full ${canRegister ? "bg-black" : "bg-gray-400"} text-white p-2 rounded`)}${attr("disabled", !canRegister, true)}>Register</button></form>`;
  pop();
}
export {
  _page as default
};
