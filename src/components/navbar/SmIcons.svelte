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

<div class="lg:hidden flex justify-end">
    <ul class="flex mt-2 items-center gap-3">
        <li class="relative">
            <a class="cursor-pointer" href="/favorite">
                <span class="material-icons cursor-pointer"> favorite </span></a
            >

            <span
                class="absolute text-[12px] -top-3 -right-2 text-white rounded-2xl p-1 bg-red-800"
            >
                {favoriteLength}
            </span>
        </li>
        <li class="relative">
            <a href="/cart">
                <span class="material-icons cursor-pointer">
                    shopping_bag
                </span></a
            >

            <span
                class="absolute text-[12px] -top-3 -right-2 text-white rounded-2xl p-1 bg-red-800"
            >
                {cartLength}
            </span>
        </li>
        {#if mounted}
            <li class="relative" use:clickOutside={closeDropdown}>
                <button class="text-2xl" on:click={handleProfileClick}>
                    <Icon icon={$user ? "mdi:user" : "mdi:user-outline"} />
                </button>

                {#if isDropdownOpen && $user}
                    <ul
                        transition:slide
                        class="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 p-5 space-y-4"
                    >
                        <li><a href="/profile">👤 Profile</a></li>
                        <li><a href="/orders">📦 My Orders</a></li>
                        <li><a href="/security">🔐 Security</a></li>
                        <li><a href="/payment">💳 Payment</a></li>
                        <li><a href="/affiliate">🎯 Affiliate</a></li>
                        <li><a href="/help">❓ Need Help</a></li>
                        <li class="text-gray-400 cursor-pointer">
                            <button
                                on:click={logout}
                                class="w-full text-left text-red-600 hover:underline"
                            >
                                🔓 Log Out
                            </button>
                        </li>
                    </ul>
                {/if}
            </li>
        {/if}
    </ul>
</div>
<LoginModal isOpen={isLoginOpen} close={() => (isLoginOpen = false)} />
