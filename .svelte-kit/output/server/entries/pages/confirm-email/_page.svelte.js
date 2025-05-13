import { o as head, e as escape_html, a as pop, p as push } from "../../../chunks/index3.js";
import "../../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  let status = "🔄 Confirming your email...";
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Email Confirmation</title>`;
    $$payload2.out += `<meta name="description" content="Email Confirmation">`;
  });
  $$payload.out += `<section class="container mx-auto p-4 text-center mt-20"><div class="mt-10"><h1 class="text-2xl font-bold mb-4">Email Confirmation</h1> <p class="text-lg">${escape_html(status)}</p></div></section>`;
  pop();
}
export {
  _page as default
};
