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
    import ToggleButton from "./ToggleButton.svelte";
    import MegaMenu from "./MegaMenu.svelte";
    import Resom from "./Resom.svelte";
    import SmIcons from "./SmIcons.svelte";
    import LgIcons from "./LgIcons.svelte";

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

<div
    class=" fixed top-0 border-b border-[#C9C9C9] left-0 right-0 bg-white z-50"
>
    <TopHeader />
    <div
        class="navbar px-4 container mx-auto grid grid-cols-3 lg:grid-cols-3 items-center justify-between py-5"
    >
        <!-- Mobile Toggle Button -->
        <ToggleButton />
        <!-- Mega Menu -->

        <MegaMenu />

        <!-- Resom Logo -->
        <Resom />

        <!-- Small Device Icons -->
        <SmIcons />

        <!-- Right side navbar (Desktop) -->

        <LgIcons />
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
        <div
            transition:fly={{ x: 100, y: 0, duration: 300 }}
            class="lg:hidden fixed top-16 right-4 bg-base-200 w-64 p-4 rounded-lg shadow-lg z-40"
        >
            <ul class="space-y-4 text-left text-[#1F2224]">
                <li><a href="/">Home</a></li>

                <!-- Service (click to expand) -->
                <li>
                    <button
                        class="flex justify-between w-full text-left"
                        on:click={toggleService}
                    >
                        Service
                        <span>{isServiceOpen ? "▲" : "▼"}</span>
                    </button>

                    {#if isServiceOpen}
                        <ul class="pl-4 mt-2 space-y-2 text-sm">
                            <li><a href="/service/web">Web Development</a></li>
                            <li><a href="/service/design">Design UI/UX</a></li>
                            <li><a href="/service/android">Android</a></li>
                            <li><a href="/service/ios">iOS</a></li>
                            <li><a href="/service/aws">AWS</a></li>
                            <li><a href="/service/azure">Azure</a></li>
                        </ul>
                    {/if}
                </li>

                <li><a href="/case">Case Studies</a></li>
                <li>
                    <button
                        class="flex justify-between w-full text-left"
                        on:click={toggleAbout}
                    >
                        Comapny
                        <span>{isAboutOpen ? "▲" : "▼"}</span>
                    </button>

                    {#if isAboutOpen}
                        <ul class="pl-4 mt-2 space-y-2 text-sm">
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/team">Team</a></li>
                            <li><a href="/career">Career</a></li>
                        </ul>
                    {/if}
                </li>

                <li><a href="/resources">Resources</a></li>
            </ul>
        </div>
    {/if}

    <div class="lg:hidden flex container p-3 mx-auto">
        <form
            on:submit={handleSearch}
            class="border rounded-2xl flex items-center w-full"
        >
            <span class="material-icons my-auto p-1">search</span>
            <input
                placeholder="Search Items"
                class="my-auto outline-none flex-grow"
                bind:value={searchQuery}
            />
        </form>
    </div>
</div>
