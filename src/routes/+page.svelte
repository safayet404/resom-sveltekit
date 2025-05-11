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

	export let data;
	const { newArrivals, topSelling } = data;

	const isProd = process.env.NODE_ENV;

	console.log("production console", isProd);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Hero />
	<Category />

	<CommonProduct
		title="New Arrival"
		initialProducts={newArrivals}
		initialLimit={4}
		expandBy={10}
	/>
	<CommonProduct
		title="Top Selling"
		initialProducts={topSelling}
		initialLimit={4}
		expandBy={10}
	/>

	<ByStyle />
	<Affiliate />
</section>
