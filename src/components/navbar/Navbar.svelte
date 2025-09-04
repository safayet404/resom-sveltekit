<script>
  import { fly, slide } from "svelte/transition";

  import { onMount } from "svelte";
  import TopHeader from "./TopHeader.svelte";
  import ToggleButton from "./ToggleButton.svelte";
  import MegaMenu from "./MegaMenu.svelte";
  import Resom from "./Resom.svelte";
  import SmIcons from "./SmIcons.svelte";
  import LgIcons from "./LgIcons.svelte";
  import MobileMenu from "./MobileMenu.svelte";
  import MobileSearch from "./MobileSearch.svelte";
  import Icon from "@iconify/svelte";
  import Search from "./Search.svelte";

  let isMenuOpen = false;

  export let data;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  const closeMenu = () => (isMenuOpen = false);
</script>

<div class="sticky top-0 border-b border-[#C9C9C9] left-0 right-0 bg-white z-50">
  <TopHeader />
  <div
    class="navbar px-5 md:px-10 mx-auto grid grid-cols-3 lg:grid-cols-3 items-center justify-between pt-6 lg:pb-2"
  >
    <!-- Mobile Toggle Button -->
    <ToggleButton {isMenuOpen} {toggleMenu} />

    <!-- Search  -->
    <Search />

    <!-- Resom Logo -->
    <Resom />

    <!-- Small Device Icons -->
    <SmIcons />

    <!-- Right side navbar (Desktop) -->
    <LgIcons />
  </div>

  <!-- Mega Menu -->
  <!-- <div class="flex justify-center py-4">
    <MegaMenu categories={data.categories} />
  </div> -->

  <div class="flex justify-center py-4">
    <MegaMenu categories={data?.translateCategories} />
  </div>

  <!-- Mobile Menu -->

  <MobileMenu categories={data.translateCategories} isOpen={isMenuOpen} onClose={closeMenu} />
  <!-- Mobile Searchbar -->

  <MobileSearch />
</div>
