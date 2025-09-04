<script>
    import { getProfile } from "$lib/saleor/auth.js";

    export let data;
    const profile = data.profile.user;

    console.log("profile data", profile);

    const metadata = profile.metadata;
</script>

<div class="bg-white p-4 mx-auto space-y-3 container rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Personal Information</h2>

    {#if profile && (profile.firstName || profile.lastName)}
        <p>Name: {profile.firstName} {profile.lastName}</p>
    {/if}
    {#if metadata && metadata?.cpf}
        <p>CPF: {metadata?.cpf}</p>
    {/if}
    {#if metadata && metadata?.phone}
        <p>Phone : {metadata?.phone}</p>
    {/if}

    <hr class="my-6" />

    <h3 class="text-lg font-semibold mb-2">Address</h3>

    {#if metadata.apartment}
        <p>
            {metadata.apartment} , {metadata.block}, {metadata.street}, {metadata.state}
            - {metadata.country}
        </p>
    {/if}
</div>
