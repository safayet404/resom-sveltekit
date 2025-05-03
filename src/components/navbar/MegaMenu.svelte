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

<div class="hidden lg:flex">
    <ul class="flex space-x-8 text-[#1F2224] text-sm font-semibold uppercase">
        <li><a href="/new"> NEW </a></li>
        <li><a href="/"> MAN </a></li>
        <li class="relative group">
            <button class="uppercase flex gap-2 text-sm text-[#1F2224] px-4">
                Woman

                <span class="material-icons my-auto">keyboard_arrow_down</span>
            </button>

            <!-- Mega Menu -->
            <div
                class="absolute top-full left-0 w-[600px] grid grid-cols-3 gap-6 p-6 bg-white shadow-lg z-50
           opacity-0 invisible group-hover:opacity-100 group-hover:visible
           translate-y-2 group-hover:translate-y-0
           transition-all duration-300 ease-in-out"
            >
                <!-- Column 1 -->
                <div>
                    <h3 class="text-gray-700 font-semibold mb-4">Software</h3>
                    <ul>
                        <li>
                            <a
                                href="/service/web"
                                class="block py-2 hover:underline"
                                >Web Development</a
                            >
                        </li>
                        <li>
                            <a
                                href="/service/design"
                                class="block py-2 hover:underline"
                                >Design UI/UX</a
                            >
                        </li>
                    </ul>
                </div>

                <!-- Column 2 -->
                <div>
                    <h3 class="text-gray-700 font-semibold mb-4">Mobile</h3>
                    <ul>
                        <li>
                            <a
                                href="/service/android"
                                class="block py-2 hover:underline">Android</a
                            >
                        </li>
                        <li>
                            <a
                                href="/service/ios"
                                class="block py-2 hover:underline">iOS</a
                            >
                        </li>
                    </ul>
                </div>

                <!-- Column 3 -->
                <div>
                    <h3 class="text-gray-700 font-semibold mb-4">Cloud</h3>
                    <ul>
                        <li>
                            <a
                                href="/service/aws"
                                class="block py-2 hover:underline">AWS</a
                            >
                        </li>
                        <li>
                            <a
                                href="/service/azure"
                                class="block py-2 hover:underline">Azure</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </li>

        <li class="relative group">
            <span class="cursor-pointer flex gap-2"
                >Kids
                <span class="material-icons my-auto">keyboard_arrow_down</span>
            </span>

            <ul
                class="absolute top-full left-0 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out bg-white shadow-md rounded-md w-48 py-2 z-50"
            >
                <li>
                    <a href="/about" class="block px-4 py-2 hover:bg-gray-100"
                        >About Us</a
                    >
                </li>
                <li>
                    <a href="/team" class="block px-4 py-2 hover:bg-gray-100"
                        >Our Team</a
                    >
                </li>
                <li>
                    <a href="/career" class="block px-4 py-2 hover:bg-gray-100"
                        >Careers</a
                    >
                </li>
            </ul>
        </li>
        <li><a href="/sale"> Sale </a></li>
    </ul>
</div>
