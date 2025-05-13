import { L as LoginModal } from "../../../chunks/LoginModal.js";
function _page($$payload) {
  let isLoginOpen = false;
  $$payload.out += `<section class="container mx-auto p-4"><div><img src="/login.gif" alt="login" class="w-48 mx-auto mt-20 h-48 object-contain"> <div class="flex justify-center mt-10"><button class="mx-auto text-white bg-black px-4 py-2 rounded-lg font-semibold text-center inline-block">You are not logged in.Login first</button></div></div></section> `;
  LoginModal($$payload, {
    isOpen: isLoginOpen,
    close: () => isLoginOpen = false
  });
  $$payload.out += `<!---->`;
}
export {
  _page as default
};
