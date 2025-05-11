<script>
    import { fly, slide } from "svelte/transition";
    import LoginModal from "../auth/LoginModal.svelte";
    import { cart } from "../../stores/cart";
    import { favorite } from "../../stores/favorite";
    import Icon from "@iconify/svelte";

    import { clickOutside } from "$lib/actions/clickOutside.js";
    import { browser } from "$app/environment";
    import { onMount, tick } from "svelte";
    import { user, logout } from "../../stores/auth";
    import { goto } from "$app/navigation";

    let isLoginOpen = false;
    let isDropdownOpen = false;

    function closeDropdown() {
        isDropdownOpen = false;
    }

    let searchQuery = "";

    async function handleSearch(e) {
        e.preventDefault();

        if (searchQuery.trim()) {
            await goto(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    }

    $: cartLength = $cart.length;

    $: favoriteLength = $favorite.length;

    let mounted = false;
    onMount(() => {
        mounted = true;
    });
    function handleProfileClick() {
        if ($user) {
            isDropdownOpen = !isDropdownOpen;
        } else {
            isLoginOpen = true;
        }
    }

    async function handleLogout() {
        await logout();
        isDropdownOpen = false;
        await tick();
        goto("/");
        toast.success("Logout Successfully !");
    }
</script>

<div class="lg:hidden flex justify-end">
    <ul class="flex mt-2 items-center gap-3">
        <li class="relative">
            <a
                class="cursor-pointer text-lg sm:text-2xl md:text-3xl"
                href="/favorite"
            >
                <Icon icon="material-symbols-light:favorite" />
            </a>

            <span
                class="absolute text-[12px] -top-3 -right-2 text-white rounded-2xl p-1 bg-red-800"
            >
                {favoriteLength}
            </span>
        </li>
        <li class="relative">
            <a
                href="/cart"
                class="cursor-pointer text-lg sm:text-2xl md:text-3xl"
            >
                <Icon icon="solar:cart-bold" />
            </a>

            <span
                class="absolute text-[12px] -top-3 -right-2 text-white rounded-2xl p-1 bg-red-800"
            >
                {cartLength}
            </span>
        </li>
        {#if mounted}
            <li class="relative" use:clickOutside={closeDropdown}>
                <button
                    class="cursor-pointer text-lg sm:text-2xl md:text-3xl mt-1 md:mt-2"
                    on:click={handleProfileClick}
                >
                    <Icon icon={$user ? "mdi:user" : "mdi:user-outline"} />
                </button>

                {#if isDropdownOpen && $user}
                    <ul
                        transition:slide
                        class="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 p-5 space-y-4"
                    >
                        <li>
                            <a href="/account/profile">👤 Profile</a>
                        </li>
                        <li>
                            <a href="/account/orders">📦 My Orders</a>
                        </li>
                        <li>
                            <a href="/account/security">🔐 Security</a>
                        </li>
                        <li>
                            <a href="/account/payment">💳 Payment</a>
                        </li>
                        <li>
                            <a href="/account/affiliate">🎯 Affiliate</a>
                        </li>
                        <li>
                            <a href="/account/help">❓ Need Help</a>
                        </li>
                        <li class="text-gray-400 cursor-pointer">
                            <button
                                on:click={handleLogout}
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
