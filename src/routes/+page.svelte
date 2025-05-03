<script>
	import Counter from "./Counter.svelte";
	import welcome from "$lib/images/svelte-welcome.webp";
	import welcomeFallback from "$lib/images/svelte-welcome.png";
	import Hero from "../components/home/Hero.svelte";
	import Category from "../components/home/Category.svelte";
	import CommonProduct from "../components/home/CommonProduct.svelte";
	import ByStyle from "../components/home/ByStyle.svelte";
	import Affiliate from "../components/home/Affiliate.svelte";
	import { product } from "../data/productData";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Hero />
	<Category />
	<CommonProduct title="New Arrival" {product} />
	<CommonProduct title="Top Selling" {product} />
	<ByStyle />
	<Affiliate />
</section>
