<script>
	import toast, { Toaster } from "svelte-french-toast";
	import Header from "./Header.svelte";
	import "../app.css";
	import Navbar from "../components/navbar/Navbar.svelte";
	import "@splidejs/splide/dist/css/splide.min.css";
	import Footer from "../components/footer/Footer.svelte";

	import Icon from "@iconify/svelte";
	import { user } from "../stores/auth";
	import { onMount } from "svelte";
	import { isLoading } from "../stores/loading";
	import Loader from "../components/common/Loader.svelte";
	import { hydrated } from "../stores/hydration";

	let props = $props();
	let data = props.data;
	let children = props.children;

	user.set(data.user);

	onMount(() => {
		hydrated.set(true);
	});
</script>

<svelte:head>
	<script
		async
		src="https://www.googletagmanager.com/gtag/js?id=G-Y9F91R6TJL"
	></script>

	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag("js", new Date());

		gtag("config", "G-Y9F91R6TJL");
	</script>
</svelte:head>

<Toaster />

<div class="app">
	<Navbar {data} />
	<main class="mt-[30%] sm:mt-[15%] md:mt-[10%] lg:mt-[5%]">
		{@render children()}
	</main>

	<Footer />
</div>
