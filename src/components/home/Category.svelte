<script>
  import { fixImageUrl } from "$lib/utils/fixImageUrl";

  import { register, addMessages, init, locale as i18nLocale } from "svelte-i18n";
  import { browser } from "$app/environment";
  import { fetchCollectionTreeTranslation } from "$lib/saleor/categories";

  export let collection;
  export let lang;

  let translateCollection = collection;

  $: if (browser && i18nLocale && i18nLocale !== lang) {
    const languageCode = $i18nLocale.toUpperCase();

    fetchCollectionTreeTranslation(languageCode)
      .then((newCollection) => {
        translateCollection = newCollection;
      })
      .catch((err) => {
        toast.error("Failed to load translated categories.");
      });
  }
</script>

<section class=" mx-auto">
  <div class="grid md:grid-cols-4 grid-cols-2 justify-center gap-5 mt-10 px-5 lg:px-10">
    {#each translateCollection as item}
      <a class="single-cat" href={`/collection/${item?.slug}`}>
        <div class="image-holder p-4">
          <img
            class="w-full h-full object-contain"
            alt="category"
            src={fixImageUrl(item?.backgroundImage?.url)}
          />
        </div>

        <div class="default-black-bg opacity-45"></div>
        <h1 class="text-xs md:text-sm lg:text-xl cat-title capitalize bg-[#00000029]">
          {item?.name}
        </h1>
      </a>
    {/each}
  </div>
</section>

<style>
  .single-cat {
    background: linear-gradient(to bottom, #eee9e5, #f5f5f5);
  }
  .single-cat:hover .cat-title {
    background-color: black;
    color: white;
    transition: all 0.4s ease-in-out;
  }
  .image-holder {
    overflow: hidden;
  }
  .image-holder img {
    transition: transform 0.4s ease-in-out;
  }
  .image-holder:hover img {
    transform: scale(1.1);
  }
  .cat-title {
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: 500;

    text-align: center;
  }
</style>
