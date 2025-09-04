// src/lib/i18n.ts
import { browser } from "$app/environment";
import { init, register, getLocaleFromNavigator } from "svelte-i18n";

const defaultLocale = "en";

// Register translation files (lazy-loaded)
register("en", () => import("./locales/en.json"));
register("pt", () => import("./locales/pt.json"));
register("es", () => import("./locales/es.json"));

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser
    ? localStorage.getItem("locale") || getLocaleFromNavigator() || defaultLocale
    : defaultLocale,
});
