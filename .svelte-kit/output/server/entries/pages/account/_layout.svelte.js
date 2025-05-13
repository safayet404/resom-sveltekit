import { n as getContext, k as store_get, l as ensure_array_like, g as attr_class, m as attr, e as escape_html, j as slot, u as unsubscribe_stores, a as pop, p as push } from "../../../chunks/index3.js";
import "../../../chunks/client.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let currentPath;
  const menuItems = [
    {
      label: "Profile",
      icon: "👤",
      path: "profile"
    },
    {
      label: "My Orders",
      icon: "📦",
      path: "orders"
    },
    {
      label: "Security",
      icon: "🔐",
      path: "security"
    },
    {
      label: "Payment",
      icon: "💳",
      path: "payment"
    },
    {
      label: "Affiliate",
      icon: "🎯",
      path: "affiliate"
    },
    { label: "Need Help", icon: "❓", path: "help" }
  ];
  currentPath = store_get($$store_subs ??= {}, "$page", page).url.pathname;
  const each_array = ensure_array_like(menuItems);
  $$payload.out += `<section class="container mx-auto p-4"><div class="flex mt-20 bg-[#EFEFEF] rounded-lg min-h-screen"><aside class="w-64 border-r p-4 space-y-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$payload.out += `<a${attr_class("block p-2 rounded hover:bg-gray-100 font-medium svelte-1vdgo1c", void 0, {
      "selected": currentPath.endsWith(item.path)
    })}${attr("href", `/account/${item.path}`)}>${escape_html(item.icon)}
                    ${escape_html(item.label)}</a>`;
  }
  $$payload.out += `<!--]--> <hr> <a class="text-red-600 font-medium p-2" href="/logout">🔓 Log Out</a></aside> <main class="flex-1 p-6"><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></main></div></section>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
