<script>
    import Icon from "@iconify/svelte";
    import { user } from "../../stores/user";
    import { clickOutside } from "$lib/actions/clickOutside.js";
    import { onMount, createEventDispatcher } from "svelte";

    let mounted = false;
    let resolved = false;
    let isDropdownOpen = false;
    const dispatch = createEventDispatcher();

    onMount(() => {
        mounted = true;

        // Check if user store has been initialized
        const unsubscribe = user.subscribe((value) => {
            if (value !== undefined) {
                resolved = true;
                unsubscribe();
            }
        });
    });

    function handleProfileClick() {
        if ($user) {
            isDropdownOpen = !isDropdownOpen;
        } else {
            dispatch("loginrequest");
        }
    }

    function closeDropdown() {
        isDropdownOpen = false;
    }
</script>

{#if mounted && resolved}
    <li class="relative" use:clickOutside={closeDropdown}>
        <button class="text-2xl" on:click={handleProfileClick}>
            <Icon icon={$user ? "mdi:user" : "mdi:user-outline"} />
        </button>

        {#if isDropdownOpen && $user}
            <ul
                class="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 p-3 space-y-2"
            >
                <li><a href="/profile">👤 Profile</a></li>
                <li><a href="/orders">📦 My Orders</a></li>
                <li><a href="/security">🔐 Security</a></li>
                <li><a href="/payment">💳 Payment</a></li>
                <li><a href="/affiliate">🎯 Affiliate</a></li>
                <li><a href="/help">❓ Need Help</a></li>
                <li class="text-gray-400 cursor-not-allowed">🔓 Log Out</li>
            </ul>
        {/if}
    </li>
{/if}
