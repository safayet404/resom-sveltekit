import { fetchAbout } from "$lib/saleor/content";

export async function load(params) {
  const aboutContent = await fetchAbout("terms-conditions");

  return {
    aboutContent,
  };
}
