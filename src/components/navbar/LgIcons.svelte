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
    import toast from "svelte-french-toast";
    import { hydrated } from "../../stores/hydration";

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

<div class="hidden justify-end lg:flex gap-2">
    <div class="grid grid-cols-2 gap-3 justify-between">
        <form
            on:submit={handleSearch}
            class="flex items-center border rounded-2xl px-2 h-10 mt-1"
        >
            <span class="material-icons text-base text-gray-500">search</span>
            <input
                bind:value={searchQuery}
                placeholder="Search Items"
                class="ml-2 text-sm outline-none bg-transparent flex-grow"
            />
        </form>

        <div>
            <ul class="flex mt-2 items-center gap-3">
                <li class="relative">
                    <a
                        href="/favorite"
                        class="cursor-pointer text-lg sm:text-2xl md:text-3xl"
                    >
                        <span class="material-icons">favorite</span>
                    </a>
                    {#if $favorite.length > 0}
                        <span
                            class="absolute -top-4 -right-2 text-white rounded-2xl p-1 bg-red-800"
                        >
                            {$favorite.length}
                        </span>
                    {/if}
                </li>
                <li class="relative">
                    <a
                        href="/cart"
                        class="cursor-pointer text-lg sm:text-2xl md:text-3xl"
                    >
                        <span class="material-icons">shopping_cart</span>
                        <!-- <Icon icon="solar:cart-bold" /> -->
                    </a>
                    {#if $cart.length > 0}
                        <span
                            class="absolute -top-4 -right-2 text-white rounded-2xl p-1 bg-red-800"
                        >
                            {$cart.length}
                        </span>
                    {/if}
                </li>
                <li class="relative" use:clickOutside={closeDropdown}>
                    <span
                        on:keydown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault(); // prevent scrolling on space
                                handleProfileClick();
                            }
                        }}
                        role="button"
                        tabindex="0"
                        aria-label="profile"
                        class="cursor-pointer text-lg sm:text-2xl md:text-3xl mt-1"
                        on:click={handleProfileClick}
                    >
                        {#if $user}
                            <span class="material-icons">how_to_reg</span>
                        {:else}
                            <span class="material-icons">person</span>
                        {/if}
                    </span>

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
                            <li>
                                <button
                                    class="text-red-600"
                                    on:click={handleLogout}>🔓 Logout</button
                                >
                            </li>
                        </ul>
                    {/if}
                </li>
            </ul>
        </div>
    </div>
</div>
<LoginModal isOpen={isLoginOpen} close={() => (isLoginOpen = false)} />
