<script>
  import toast, { Toaster } from "svelte-french-toast";
  import Header from "./Header.svelte";
  import Navbar from "../components/navbar/Navbar.svelte";
  import Footer from "../components/footer/Footer.svelte";
  import Loader from "../components/common/Loader.svelte";
  import { register, addMessages, init, locale as i18nLocale } from "svelte-i18n";
  import en from "$lib/i18n/locales/en.json";
  import es from "$lib/i18n/locales/es.json";
  import pt from "$lib/i18n/locales/pt.json";
  import "@splidejs/splide/dist/css/splide.min.css";
  import "../app.css";

  import Icon from "@iconify/svelte";
  import { user } from "../stores/auth";
  import { hydrated } from "../stores/hydration";
  import { isLoading } from "../stores/loading";
  import { onMount } from "svelte";
  import { navigating } from "$app/stores";
  import { browser } from "$app/environment";

  import { fetchCategoryTreeTranslation } from "$lib/saleor/categories";

  export let data;

  user.set(data.user);

  addMessages("en", en);
  addMessages("pt", pt);
  addMessages("es", es);
  init({
    fallbackLocale: "en",
    initialLocale: data.locale,
  });

  let translatedCategories = data?.translateCategories;

  $: if (browser && i18nLocale && i18nLocale !== data.locale) {
    const languageCode = $i18nLocale.toUpperCase();

    fetchCategoryTreeTranslation(languageCode)
      .then((newCategories) => {
        translatedCategories = newCategories;
        console.log("✅ Categories updated:", newCategories);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch categories:", err);
        toast.error("Failed to load translated categories.");
      });
  }
</script>

<Toaster />

<div class="app">
  <Navbar
    data={{
      ...data,
      translateCategories: translatedCategories,
    }}
  />

  <main class="">
    {#if $navigating}
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div class="rounded-lg bg-white p-6 shadow-lg">
          <Loader />
        </div>
      </div>
    {/if}
    <slot />
  </main>

  <Footer />
</div>
