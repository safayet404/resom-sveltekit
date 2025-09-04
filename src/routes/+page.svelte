<script>
  import Category from "../components/home/Category.svelte";
  import CommonProduct from "../components/home/CommonProduct.svelte";
  import ByStyle from "../components/home/ByStyle.svelte";
  import { product } from "../data/productData";
  import { user } from "../stores/auth";

  import { fetchCategoryTree, fetchCollectionTreeTranslation } from "$lib/saleor/categories";
  import Hero from "../components/home/Hero.svelte";
  import OfferSection from "../components/home/Offer/OfferSection.svelte";
  import FeaturedProducts from "../components/home/FeaturedProducts.svelte";
  import Offer from "../components/home/Offer/Offer.svelte";
  import { _, locale as i18nLocale } from "svelte-i18n";
  import { browser } from "$app/environment";
  import { fetchProducts, fetchProductsFromCollection } from "$lib/saleor/products";
  import toast from "svelte-french-toast";

  export let data;
  const {
    newArrivals,
    newArrivalsPageInfo,
    topSelling,
    topSellingPageInfo,
    categories,
    winterCollection,
    winterCollectionPageInfo,
    summerPicks,
    summerPicksPageInfo,
    featuredProducts,
    featuredProductsPageInfo,
    collectionTree,
    locale,
  } = data;
  user.set(data.user);

  let currentNewArrivals = newArrivals;
  let currentTopSelling = topSelling;
  let currentWinterCollection = winterCollection;
  let currentSummerPicks = summerPicks;
  let currentFeaturedProducts = featuredProducts;

  let currentNewArrivalsPageInfo = newArrivalsPageInfo;
  let currentTopSellingPageInfo = topSellingPageInfo;
  let currentWinterCollectionPageInfo = winterCollectionPageInfo;
  let currentSummerPicksPageInfo = summerPicksPageInfo;
  let currentFeaturedProductsPageInfo = featuredProductsPageInfo;

  $: if (browser && i18nLocale !== locale) {
    const languageCode = $i18nLocale.toUpperCase();

    fetchProducts(10, languageCode)
      .then((res) => {
        currentNewArrivals = res.product;
        currentNewArrivalsPageInfo = res.pageInfo;
      })
      .catch((err) => {
        console.error("❌ Failed to fetch translated new arrivals:", err);
        toast.error("Failed to load translated new arrivals.");
      });

    fetchProducts(10, languageCode)
      .then((res) => {
        currentTopSelling = res.product;
        currentTopSellingPageInfo = res.pageInfo;
      })
      .catch((err) => {
        console.error("❌ Failed to fetch translated top selling:", err);
        toast.error("Failed to load translated top selling.");
      });

    fetchProductsFromCollection("summer-picks", 10, languageCode)
      .then((res) => {
        currentSummerPicks = res.product;
        currentSummerPicksPageInfo = res.pageInfo;
      })
      .catch((err) => {
        console.error("❌ Failed to fetch translated summer picks:", err);
        toast.error("Failed to load translated summer products.");
      });

    fetchProductsFromCollection("featured-products", 10, languageCode)
      .then((res) => {
        currentFeaturedProducts = res.product;
        currentFeaturedProductsPageInfo = res.pageInfo;
      })
      .catch((err) => {
        console.error("❌ Failed to fetch translated featured products:", err);
        toast.error("Failed to load translated featured products.");
      });

    fetchProductsFromCollection("winter-collection", 10, languageCode)
      .then((res) => {
        currentWinterCollection = res.product;
        currentWinterCollectionPageInfo = res.pageInfo;
      })
      .catch((err) => {
        console.error("❌ Failed to fetch translated winter collection:", err);
        toast.error("Failed to load translated winter collection.");
      });
  }
</script>

<svelte:head>
  <title>Resom - Your Online Fashion Store</title>
  <meta name="description" content="Resom - An e-commerce website" />
</svelte:head>

<section>
  <Hero />
  <Category collection={collectionTree} lang={$i18nLocale} />

  {#if currentNewArrivals.length > 0}
    <CommonProduct
      title={$_("new_arrival")}
      initialProducts={currentNewArrivals}
      initialPageInfo={currentNewArrivalsPageInfo}
      expandBy={10}
    />
  {/if}

  {#if currentTopSelling.length > 0}
    <CommonProduct
      title={$_("top_selling")}
      initialProducts={currentTopSelling}
      initialPageInfo={currentTopSellingPageInfo}
      expandBy={10}
    />
  {/if}

  <ByStyle />

  {#if currentSummerPicks.length > 0}
    <CommonProduct
      collectionSlug="summer-picks"
      title={$_("summer_picks")}
      initialProducts={currentSummerPicks}
      initialPageInfo={currentSummerPicksPageInfo}
      expandBy={10}
    />
  {/if}

  <Offer />

  {#if currentFeaturedProducts.length > 0}
    <CommonProduct
      collectionSlug="featured-products"
      title={$_("featured_products")}
      initialProducts={currentFeaturedProducts}
      initialPageInfo={currentFeaturedProductsPageInfo}
      expandBy={10}
    />
  {/if}

  {#if currentWinterCollection.length > 0}
    <CommonProduct
      collectionSlug="winter-collection"
      title={$_("winter_collection")}
      initialProducts={currentWinterCollection}
      initialPageInfo={currentWinterCollectionPageInfo}
      expandBy={10}
    />
  {/if}
</section>
