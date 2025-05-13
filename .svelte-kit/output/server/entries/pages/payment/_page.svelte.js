import { m as attr, e as escape_html, g as attr_class, c as bind_props } from "../../../chunks/index3.js";
import "../../../chunks/client.js";
function _page($$payload, $$props) {
  let formValid;
  let data = $$props["data"];
  const { subtotal, shipping, total } = data;
  let cardNumber = "";
  let cardName = "";
  let expiryDate = "";
  let cvv = "";
  let saveCard = false;
  formValid = cardNumber.trim() && cardName.trim() && expiryDate.trim() && cvv.trim();
  $$payload.out += `<section class="mx-auto container p-4"><div class="grid grid-cols-1 md:grid-cols-2 mt-20 gap-10"><div><div class="flex flex-col"><label class="text-sm mb-1" for="card-number">Card Number*</label> <input id="card-number"${attr("value", cardNumber)} placeholder="Ex: 0000 0000 0000 0000" class="p-3 text-sm rounded-lg border border-black bg-[#F0F0F0]"></div> <div class="flex flex-col mt-5"><label class="text-sm mb-1" for="card-name">Name on card*</label> <input id="card-name"${attr("value", cardName)} placeholder="Ex: Brooklyn Simmons" class="p-3 text-sm rounded-lg border border-black bg-[#F0F0F0]"></div> <div class="flex justify-between gap-5"><div class="flex flex-col mt-5 w-full"><label class="text-sm mb-1" for="expiry">Expiry Date*</label> <input id="expiry"${attr("value", expiryDate)} placeholder="MM/YY" class="p-3 text-sm rounded-lg border border-black bg-[#F0F0F0]"></div> <div class="flex flex-col mt-5 w-full"><label class="text-sm mb-1" for="cvv">CVV*</label> <input id="cvv"${attr("value", cvv)} placeholder="CVV" class="p-3 text-sm rounded-lg border border-black bg-[#F0F0F0]"></div></div> <div class="flex gap-2 mt-5"><input class="accent-black" type="checkbox"${attr("checked", saveCard, true)}> <h1 class="font-poppins text-lg">Save Card</h1></div></div> <div class="bg-[#F0EFED] rounded-xl p-5 font-poppins space-y-7"><h1 class="font-bold text-lg text-center">Summary</h1> <div class="flex justify-between"><h1>Subtotal</h1> <h1 class="font-semibold">$${escape_html(subtotal)}</h1></div> <div class="flex justify-between border-b pb-3"><h1>Estimated Shipping &amp; Handling</h1> <p class="font-bold">${escape_html(shipping == "0" ? "FREE" : `$${shipping}`)}</p></div> <div class="flex justify-between"><h1>Total</h1> <h1 class="font-semibold">$${escape_html(total)}</h1></div> <a${attr("href", `/payment?subtotal=${subtotal}&shipping=${shipping}&total=${total}`)}${attr_class(`block text-center px-4 w-full py-2 rounded-3xl text-lg font-poppins font-medium text-white ${formValid ? "bg-black" : "bg-gray-400 pointer-events-none"} transition duration-300`)}>Order Confirm</a></div></div></section>`;
  bind_props($$props, { data });
}
export {
  _page as default
};
