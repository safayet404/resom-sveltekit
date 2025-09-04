// $lib/i18n/setLocale.js (example)
import { browser } from "$app/environment";

export function setLocaleCookie(locale) {
  if (browser) {
    document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax;`;
  }
}
