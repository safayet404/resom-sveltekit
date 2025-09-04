<script>
  import { user } from "../../stores/auth";

  import { goto } from "$app/navigation";
  import { blur, fly, scale, slide } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import toast from "svelte-french-toast";
  import { _ } from "svelte-i18n";
  import Resom from "../navbar/Resom.svelte";
  export let isOpen = false;
  export let close = () => {};

  let email = "";
  let password = "";
  let error = "";
  let loading = false;

  $: canLogin = email.trim() && password.trim();

  async function handleLogin() {
    if (!canLogin) return;
    loading = true;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        user.set({ email });
        toast.success("Log in Successfully!");
        close();
        goto("/");
      } else {
        error = result.error || "Invalid credentials";
      }
    } catch (err) {
      error = "Login failed. Please try again.";
    }

    loading = false;
  }
</script>

{#if isOpen}
  <div
    transition:scale
    class="fixed inset-0 backdrop-blur-lg bg-black bg-opacity-50 bg-blur rounded-md flex p-5 justify-center items-center z-50"
  >
    <div class="grid md:grid-cols-1 lg:grid-cols-2 max-w-5xl h-[75vh] rounded-xl overflow-hidden">
      <div class="hidden lg:block">
        <div class="bg-[#E2E1E6] h-full flex flex-col justify-end">
          <img alt="login" class="object-contain" src="/lg-img.png" />
        </div>
      </div>
      <div class="bg-white p-14 w-full relative">
        <button class="absolute top-2 right-3 text-red-500" on:click={close}>✕</button>
        <!-- <h2 class="text-xl font-semibold mb-1">{$_("existing")}</h2> -->
        <div class="mt-10">
          <Resom />
          <p class="text-center text-3xl mt-3 font-medium">Welcome Back</p>
        </div>
        <p class="text-sm text-center text-[#6B7280]">{$_("login_first")}</p>

        <input
          bind:value={email}
          placeholder="Email"
          class="w-full p-3 mb-3 mt-10 border rounded-lg bg-[#F3F3F3] outline-black"
        />
        <input
          type="password"
          bind:value={password}
          placeholder={$_("password")}
          class="w-full p-3 mb-3 mt-3 border rounded-lg outline-black"
        />

        <div class="flex justify-end">
          <a class="text-red-600 mb-5 mt-3" href="/">Forgot Password?</a>
        </div>

        {#if error}
          <p class="text-sm text-red-600 mb-2">{error}</p>
        {/if}

        <button
          on:click={handleLogin}
          disabled={!canLogin}
          class="w-full bg-black text-white p-3 rounded-lg"
        >
          {#if loading}
            <span class="flex justify-center text-white">
              <!-- <Icon icon="codex:loader" /> -->
              Loading...
            </span>
          {:else}
            <span class="flex justify-center text-white">
              {$_("continue")}
            </span>
          {/if}
        </button>

        <!-- <p class="text-xs text-center mt-3 text-gray-400">
          {$_("agreement")}
          <a class="underline" href="/">policy</a>
        </p> -->

        <fieldset class="border-t border-gray-300 my-10 relative">
          <legend
            class="px-4 text-sm text-gray-500 absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white"
          >
            Or continue with
          </legend>
        </fieldset>

        <div class="mx-auto flex">
          <span class="text-center text-sm mx-auto mt-10 text-gray-400"
            >Don't have an account? <a
              on:click={close}
              class="font-medium underline text-black"
              href="/registration">{$_("registration")}</a
            ></span
          >
        </div>
      </div>
    </div>
  </div>
{/if}
