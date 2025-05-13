<script>
	import toast, { Toaster } from "svelte-french-toast";
	import Header from "./Header.svelte";
	import Navbar from "../components/navbar/Navbar.svelte";
	import Footer from "../components/footer/Footer.svelte";
	import Loader from "../components/common/Loader.svelte";

	import "@splidejs/splide/dist/css/splide.min.css";
	import "../app.css";

	import Icon from "@iconify/svelte";
	import { user } from "../stores/auth";
	import { hydrated } from "../stores/hydration";
	import { isLoading } from "../stores/loading";
	import { onMount } from "svelte";

	export let data;

	user.set(data.user);

	onMount(async () => {
		if (!data?.user) {
			try {
				const res = await fetch("/api/me");
				if (res.ok) {
					const userData = await res.json();
					user.set(userData);
				}
			} catch (err) {
				console.error("Failed to restore user from client:", err);
			}
		}
	});
</script>

<Toaster />

<div class="app">
	<Navbar {data} />

	<main class="mt-[30%] sm:mt-[15%] md:mt-[10%] lg:mt-[5%]">
		<slot />
		<!-- ✅ renders ssthe child page -->
	</main>

	<Footer />
</div>
