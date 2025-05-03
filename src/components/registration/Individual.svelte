<script>
    import Icon from "@iconify/svelte";
    import Select from "svelte-select";
    import countries from "world-countries";

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

<div class="mt-5">
    <p class="text-lg">Personal Information</p>

    <div class="flex flex-col mt-5">
        <label class="text-sm" for="name">Full Name*</label>
        <input
            class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
            placeholder="e.g. Joao Silva"
        />
    </div>
    <div class="flex flex-col mt-5">
        <label class="text-sm" for="name">CPF*</label>
        <input
            class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
            placeholder="e.g. 123 432 988"
        />
    </div>
</div>
<div class="mt-5">
    <p class="text-lg">Address</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div class="flex flex-col mt-5 w-full">
            <label class="text-sm" for="name">Select Country*</label>

            <select
                id="country"
                bind:value={selectedCountry}
                class="bg-[#F0F0F0] rounded-lg p-3 mt-2"
            >
                {#each countryOptions as option}
                    <option value={option.value}>
                        {option?.emoji} {option?.label}</option
                    >
                {/each}
            </select>
        </div>

        <div class="flex flex-col mt-5 w-full">
            <label class="text-sm" for="name">CEP (Postal Code)*</label>
            <input
                class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
                placeholder="e.g. 12354-990"
            />
        </div>

        <div class="flex flex-col mt-5 w-full">
            <label class="text-sm" for="name">State (Estado)*</label>
            <input
                class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
                placeholder="State Name"
            />
        </div>
    </div>
</div>
<div class="mt-5">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="flex flex-col mt-5 w-full">
            <label class="text-sm" for="name">Street (Logradouro)*</label>
            <input
                class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
                placeholder="e.g. Joao Silva"
            />
        </div>

        <div class="flex flex-col mt-5 w-full">
            <label class="text-sm" for="name">Number (Numero)*</label>
            <input
                class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
                placeholder="e.g. 12354-990"
            />
        </div>
    </div>
</div>
<div class="mt-5">
    <div class="flex flex-wrap justify-between gap-3">
        <div class="flex flex-col mt-5 w-full">
            <label class="text-sm" for="name">Apartment (Apartmento)*</label>
            <input
                class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
                placeholder="e.g. Joao Silva"
            />
        </div>

        <div class="flex flex-col mt-5 w-full">
            <label class="text-sm" for="name">Block (Quadra) *</label>
            <input
                class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
                placeholder="e.g. 12354-990"
            />
        </div>
    </div>
</div>
<div class="mt-5">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="flex flex-col mt-5 w-full">
            <label class="text-sm" for="name">Neighborhood (Bairro)*</label>
            <input
                class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
                placeholder="e.g. Joao Silva"
            />
        </div>

        <div class="flex flex-col mt-5 w-full">
            <label class="text-sm" for="name">City (Cidade)*</label>
            <input
                class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
                placeholder="e.g. 12354-990"
            />
        </div>
    </div>
</div>

<div class="mt-5">
    <div class="flex flex-col mt-5 w-full">
        <label class="text-sm" for="name">Complement (Complemento)*</label>
        <input
            class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
            placeholder="Apartments,buildings or additional address details"
        />
    </div>
</div>

<div class="mt-10">
    <div class="flex flex-col mt-5">
        <label class="text-sm" for="name">Email Address*</label>
        <input
            class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
            placeholder="Enter you email"
        />
    </div>

    <div class="w-full mt-5">
        <label class="text-sm mb-1 block" for="phone">Contact Number*</label>

        <div
            class="flex items-center border rounded-lg overflow-hidden bg-[#F0F0F0]"
        >
            <select
                bind:value={callingCountry}
                class="px-2 py-2 bg-[#F0F0F0] outline-none"
            >
                {#each countryOptions as option}
                    <option value={option}>
                        {option.emoji}
                        {option.callingCode}
                    </option>
                {/each}
            </select>

            <input
                type="tel"
                class="flex-1 px-4 py-2 bg-[#F0F0F0] outline-none text-sm"
                placeholder={`e.g. ${callingCountry?.callingCode} 11 91234-5678`}
                bind:value={phoneNumber}
            />
        </div>
    </div>
</div>
<div class="flex gap-5 justify-between mt-10">
    <a
        class="text-black rounded-lg text-center w-full px-4 py-2 border"
        href="/login">Existing User</a
    >
    <a
        class="text-white w-full rounded-lg text-center bg-black px-4 py-2 border border-black"
        href="/">Continue</a
    >
</div>
