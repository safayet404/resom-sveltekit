import { k as store_get, o as head, l as ensure_array_like, m as attr, e as escape_html, g as attr_class, u as unsubscribe_stores, a as pop, p as push } from "../../../chunks/index3.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { c as cart } from "../../../chunks/cart.js";
import "../../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let totalPrice, effectiveTotal, deliveryChargeFinal, finalTotal;
  let coupon = "";
  let couponError = "";
  console.log("cart", store_get($$store_subs ??= {}, "$cart", cart));
  totalPrice = store_get($$store_subs ??= {}, "$cart", cart).reduce(
    (total, item) => {
      return total + item.price * item.quantity;
    },
    0
  );
  effectiveTotal = totalPrice;
  deliveryChargeFinal = effectiveTotal > 1e3 ? 0 : 10;
  finalTotal = (effectiveTotal + deliveryChargeFinal).toFixed(2);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Cart</title>`;
    $$payload2.out += `<meta name="description" content="This is cart page">`;
  });
  $$payload.out += `<section class="container mx-auto p-4"><div class="mt-20 sm:mt-16 flex justify-between"><h1 class="text-gray-400 uppercase">Cart Item(s)</h1></div> `;
  if (store_get($$store_subs ??= {}, "$cart", cart).length >= 1) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$cart", cart));
    $$payload.out += `<div class="grid grid-cols-1 gap-10 md:grid-cols-2 mt-10"><div><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$payload.out += `<div class="flex items-center gap-3 mb-2 border p-3 rounded-lg"><div class="col-span-1"><button aria-label="Delete item" class="text-lg text-red-600">`;
      Icon($$payload, { icon: "material-symbols:delete" });
      $$payload.out += `<!----></button></div> <div class="flex gap-20"><img class="w-20 h-20"${attr("src", item?.thumbnail)} alt="product_image"> <div><div><h1 class="font-medium text-sm md:text-lg">${escape_html(item?.name)}</h1> <h2 class="text-xs md:text-sm capitalize text-gray-600">Size : ${escape_html(item?.selectedSize)}    
                                        Color :
                                        ${escape_html(item?.selectedColor)}</h2></div> <div class="flex gap-2"><p class="font-medium font-poppins text-xs md:text-sm">$${escape_html(item?.price)}</p> `;
      if (item?.discount) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<p class="font-medium text-xs md:text-sm text-gray-400 line-through">$${escape_html(item?.priceDiscount)}</p>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> <div class="flex justify-start mt-3"><div class="flex items-center bg-[#F0F0F0] rounded-2xl"><button class="px-3 text-center font-bold text-lg">-</button> <p class="px-3 font-medium text-sm">${escape_html(item.quantity)}</p> <button class="px-3 text-center font-bold text-lg">+</button></div></div></div></div></div>`;
    }
    $$payload.out += `<!--]--></div> <div class="bg-[#F0EFED] rounded-xl p-5 font-poppins space-y-7"><h1 class="font-bold text-lg text-center">Summary</h1> `;
    {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="w-full flex gap-3"><input${attr("value", coupon)} placeholder="Enter Coupon" class="w-[70%] border border-black outline-none bg-transparent py-2 px-4 rounded-3xl" type="text"> <button${attr("disabled", !coupon.trim(), true)}${attr_class(`w-[30%] rounded-3xl ${coupon.trim() ? "bg-black" : "bg-gray-600"} text-white px-4`)}>Apply</button></div>`;
    }
    $$payload.out += `<!--]--> <div class="text-red-600 text-xs">${escape_html(couponError)}</div> <div class="flex justify-between"><h1>Subtotal</h1> <h1 class="font-semibold">$${escape_html(effectiveTotal)}</h1></div> <div class="flex justify-between border-b pb-3"><h1>Estimated Shipping &amp; Handling</h1> <h1${attr_class(`font-semibold ${deliveryChargeFinal === 0 ? "text-red-600" : ""}`)}>${escape_html(deliveryChargeFinal === 0 ? "Free" : `$${deliveryChargeFinal}`)}</h1></div> <div class="flex justify-between"><h1>Total</h1> <h1 class="font-semibold">$${escape_html(finalTotal)}</h1></div> <button class="px-4 w-full py-2 rounded-3xl bg-black text-lg font-poppins font-medium text-white">Process to pay</button></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="mx-auto text-center mt-5 text-xl"><p>No items in the cart</p> <a href="/" class="px-4 py-2 rounded-3xl text-white bg-black text-sm font-medium mt-5">Go Shopping</a></div>`;
  }
  $$payload.out += `<!--]--></section>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
