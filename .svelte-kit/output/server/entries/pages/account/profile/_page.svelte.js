import { k as store_get, u as unsubscribe_stores } from "../../../../chunks/index3.js";
import { u as user } from "../../../../chunks/auth2.js";
function _page($$payload) {
  var $$store_subs;
  console.log("user data", store_get($$store_subs ??= {}, "$user", user));
  $$payload.out += `<div class="bg-white p-4 mx-auto container rounded-lg"><h2 class="text-2xl font-bold mb-4">Personal Information</h2> <p>Name: João Carlos da Silva</p> <p>Age: 29</p> <p>Gender: Male</p> <p>CPF: 123.456.789-00</p> <hr class="my-6"> <h3 class="text-lg font-semibold mb-2">Address</h3> <p>Rua João da Silva, 123, Bloco 12A, Centro, São Paulo - SP</p></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  _page as default
};
