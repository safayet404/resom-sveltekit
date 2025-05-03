<script>
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    import { fly, slide } from "svelte/transition";
    import LoginModal from "../auth/LoginModal.svelte";
    import { cart } from "../../stores/cart";
    import { favorite } from "../../stores/favorite";
    import Icon from "@iconify/svelte";
    import { user } from "../../stores/user";

    import { clickOutside } from "$lib/actions/clickOutside.js";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import TopHeader from "./TopHeader.svelte";

    let isMenuOpen = false;
    let isLoginOpen = false;
    let isDropdownOpen = false;

    function handleProfileClick() {
        if ($user) {
            isDropdownOpen = !isDropdownOpen;
        } else {
            isLoginOpen = true;
        }
    }

    function closeDropdown() {
        isDropdownOpen = false;
    }

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };

    let isServiceOpen = false;
    const toggleService = () => {
        isServiceOpen = !isServiceOpen;
    };
    let isAboutOpen = false;
    const toggleAbout = () => {
        isAboutOpen = !isAboutOpen;
    };

    const options = {
        type: "loop",
        autoplay: true,
        interval: 2000,

        arrows: false,
        perPage: 1,
    };

    let searchQuery = "";

    function handleSearch(e) {
        e.preventDefault();

        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
        }
    }

    $: cartLength = $cart.length;

    $: favoriteLength = $favorite.length;

    let mounted = false;
    onMount(() => {
        mounted = true;
    });

    function logout() {
        user.set(null); // Clear store
        localStorage.removeItem("user"); // Remove persisted data
        isDropdownOpen = false; // Close dropdown
        window.location.href = "/"; // Optional: redirect to homepage
    }
</script>

<div class="flex justify-start lg:hidden">
    <button
        on:click={toggleMenu}
        class="btn btn-square btn-ghost"
        aria-label="Toggle menu"
    >
        {#if isMenuOpen}
            ✖
        {:else}
            ☰
        {/if}
    </button>
</div>
