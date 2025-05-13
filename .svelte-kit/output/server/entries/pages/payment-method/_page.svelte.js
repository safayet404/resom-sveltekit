import { l as ensure_array_like, m as attr, e as escape_html, g as attr_class, c as bind_props } from "../../../chunks/index3.js";
function _page($$payload, $$props) {
  let data = $$props["data"];
  const { subtotal, shipping, total } = data;
  const paymentMethods = [
    {
      id: 1,
      name: "credit",
      image: "/credit.png",
      label: "Credit"
    },
    {
      id: 2,
      name: "debit",
      image: "/debit.png",
      label: "Debit"
    },
    {
      id: 3,
      name: "boleto",
      image: "/boleto.png",
      label: "Boleto"
    },
    {
      id: 4,
      name: "pix",
      image: "/pix.png",
      label: "Pix"
    }
  ];
  let selectedPayment = "";
  const each_array = ensure_array_like(paymentMethods);
  $$payload.out += `<section class="mx-auto container p-4"><h1 class="uppercase text-gray-400 mt-20">Select payement method</h1> <div class="grid grid-cols-1 md:grid-cols-2 mt-20 gap-10"><div><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let method = each_array[$$index];
    $$payload.out += `<label class="flex justify-between items-center p-3 border rounded-lg mb-2 cursor-pointer"><div class="flex items-center gap-2"><img${attr("src", method.image)}${attr("alt", method.label)} class="w-6 h-6"> <span>${escape_html(method.label)}</span></div> <input type="radio" name="payment"${attr("value", method.name)}${attr("checked", selectedPayment === method.name, true)} class="accent-black"></label>`;
  }
  $$payload.out += `<!--]--></div> <div class="bg-[#F0EFED] rounded-xl p-5 font-poppins space-y-7"><h1 class="font-bold text-lg text-center">Summary</h1> <div class="flex justify-between"><h1>Subtotal</h1> <h1 class="font-semibold">$${escape_html(subtotal)}</h1></div> <div class="flex justify-between border-b- pb-3"><h1>Estimated Shipping &amp; Handling</h1> <p class="font-bold">${escape_html(shipping == "0" ? "FREE" : `$${shipping}`)}</p></div> <div class="flex justify-between"><h1>Total</h1> <h1 class="font-semibold">$${escape_html(total)}</h1></div> <a${attr("href", `/payment?subtotal=${subtotal}&shipping=${shipping}&total=${total}`)}${attr_class(`block text-center px-4 w-full py-2 rounded-3xl text-lg font-poppins font-medium text-white transition duration-300 ${"bg-gray-400 pointer-events-none"}`)}>${escape_html("Proceed to Pay")}</a></div></div></section>`;
  bind_props($$props, { data });
}
export {
  _page as default
};
