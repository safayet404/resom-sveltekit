import { l as ensure_array_like, c as bind_props } from "./index3.js";
import { y as fallback } from "./utils.js";
function Rating($$payload, $$props) {
  let rate = fallback($$props["rate"], 0);
  const each_array = ensure_array_like(Array(5));
  $$payload.out += `<div class="flex"><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    each_array[index];
    if (rate >= index + 1) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<svg class="md:w-5 w-3 h-3 sm:w-4 sm:h-4 md:h-5" viewBox="0 0 24 24" fill="#FF7F00" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 8H22L16.5 12.5L18.5 19L12 15L5.5 19L7.5 12.5L2 8H9L12 2Z"></path></svg>`;
    } else if (rate > index && rate < index + 1) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<svg class="md:w-5 w-3 h-3 sm:w-4 sm:h-4 md:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="half"><stop offset="50%" stop-color="#FF7F00"></stop><stop offset="50%" stop-color="#D3D3D3"></stop></linearGradient></defs><path fill="url(#half)" d="M12 2L15 8H22L16.5 12.5L18.5 19L12 15L5.5 19L7.5 12.5L2 8H9L12 2Z"></path></svg>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<svg class="md:w-5 w-3 h-3 sm:w-4 sm:h-4 md:h-5" viewBox="0 0 24 24" fill="#D3D3D3" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 8H22L16.5 12.5L18.5 19L12 15L5.5 19L7.5 12.5L2 8H9L12 2Z"></path></svg>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { rate });
}
export {
  Rating as R
};
