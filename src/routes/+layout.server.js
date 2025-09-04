export const prerender = false;

import {
  fetchCategoryTree,
  fetchCategoryTreeTranslation,
  fetchCollectionTreeTranslation,
} from "$lib/saleor/categories";

/**
 * Detects the preferred locale from Accept-Language header.
 * Fallbacks to 'en' if no match is found.
 */
function detectLocaleFromHeader(request) {
  const accept = request.headers.get("accept-language") || "";
  const langs = accept.split(",").map((l) => l.split(";")[0].trim());
  const supported = ["en", "es", "pt", "de"];
  const matched = langs.find((l) => supported.includes(l.split("-")[0]));
  return matched ? matched.split("-")[0] : "en";
}

export async function load({ cookies, setHeaders, locals, request }) {
  let locale = cookies.get("locale");

  const translateCategories = await fetchCategoryTreeTranslation(locale);

  if (!locale) {
    locale = detectLocaleFromHeader(request);

    cookies.set("locale", locale, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return {
    translateCategories,
    user: locals.user || null,
    version: Date.now(),
    locale,
  };
}
