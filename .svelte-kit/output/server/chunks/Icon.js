import { q as current_component, t as sanitize_props, f as spread_attributes, a as pop, p as push } from "./index3.js";
import { c as checkIconState, g as generateIcon } from "./functions.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const state = {
    // Last icon name
    name: "",
    // Loading status
    loading: null,
    // Destroyed status
    destroyed: false
  };
  let mounted = false;
  let data;
  const onLoad = (icon) => {
    if (typeof $$sanitized_props.onLoad === "function") {
      $$sanitized_props.onLoad(icon);
    }
  };
  function loaded() {
  }
  onDestroy(() => {
    state.destroyed = true;
    if (state.loading) {
      state.loading.abort();
      state.loading = null;
    }
  });
  {
    const isMounted = !!$$sanitized_props.ssr || mounted;
    const iconData = checkIconState($$sanitized_props.icon, state, isMounted, loaded, onLoad);
    data = iconData ? generateIcon(iconData.data, $$sanitized_props) : null;
    if (data && iconData.classes) {
      data.attributes["class"] = (typeof $$sanitized_props["class"] === "string" ? $$sanitized_props["class"] + " " : "") + iconData.classes.join(" ");
    }
  }
  if (data) {
    $$payload.out += "<!--[-->";
    if (data.svg) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<svg${spread_attributes({ ...data.attributes }, null, void 0, void 0, 3)}>${html(data.body)}</svg>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span${spread_attributes({ ...data.attributes }, null)}></span>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  Icon as I,
  html as h,
  onDestroy as o
};
