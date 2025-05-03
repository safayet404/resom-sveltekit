<script>
	import Header from "./Header.svelte";
	import "../app.css";
	import Navbar from "../components/navbar/Navbar.svelte";
	import "@splidejs/splide/dist/css/splide.min.css";
	import Footer from "../components/footer/Footer.svelte";
	let { children } = $props();
	import Icon from "@iconify/svelte";
	import { initAuth } from "../stores/auth";
	import { onMount } from "svelte";

	onMount(() => {
		initAuth();
	});
</script>

<div class="app">
	<Navbar />

	<main class=" mt-[30%] sm:mt-[15%] md:mt-[10%] lg:mt-[5%]">
		{@render children()}
	</main>

	<Footer />
</div>
