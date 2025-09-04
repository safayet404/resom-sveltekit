<script>
  import { goto } from "$app/navigation";
  import { addPayment, completeCheckout, getCheckoutTotal } from "$lib/api/saleor";
  import { cart } from "../../../stores/cart";

  const token = localStorage.getItem("checkoutToken");

  async function payAndComplete() {
    try {
      const amount = await getCheckoutTotal(token);
      const paymentRes = await addPayment(token, amount, "mirumee.payments.dummy");

      if (paymentRes.checkoutPaymentCreate.errors.length) {
        return alert(
          "Payment error: " +
            paymentRes.checkoutPaymentCreate.errors.map((e) => e.message).join(", "),
        );
      }

      const completeRes = await completeCheckout(token);
      if (completeRes.checkoutComplete.errors.length) {
        return alert(
          "Checkout completion error: " +
            completeRes.checkoutComplete.errors.map((e) => e.message).join(", "),
        );
      }

      alert("Order placed! Order ID: " + completeRes.checkoutComplete.order.id);

      const order = completeRes.order;

      console.log("oprder", order);

      localStorage.removeItem("checkoutToken");
      localStorage.removeItem("cart");
      cart.set([]);
      goto("/checkout/confirmation", {
        state: order,
      });
      // Redirect or clear cart here
    } catch (err) {
      alert("Payment failed: " + err.message);
    }
  }
</script>

<div class="mx-auto container p-4 text-center">
  <div class="mt-5">
    <h2 class="text-xl font-semibold mt-[15%]">Payment</h2>
    <p class="text-sm text-gray-600 mb-4">Using Dummy Gateway</p>
    <button
      on:click={payAndComplete}
      class="bg-black text-white px-6 py-2 rounded hover:bg-slate-600"
    >
      Pay & Complete Order
    </button>
  </div>
</div>
