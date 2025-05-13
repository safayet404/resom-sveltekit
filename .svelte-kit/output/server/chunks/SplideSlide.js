import { t as sanitize_props, v as rest_props, f as spread_attributes, w as clsx, j as slot, c as bind_props, a as pop, p as push } from "./index3.js";
import { y as fallback } from "./utils.js";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function forOwn(object, iteratee) {
  if (object) {
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== "__proto__") {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }
  return object;
}
function isObject(subject) {
  return subject !== null && typeof subject === "object";
}
function isEqualDeep(subject1, subject2) {
  if (Array.isArray(subject1) && Array.isArray(subject2)) {
    return subject1.length === subject2.length && !subject1.some((elm, index) => !isEqualDeep(elm, subject2[index]));
  }
  if (isObject(subject1) && isObject(subject2)) {
    const keys1 = Object.keys(subject1);
    const keys2 = Object.keys(subject2);
    return keys1.length === keys2.length && !keys1.some((key) => {
      return !Object.prototype.hasOwnProperty.call(subject2, key) || !isEqualDeep(subject1[key], subject2[key]);
    });
  }
  return subject1 === subject2;
}
function merge(object, source) {
  const merged = object;
  forOwn(source, (value, key) => {
    if (Array.isArray(value)) {
      merged[key] = value.slice();
    } else if (isObject(value)) {
      merged[key] = merge(isObject(merged[key]) ? merged[key] : {}, value);
    } else {
      merged[key] = value;
    }
  });
  return merged;
}
function slice(arrayLike, start, end) {
  return Array.prototype.slice.call(arrayLike, start, end);
}
function apply(func) {
  return func.bind.apply(func, [null].concat(slice(arguments, 1)));
}
function typeOf(type, subject) {
  return typeof subject === type;
}
apply(typeOf, "function");
apply(typeOf, "string");
apply(typeOf, "undefined");
function Splide_1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "go",
    "sync",
    "class",
    "options",
    "splide",
    "extensions",
    "transition",
    "hasTrack"
  ]);
  push();
  let className = fallback($$props["class"], void 0);
  let options = fallback($$props["options"], () => ({}), true);
  let splide = fallback($$props["splide"], void 0);
  let extensions = fallback($$props["extensions"], void 0);
  let transition = fallback($$props["transition"], void 0);
  let hasTrack = fallback($$props["hasTrack"], true);
  let prevOptions = merge({}, options);
  function go(control) {
    splide?.go(control);
  }
  function sync(target) {
    splide?.sync(target);
  }
  if (splide && !isEqualDeep(prevOptions, options)) {
    splide.options = options;
    prevOptions = merge({}, prevOptions);
  }
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(classNames("splide", className)),
      ...$$restProps
    },
    null
  )}>`;
  if (hasTrack) {
    $$payload.out += "<!--[-->";
    SplideTrack($$payload, {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "default", {}, null);
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, {
    class: className,
    options,
    splide,
    extensions,
    transition,
    hasTrack,
    go,
    sync
  });
  pop();
}
function SplideTrack($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(classNames("splide__track", className)),
      ...$$restProps
    },
    null
  )}><ul class="splide__list"><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></ul></div>`;
  bind_props($$props, { class: className });
  pop();
}
function SplideSlide($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  $$payload.out += `<li${spread_attributes(
    {
      class: clsx(classNames("splide__slide", className)),
      ...$$restProps
    },
    null
  )}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></li>`;
  bind_props($$props, { class: className });
  pop();
}
export {
  Splide_1 as S,
  SplideSlide as a
};
