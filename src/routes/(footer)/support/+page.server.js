import { fetchAbout } from "$lib/saleor/content";

export async function load(params) {
  const aboutContent = await fetchAbout("customer-support");

  return {
    aboutContent,
  };
}
