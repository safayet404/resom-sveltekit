import { fetchAbout } from "$lib/saleor/content";

export async function load(params) {
  const aboutContent = await fetchAbout("career");

  return {
    aboutContent,
  };
}
