<!-- <script>
    import Icon from "@iconify/svelte";
    import Select from "svelte-select";
    import countries from "world-countries";
    import Individual from "../../components/registration/Individual.svelte";
    import Corporate from "../../components/registration/Corporate.svelte";

    const countryOptions = countries.map((c) => ({
        label: c.name.common,
        value: c.cca2,
        emoji: c.flag,
        callingCode:
            c.idd?.root && c.idd?.suffixes?.length
                ? `${c.idd.root}${c.idd.suffixes[0]}`
                : "",
    }));
    let phoneNumber = "";

    console.log("Options:", countryOptions[0]);

    let selectedCountry = countryOptions.find(
        (c) => c.label === "Brazil",
    )?.value;
    let callingCountry = countryOptions.find((c) => c.value === "BR");
    const registrationOption = [
        {
            id: 1,
            name: "individual",
            label: "Individual",
            icon: "material-symbols:person",
        },
        {
            id: 1,
            name: "corporate",
            label: "Corporate",
            icon: "solar:box-outline",
        },
    ];

    let selectType = "individual";
</script>

<section class="container mx-auto p-4">
    <h1 class="text-2xl font-poppins font-semibold uppercase">Register</h1>

    <div class="flex justify-between border p-2 bg-[#EFEFEF] rounded-lg mt-5">
        {#each registrationOption as option}
            <button
                on:click={() => (selectType = option.name)}
                class={`flex gap-2 mx-auto text-center ${selectType === option.name ? "bg-white px-5   py-2 rounded-lg" : " px-3  py-2"} `}
            >
                <span class="my-auto"> <Icon icon={option?.icon} /></span>
                <h1>{option?.label}</h1>
            </button>
        {/each}
    </div>

    {#if selectType === "individual"}
        <Individual />
    {:else if selectType === "corporate"}
        <Corporate />
    {/if}
</section> -->
<script>
    import { register } from "$lib/saleor/auth";
    import { goto } from "$app/navigation";

    let email = "";
    let password = "";
    let confirmPassword = "";
    let error = "";
    let success = "";

    $: canRegister =
        email.trim() && password.trim() && confirmPassword === password;

    async function handleRegister() {
        error = "";
        success = "";

        if (!canRegister) {
            error = "Please fill all fields correctly.";
            return;
        }

        const result = await register(email, password);

        if (result?.data?.user) {
            success = "Account created! Please check your email to confirm.";
            email = password = confirmPassword = "";
            // Optionally redirect after a few seconds:
            // setTimeout(() => goto("/login"), 3000);
        } else {
            error = result?.error?.message || "Registration failed.";
        }
    }
</script>

<form on:submit|preventDefault={handleRegister} class="max-w-md mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Create an Account</h2>

    <input
        type="email"
        placeholder="Email"
        bind:value={email}
        required
        class="w-full mb-3 p-2 border rounded bg-yellow-100"
    />

    <input
        type="password"
        placeholder="Password"
        bind:value={password}
        required
        class="w-full mb-3 p-2 border rounded bg-yellow-100"
    />

    <input
        type="password"
        placeholder="Confirm Password"
        bind:value={confirmPassword}
        required
        class="w-full mb-3 p-2 border rounded"
    />

    {#if error}
        <p class="text-red-500 text-sm mb-2">{error}</p>
    {/if}

    {#if success}
        <p class="text-green-600 text-sm mb-2">{success}</p>
    {/if}

    <button
        type="submit"
        class={`w-full ${canRegister ? "bg-black" : "bg-gray-400"} text-white p-2 rounded`}
        disabled={!canRegister}
    >
        Register
    </button>
</form>
