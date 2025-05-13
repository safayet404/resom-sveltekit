import { b as attr_style, c as bind_props, e as escape_html, d as spread_props, f as spread_attributes, a as pop, p as push, g as attr_class, h as stringify, j as slot, k as store_get, l as ensure_array_like, u as unsubscribe_stores, m as attr } from "../../chunks/index3.js";
import { u as useToasterStore, t as toast, a as update, e as endPause, s as startPause, p as prefersReducedMotion } from "../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { o as onDestroy, I as Icon } from "../../chunks/Icon.js";
import { y as fallback } from "../../chunks/utils.js";
import { s as stores } from "../../chunks/client.js";
import { S as Splide_1, a as SplideSlide } from "../../chunks/SplideSlide.js";
import { L as LoginModal } from "../../chunks/LoginModal.js";
import { c as cart } from "../../chunks/cart.js";
import { f as favorite } from "../../chunks/favorite.js";
import "../../chunks/functions.js";
import { u as user } from "../../chunks/auth2.js";
function calculateOffset(toast2, $toasts, opts) {
  const { reverseOrder, gutter = 8, defaultPosition } = opts || {};
  const relevantToasts = $toasts.filter((t) => (t.position || defaultPosition) === (toast2.position || defaultPosition) && t.height);
  const toastIndex = relevantToasts.findIndex((t) => t.id === toast2.id);
  const toastsBefore = relevantToasts.filter((toast3, i) => i < toastIndex && toast3.visible).length;
  const offset = relevantToasts.filter((t) => t.visible).slice(...reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]).reduce((acc, t) => acc + (t.height || 0) + gutter, 0);
  return offset;
}
const handlers = {
  startPause() {
    startPause(Date.now());
  },
  endPause() {
    endPause(Date.now());
  },
  updateHeight: (toastId, height) => {
    update({ id: toastId, height });
  },
  calculateOffset
};
function useToaster(toastOptions) {
  const { toasts, pausedAt } = useToasterStore(toastOptions);
  const timeouts = /* @__PURE__ */ new Map();
  let _pausedAt;
  const unsubscribes = [
    pausedAt.subscribe(($pausedAt) => {
      if ($pausedAt) {
        for (const [, timeoutId] of timeouts) {
          clearTimeout(timeoutId);
        }
        timeouts.clear();
      }
      _pausedAt = $pausedAt;
    }),
    toasts.subscribe(($toasts) => {
      if (_pausedAt) {
        return;
      }
      const now = Date.now();
      for (const t of $toasts) {
        if (timeouts.has(t.id)) {
          continue;
        }
        if (t.duration === Infinity) {
          continue;
        }
        const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);
        if (durationLeft < 0) {
          if (t.visible) {
            toast.dismiss(t.id);
          }
          return null;
        }
        timeouts.set(t.id, setTimeout(() => toast.dismiss(t.id), durationLeft));
      }
    })
  ];
  onDestroy(() => {
    for (const unsubscribe of unsubscribes) {
      unsubscribe();
    }
  });
  return { toasts, handlers };
}
function CheckmarkIcon($$payload, $$props) {
  let primary = fallback($$props["primary"], "#61d345");
  let secondary = fallback($$props["secondary"], "#fff");
  $$payload.out += `<div class="svelte-11kvm4p"${attr_style("", {
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
  bind_props($$props, { primary, secondary });
}
function ErrorIcon($$payload, $$props) {
  let primary = fallback($$props["primary"], "#ff4b4b");
  let secondary = fallback($$props["secondary"], "#fff");
  $$payload.out += `<div class="svelte-1ee93ns"${attr_style("", {
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
  bind_props($$props, { primary, secondary });
}
function LoaderIcon($$payload, $$props) {
  let primary = fallback($$props["primary"], "#616161");
  let secondary = fallback($$props["secondary"], "#e0e0e0");
  $$payload.out += `<div class="svelte-1j7dflg"${attr_style("", {
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
  bind_props($$props, { primary, secondary });
}
function ToastIcon($$payload, $$props) {
  let type, icon, iconTheme;
  let toast2 = $$props["toast"];
  ({ type, icon, iconTheme } = toast2);
  if (typeof icon === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="animated svelte-1kgeier">${escape_html(icon)}</div>`;
  } else if (typeof icon !== "undefined") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<!---->`;
    icon?.($$payload, {});
    $$payload.out += `<!---->`;
  } else if (type !== "blank") {
    $$payload.out += "<!--[2-->";
    $$payload.out += `<div class="indicator svelte-1kgeier">`;
    LoaderIcon($$payload, spread_props([iconTheme]));
    $$payload.out += `<!----> `;
    if (type !== "loading") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="status svelte-1kgeier">`;
      if (type === "error") {
        $$payload.out += "<!--[-->";
        ErrorIcon($$payload, spread_props([iconTheme]));
      } else {
        $$payload.out += "<!--[!-->";
        CheckmarkIcon($$payload, spread_props([iconTheme]));
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { toast: toast2 });
}
function ToastMessage($$payload, $$props) {
  push();
  let toast2 = $$props["toast"];
  $$payload.out += `<div${spread_attributes({ class: "message", ...toast2.ariaProps }, "svelte-1nauejd")}>`;
  if (typeof toast2.message === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `${escape_html(toast2.message)}`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    toast2.message?.($$payload, { toast: toast2 });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { toast: toast2 });
  pop();
}
function ToastBar($$payload, $$props) {
  push();
  let toast2 = $$props["toast"];
  let position = fallback($$props["position"], () => void 0, true);
  let style = fallback($$props["style"], "");
  let Component = fallback($$props["Component"], () => void 0, true);
  let factor;
  let animation;
  {
    const top = (toast2.position || position || "top-center").includes("top");
    factor = top ? 1 : -1;
    const [enter, exit] = prefersReducedMotion() ? ["fadeIn", "fadeOut"] : ["enter", "exit"];
    animation = toast2.visible ? enter : exit;
  }
  $$payload.out += `<div${attr_class(`base ${stringify(toast2.height ? animation : "transparent")} ${stringify(toast2.className || "")}`, "svelte-ug60r4")}${attr_style(`${stringify(style)}; ${stringify(toast2.style)}`, { "--factor": factor })}>`;
  if (Component) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Component?.($$payload, {
      $$slots: {
        icon: ($$payload2) => {
          ToastIcon($$payload2, { toast: toast2, slot: "icon" });
        },
        message: ($$payload2) => {
          ToastMessage($$payload2, { toast: toast2, slot: "message" });
        }
      }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { ToastIcon, ToastMessage, toast: toast2 }, () => {
      ToastIcon($$payload, { toast: toast2 });
      $$payload.out += `<!----> `;
      ToastMessage($$payload, { toast: toast2 });
      $$payload.out += `<!---->`;
    });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { toast: toast2, position, style, Component });
  pop();
}
function ToastWrapper($$payload, $$props) {
  push();
  let top, bottom, factor, justifyContent;
  let toast2 = $$props["toast"];
  let setHeight = $$props["setHeight"];
  top = toast2.position?.includes("top") ? 0 : null;
  bottom = toast2.position?.includes("bottom") ? 0 : null;
  factor = toast2.position?.includes("top") ? 1 : -1;
  justifyContent = toast2.position?.includes("center") && "center" || (toast2.position?.includes("right") || toast2.position?.includes("end")) && "flex-end" || null;
  $$payload.out += `<div${attr_class("wrapper svelte-v01oml", void 0, {
    "active": toast2.visible,
    "transition": !prefersReducedMotion()
  })}${attr_style("", {
    "--factor": factor,
    "--offset": toast2.offset,
    top,
    bottom,
    "justify-content": justifyContent
  })}>`;
  if (toast2.type === "custom") {
    $$payload.out += "<!--[-->";
    ToastMessage($$payload, { toast: toast2 });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", { toast: toast2 }, () => {
      ToastBar($$payload, { toast: toast2, position: toast2.position });
    });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { toast: toast2, setHeight });
  pop();
}
function Toaster($$payload, $$props) {
  push();
  var $$store_subs;
  let reverseOrder = fallback($$props["reverseOrder"], false);
  let position = fallback($$props["position"], "top-center");
  let toastOptions = fallback($$props["toastOptions"], () => void 0, true);
  let gutter = fallback($$props["gutter"], 8);
  let containerStyle = fallback($$props["containerStyle"], () => void 0, true);
  let containerClassName = fallback($$props["containerClassName"], () => void 0, true);
  const { toasts, handlers: handlers2 } = useToaster(toastOptions);
  let _toasts;
  _toasts = store_get($$store_subs ??= {}, "$toasts", toasts).map((toast2) => ({
    ...toast2,
    position: toast2.position || position,
    offset: handlers2.calculateOffset(toast2, store_get($$store_subs ??= {}, "$toasts", toasts), {
      reverseOrder,
      gutter,
      defaultPosition: position
    })
  }));
  const each_array = ensure_array_like(_toasts);
  $$payload.out += `<div${attr_class(`toaster ${stringify(containerClassName || "")}`, "svelte-1phplh9")}${attr_style(containerStyle)} role="alert"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let toast2 = each_array[$$index];
    ToastWrapper($$payload, {
      toast: toast2,
      setHeight: (height) => handlers2.updateHeight(toast2.id, height)
    });
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    reverseOrder,
    position,
    toastOptions,
    gutter,
    containerStyle,
    containerClassName
  });
  pop();
}
({
  check: stores.updated.check
});
function TopHeader($$payload) {
  const options = {
    type: "loop",
    autoplay: true,
    interval: 2e3,
    pagination: false,
    arrows: false,
    perPage: 1
  };
  $$payload.out += `<div class="mx-auto text-center md:text-base text-xs sm:text-sm">`;
  Splide_1($$payload, {
    options,
    children: ($$payload2) => {
      SplideSlide($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<h1>Enjoy Up to 30% Off at Urban Sailor</h1>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      SplideSlide($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<h1>Off Disocunt</h1>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
}
function ToggleButton($$payload, $$props) {
  let isMenuOpen = $$props["isMenuOpen"];
  let toggleMenu = $$props["toggleMenu"];
  $$payload.out += `<div class="flex justify-start lg:hidden"><button class="btn btn-square btn-ghost" aria-label="Toggle menu">`;
  if (!isMenuOpen) {
    $$payload.out += "<!--[-->";
    $$payload.out += `☰`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></button></div>`;
  bind_props($$props, { isMenuOpen, toggleMenu });
}
function MegaMenu($$payload, $$props) {
  push();
  let categories = fallback($$props["categories"], () => [], true);
  const each_array = ensure_array_like(categories);
  $$payload.out += `<div class="hidden lg:flex"><ul class="flex space-x-6 text-[#1F2224] text-sm font-semibold uppercase"><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
    let category = each_array[$$index_2];
    $$payload.out += `<li class="relative group"><a${attr("href", `/category/${category.slug}`)} class="flex items-center gap-1 uppercase">${escape_html(category.name)} `;
    if (category.children?.edges.length > 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="material-icons">keyboard_arrow_down</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></a> `;
    if (category.children.edges.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(category.children.edges.slice().sort((a, b) => b.node.children.edges.length - a.node.children.edges.length));
      $$payload.out += `<div class="absolute top-full left-0 w-max rounded-md flex flex-wrap gap-10 p-6 bg-white shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out"><!--[-->`;
      for (let $$index_1 = 0, $$length2 = each_array_1.length; $$index_1 < $$length2; $$index_1++) {
        let { node: subcategory } = each_array_1[$$index_1];
        const each_array_2 = ensure_array_like(subcategory.children.edges);
        $$payload.out += `<div><h3 class="text-gray-700 font-semibold mb-4"><a${attr("href", `/category/${subcategory.slug}`)}>${escape_html(subcategory.name)}</a></h3> <ul><!--[-->`;
        for (let $$index = 0, $$length3 = each_array_2.length; $$index < $$length3; $$index++) {
          let { node: subsub } = each_array_2[$$index];
          $$payload.out += `<li><a class="block py-2 hover:underline text-sm"${attr("href", `/category/${subsub.slug}`)}>${escape_html(subsub.name)}</a></li>`;
        }
        $$payload.out += `<!--]--></ul></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></li>`;
  }
  $$payload.out += `<!--]--></ul></div>`;
  bind_props($$props, { categories });
  pop();
}
function Resom($$payload) {
  $$payload.out += `<div class="text-center lg:text-center"><a class="font-bold font-poppins mx-auto text-center uppercase text-sm sm:text-xl md:text-2xl" href="/">Resom</a></div>`;
}
function SmIcons($$payload, $$props) {
  push();
  var $$store_subs;
  let cartLength, favoriteLength;
  let isLoginOpen = false;
  cartLength = store_get($$store_subs ??= {}, "$cart", cart).length;
  favoriteLength = store_get($$store_subs ??= {}, "$favorite", favorite).length;
  $$payload.out += `<div class="lg:hidden flex justify-end"><ul class="flex mt-2 items-center gap-3"><li class="relative"><a class="cursor-pointer text-lg sm:text-2xl md:text-3xl" href="/favorite">`;
  Icon($$payload, { icon: "material-symbols-light:favorite" });
  $$payload.out += `<!----></a> <span class="absolute text-[12px] -top-3 -right-2 text-white rounded-2xl p-1 bg-red-800">${escape_html(favoriteLength)}</span></li> <li class="relative"><a href="/cart" class="cursor-pointer text-lg sm:text-2xl md:text-3xl">`;
  Icon($$payload, { icon: "solar:cart-bold" });
  $$payload.out += `<!----></a> <span class="absolute text-[12px] -top-3 -right-2 text-white rounded-2xl p-1 bg-red-800">${escape_html(cartLength)}</span></li> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></ul></div> `;
  LoginModal($$payload, {
    isOpen: isLoginOpen,
    close: () => isLoginOpen = false
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function LgIcons($$payload, $$props) {
  push();
  var $$store_subs;
  let isLoginOpen = false;
  let searchQuery = "";
  store_get($$store_subs ??= {}, "$cart", cart).length;
  store_get($$store_subs ??= {}, "$favorite", favorite).length;
  $$payload.out += `<div class="hidden justify-end lg:flex gap-2"><div class="grid grid-cols-2 gap-3 justify-between"><form class="flex items-center border rounded-2xl px-2 h-10 mt-1"><span class="material-icons text-base text-gray-500">search</span> <input${attr("value", searchQuery)} placeholder="Search Items" class="ml-2 text-sm outline-none bg-transparent flex-grow"></form> <div><ul class="flex mt-2 items-center gap-3"><li class="relative"><a href="/favorite" class="cursor-pointer text-lg sm:text-2xl md:text-3xl"><span class="material-icons">favorite</span></a> `;
  if (store_get($$store_subs ??= {}, "$favorite", favorite).length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="absolute -top-4 -right-2 text-white rounded-2xl p-1 bg-red-800">${escape_html(store_get($$store_subs ??= {}, "$favorite", favorite).length)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></li> <li class="relative"><a href="/cart" class="cursor-pointer text-lg sm:text-2xl md:text-3xl"><span class="material-icons">shopping_cart</span></a> `;
  if (store_get($$store_subs ??= {}, "$cart", cart).length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="absolute -top-4 -right-2 text-white rounded-2xl p-1 bg-red-800">${escape_html(store_get($$store_subs ??= {}, "$cart", cart).length)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></li> <li class="relative"><span role="button" tabindex="0" aria-label="profile" class="cursor-pointer text-lg sm:text-2xl md:text-3xl mt-1">`;
  if (store_get($$store_subs ??= {}, "$user", user)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="material-icons">how_to_reg</span>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="material-icons">person</span>`;
  }
  $$payload.out += `<!--]--></span> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></li></ul></div></div></div> `;
  LoginModal($$payload, {
    isOpen: isLoginOpen,
    close: () => isLoginOpen = false
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function MobileMenu($$payload, $$props) {
  let isOpen = fallback($$props["isOpen"], false);
  let onClose = fallback($$props["onClose"], () => {
  });
  let categories = fallback($$props["categories"], () => [], true);
  let openCategory = null;
  let openSubcategory = null;
  if (isOpen) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(categories);
    $$payload.out += `<div class="fixed top-16 left-0 rounded-md h-full w-64 mt-4 bg-white shadow z-50 p-4"><ul class="space-y-4 text-black"><div class="flex justify-end pb-3"><button class="text-base">✖</button></div> <!--[-->`;
    for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
      let category = each_array[$$index_2];
      $$payload.out += `<li><div class="flex justify-between items-center"><a${attr("href", `/category/${category.slug}`)} class="font-semibold">${escape_html(category.name)}</a> `;
      if (category.children.edges.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<button class="text-xs">${escape_html(openCategory === category.slug ? "▲" : "▼")}</button>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div> `;
      if (openCategory === category.slug) {
        $$payload.out += "<!--[-->";
        const each_array_1 = ensure_array_like(category.children.edges);
        $$payload.out += `<ul class="ml-4 mt-2 space-y-2 text-sm text-gray-700"><!--[-->`;
        for (let $$index_1 = 0, $$length2 = each_array_1.length; $$index_1 < $$length2; $$index_1++) {
          let { node: subcategory } = each_array_1[$$index_1];
          $$payload.out += `<li><div class="flex justify-between items-center"><a${attr("href", `/category/${subcategory.slug}`)}>${escape_html(subcategory.name)}</a> `;
          if (subcategory.children.edges.length > 0) {
            $$payload.out += "<!--[-->";
            $$payload.out += `<button class="text-xs">${escape_html(openSubcategory === subcategory.slug ? "▲" : "▼")}</button>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></div> `;
          if (openSubcategory === subcategory.slug) {
            $$payload.out += "<!--[-->";
            const each_array_2 = ensure_array_like(subcategory.children.edges);
            $$payload.out += `<ul class="ml-4 mt-1 space-y-1 text-xs text-gray-600"><!--[-->`;
            for (let $$index = 0, $$length3 = each_array_2.length; $$index < $$length3; $$index++) {
              let { node: subsub } = each_array_2[$$index];
              $$payload.out += `<li><a${attr("href", `/category/${subsub.slug}`)}>${escape_html(subsub.name)}</a></li>`;
            }
            $$payload.out += `<!--]--></ul>`;
          } else {
            $$payload.out += "<!--[!-->";
          }
          $$payload.out += `<!--]--></li>`;
        }
        $$payload.out += `<!--]--></ul>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></li>`;
    }
    $$payload.out += `<!--]--></ul></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { isOpen, onClose, categories });
}
function MobileSearch($$payload, $$props) {
  push();
  let searchQuery = "";
  $$payload.out += `<div class="lg:hidden flex container p-3 mx-auto"><form class="border rounded-2xl flex items-center w-full"><span class="material-icons my-auto p-1">search</span> <input placeholder="Search Items" class="my-auto outline-none flex-grow"${attr("value", searchQuery)}></form></div>`;
  pop();
}
function Navbar($$payload, $$props) {
  push();
  let isMenuOpen = false;
  let data = $$props["data"];
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };
  const closeMenu = () => isMenuOpen = false;
  $$payload.out += `<div class="fixed top-0 border-b border-[#C9C9C9] left-0 right-0 bg-white z-50">`;
  TopHeader($$payload);
  $$payload.out += `<!----> <div class="navbar px-4 container mx-auto grid grid-cols-3 lg:grid-cols-3 items-center justify-between py-5">`;
  ToggleButton($$payload, { isMenuOpen, toggleMenu });
  $$payload.out += `<!----> `;
  MegaMenu($$payload, { categories: data.categories });
  $$payload.out += `<!----> `;
  Resom($$payload);
  $$payload.out += `<!----> `;
  SmIcons($$payload);
  $$payload.out += `<!----> `;
  LgIcons($$payload);
  $$payload.out += `<!----></div> `;
  MobileMenu($$payload, {
    categories: data.categories,
    isOpen: isMenuOpen,
    onClose: closeMenu
  });
  $$payload.out += `<!----> `;
  MobileSearch($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { data });
  pop();
}
function Footer($$payload) {
  $$payload.out += `<section class="bg-[#E6E6E6]"><div class="container px-4 mx-auto"><div class="grid md:grid-cols-2 mx-auto lg:grid-cols-3 grid-cols-2 gap-5"><div class="mb-10"><h1 class="text-sm sm:text-lg uppercase md:text-3xl font-bold text-black mt-10">Newsletter</h1> <p class="text-xs md:text-sm mt-2 text-[#878787]">We have clothes that suits your style and which you’re proud
                    to wear. From women to men.</p> <div class="flex flex-wrap mt-3 gap-2"><input placeholder="Send E-mail" class="px-3 text-xs md:text-base md:px-5 md:py-2 w-full rounded-sm md:rounded-lg bg-[#E6E6E6] border border-[#5C5C5C]"> <button class="px-3 md:px-5 text-xs sm:text-sm lg:text-base rounded-sm md:rounded-lg font-medium text-black bg-[#D9D9D9]">Send</button></div></div> <div class="mb-10 mx-auto"><h1 class="text-sm sm:text-lg uppercase md:text-3xl font-bold text-black mt-10">Company</h1> <ul class="text-[#5C5C5C] mt-5 text-xs sm:text-sm md:text-base space-y-3"><li>About</li> <li>Features</li> <li>Works</li> <li>Career</li></ul></div> <div class="mb-10 lg:mx-auto"><h1 class="text-sm sm:text-lg uppercase md:text-3xl font-bold text-black sm:mt-10">Company</h1> <ul class="text-[#5C5C5C] mt-5 text-xs sm:text-sm md:text-base space-y-3"><li>Customer Support</li> <li>Delivery Details</li> <li>Terms &amp; Conditions</li> <li>Privacy Policy</li></ul></div></div> <hr class="w-full border-[#CFCFCF]"> <div class="grid grid-cols-1 text-center gap-2 md:grid-cols-3 mx-auto mt-5"><div class="md:mb-5"><h1 class="text-sm md:text-base">All Right Reserved</h1></div> <div><ul class="mx-auto flex items-center justify-center gap-5"><li><img alt="socail_icon" src="/fb.png"></li> <li><img alt="socail_icon" src="/instagram.png"></li> <li><img alt="socail_icon" src="/linkedin.png"></li> <li><img alt="socail_icon" src="/youtube.png"></li> <li><img alt="socail_icon" src="/x.png"></li></ul></div> <div><ul class="mx-auto flex items-center justify-end gap-1"><li><img alt="socail_icon" src="/visa.png"></li> <li><img alt="socail_icon" src="/mastercard.png"></li> <li><img alt="socail_icon" src="/paypal.png"></li> <li><img alt="socail_icon" src="/epay.png"></li> <li><img alt="socail_icon" src="/gpay.png"></li></ul></div></div></div></section>`;
}
function _layout($$payload, $$props) {
  push();
  let data = $$props["data"];
  user.set(data.user);
  Toaster($$payload, {});
  $$payload.out += `<!----> <div class="app">`;
  Navbar($$payload, { data });
  $$payload.out += `<!----> <main class="mt-[30%] sm:mt-[15%] md:mt-[10%] lg:mt-[5%]"><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></main> `;
  Footer($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { data });
  pop();
}
export {
  _layout as default
};
