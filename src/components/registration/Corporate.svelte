<script>
    import countries from "world-countries";
    import { gql, request } from "graphql-request";
    import { saleorApiUrl } from "$lib/saleor/auth";
    import toast from "svelte-french-toast";
    import { goto } from "$app/navigation";
    import { PUBLIC_REDIRECT_URL } from "$env/static/public";

    let fullName = "";
    let cnpj = "";
    let stateRegistration = "";
    let responsibleName = "";
    let email = "";
    let password = "";
    let phoneNumber = "";

    let postalCode = "";
    let state = "";
    let city = "";
    let neighborhood = "";
    let street = "";
    let number = "";
    let complement = "";
    let apartment = "";
    let block = "";

    const requiredErrors = {
        fullName: false,
        cnpj: false,
        stateRegistration: false,
        email:false,
        password: false,
        phoneNumber: false,
        postalCode: false,
        state: false,
        city: false,
        neighborhood: false,
        street: false,
        number: false,
        complement: false,
        apartment: false,
        block: false,
        responsibleName: false,
    };

    const resetRequiredErrors = () => {
        for (const key in requiredErrors) {
            requiredErrors[key] = false;
        }
    };
    const checkRequiredFields = () => {
        let errorFound = false;
        if(!fullName.trim()) {
            requiredErrors.fullName = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!cnpj.trim()) {
            requiredErrors.cnpj = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!stateRegistration.trim()) {
            requiredErrors.stateRegistration = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!email.trim()) {
            requiredErrors.email = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!password.trim()) {
            requiredErrors.password = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!phoneNumber.trim()) {
            requiredErrors.phoneNumber = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!postalCode.trim()) {
            requiredErrors.postalCode = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!state.trim()) {
            requiredErrors.state = true;
           if(!errorFound) {
                errorFound = true;
            }
        }
        if(!city.trim()) {
            requiredErrors.city = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!neighborhood.trim()) {
            requiredErrors.neighborhood = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!street.trim()) {
            requiredErrors.street = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!number.trim()) {
            requiredErrors.number = true;
           if(!errorFound) {
                errorFound = true;
            }
        }
        if(!complement.trim()) {
            requiredErrors.complement = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!apartment.trim()) {
            requiredErrors.apartment = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        if(!block.trim()) {
            requiredErrors.block = true;
           if(!errorFound) {
                errorFound = true;
            }
        }
        if(!responsibleName.trim()) {
            requiredErrors.responsibleName = true;
            if(!errorFound) {
                errorFound = true;
            }
        }
        return errorFound;
    };

    const countryOptions = countries.map((c) => ({
        label: c.name.common,
        value: c.cca2,
        emoji: c.flag,
        callingCode:
            c.idd?.root && c.idd?.suffixes?.length
                ? `${c.idd.root}${c.idd.suffixes[0]}`
                : "",
    }));

    let selectedCountry = countryOptions.find(
        (c) => c.label === "Brazil",
    )?.value;
    let callingCountry = countryOptions.find((c) => c.value === "BR");

    const REGISTER_USER = gql`
        mutation RegisterUser(
            $email: String!
            $password: String!
            $firstName: String!
            $lastName: String!
            $redirectUrl: String!
            $metadata: [MetadataInput!]!
            $channel: String!
        ) {
            accountRegister(
                input: {
                    email: $email
                    password: $password
                    firstName: $firstName
                    lastName: $lastName
                    redirectUrl: $redirectUrl
                    metadata: $metadata
                    channel: $channel
                }
            ) {
                user {
                    id
                    email
                }
                accountErrors {
                    field
                    message
                }
            }
        }
    `;

    async function handleRegister() {

        const hasError = checkRequiredFields();
        if (hasError) {
            toast.error("Please fill all required fields first.");
            return;
        }

        const redirectUrl = `${PUBLIC_REDIRECT_URL}confirm-email`;
        const channel = "channel-pln";

        const metadata = [
            { key: "cnpj", value: cnpj },
            { key: "stateRegistration", value: stateRegistration },
            { key: "responsibleName", value: responsibleName },
            { key: "postalCode", value: postalCode },
            { key: "state", value: state },
            { key: "city", value: city },
            { key: "neighborhood", value: neighborhood },
            { key: "street", value: street },
            { key: "number", value: number },
            { key: "complement", value: complement },
            { key: "apartment", value: apartment },
            { key: "block", value: block },
            {
                key: "phone",
                value: `${callingCountry.callingCode} ${phoneNumber}`,
            },
            { key: "country", value: selectedCountry },
        ];

        try {
            const res = await request(saleorApiUrl, REGISTER_USER, {
                email,
                password,
                firstName: fullName,
                lastName: "Corporate",
                redirectUrl,
                metadata,
                channel,
            });

            if (res.accountRegister.accountErrors.length) {
                toast.error(
                    res.accountRegister.accountErrors
                        .map((e) => e.message)
                        .join(", "),
                );
                return;
            }

            toast.success(
                "Corporate account registered. Please check your email.",
            );
            goto("/");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        }
    }
</script>

<div class="container mx-auto">
    <form on:submit|preventDefault={handleRegister} class="space-y-4 mx-auto">
        <div class="mt-5">
            <p class="text-lg">Corporate Information</p>

            <div class="flex flex-col mt-5">
                <label for="corporate-name" class="text-sm"
                    >Corporate Name<span class="text-red-500">*</span></label
                >
                <input
                    bind:value={fullName}
                    class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                    placeholder="e.g. Joao Silva"
                />
                {#if requiredErrors.fullName}
                    <p class="text-red-500 text-sm mt-1">Corporate name is required.</p>
                {/if}
            </div>

            <div class="flex flex-col mt-5">
                <label for="cnjp" class="text-sm">CNPJ<span class="text-red-500">*</span></label>
                <input
                    bind:value={cnpj}
                    class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                    placeholder="e.g. 123 432 988"
                />
                {#if requiredErrors.cnpj}
                    <p class="text-red-500 text-sm mt-1">CNPJ is required.</p>
                {/if}
            </div>

            <div class="flex flex-col mt-5">
                <label for="state-reg" class="text-sm"
                    >State Registration<span class="text-red-500">*</span></label
                >
                <input
                    bind:value={stateRegistration}
                    class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                    placeholder="e.g. 123 432 988"
                />
                {#if requiredErrors.stateRegistration}
                    <p class="text-red-500 text-sm mt-1">State registration is required.</p>
                {/if}
            </div>
        </div>

        <div class="mt-5">
            <p class="text-lg">Address</p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div class="flex flex-col mt-5 w-full">
                    <label for="country" class="text-sm">Select Country<span class="text-red-500">*</span></label>
                    <select
                        bind:value={selectedCountry}
                        class="bg-[#F0F0F0] rounded-lg p-3 mt-2"
                        disabled
                    >
                        {#each countryOptions as option}
                            <option value={option.value}
                                >{option?.emoji} {option?.label}</option
                            >
                        {/each}
                    </select>
                    {#if requiredErrors.country}
                        <p class="text-red-500 text-sm mt-1">Country is required.</p>
                    {/if}
                </div>

                <div class="flex flex-col mt-5 w-full">
                    <label for="cep" class="text-sm">CEP (Postal Code)<span class="text-red-500">*</span></label>
                    <input
                        bind:value={postalCode}
                        class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                        placeholder="e.g. 12354-990"
                    />
                    {#if requiredErrors.postalCode}
                        <p class="text-red-500 text-sm mt-1">Postal code is required.</p>
                    {/if}
                </div>

                <div class="flex flex-col mt-5 w-full">
                    <label for="state" class="text-sm">State (Estado)<span class="text-red-500">*</span></label>
                    <input
                        bind:value={state}
                        class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                        placeholder="State Name"
                    />
                    {#if requiredErrors.state}
                        <p class="text-red-500 text-sm mt-1">State is required.</p>
                    {/if}
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="flex flex-col mt-5 w-full">
                    <label for="street" class="text-sm"
                        >Street (Logradouro)<span class="text-red-500">*</span></label
                    >
                    <input
                        bind:value={street}
                        class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                        placeholder="e.g. Joao Silva"
                    />
                    {#if requiredErrors.street}
                        <p class="text-red-500 text-sm mt-1">Street is required.</p>
                    {/if}
                </div>

                <div class="flex flex-col mt-5 w-full">
                    <label for="number" class="text-sm">Number (Numero)<span class="text-red-500">*</span></label>
                    <input
                        bind:value={number}
                        class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                        placeholder="e.g. 123"
                    />
                    {#if requiredErrors.number}
                        <p class="text-red-500 text-sm mt-1">Number is required.</p>
                    {/if}
                </div>
            </div>

            <div class="flex flex-wrap justify-between gap-3">
                <div class="flex flex-col mt-5 w-full">
                    <label for="apartment" class="text-sm"
                        >Apartment (Apartamento)<span class="text-red-500">*</span></label
                    >
                    <input
                        bind:value={apartment}
                        class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                        placeholder="e.g. 5A"
                    />
                    {#if requiredErrors.apartment}
                        <p class="text-red-500 text-sm mt-1">Apartment is required.</p>
                    {/if}
                </div>

                <div class="flex flex-col mt-5 w-full">
                    <label for="block" class="text-sm">Block (Quadra)<span class="text-red-500">*</span></label>
                    <input
                        bind:value={block}
                        class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                        placeholder="e.g. Q1"
                    />
                    {#if requiredErrors.block}
                        <p class="text-red-500 text-sm mt-1">Block is required.</p>
                    {/if}
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="flex flex-col mt-5 w-full">
                    <label for="neighborhood" class="text-sm"
                        >Neighborhood (Bairro)<span class="text-red-500">*</span></label
                    >
                    <input
                        bind:value={neighborhood}
                        class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                        placeholder="e.g. Centro"
                    />
                    {#if requiredErrors.neighborhood}
                        <p class="text-red-500 text-sm mt-1">Neighborhood is required.</p>
                    {/if}
                </div>

                <div class="flex flex-col mt-5 w-full">
                    <label for="city" class="text-sm">City (Cidade)<span class="text-red-500">*</span></label>
                    <input
                        bind:value={city}
                        class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                        placeholder="e.g. São Paulo"
                    />
                    {#if requiredErrors.city}
                        <p class="text-red-500 text-sm mt-1">City is required.</p>
                    {/if}
                </div>
            </div>

            <div class="flex flex-col mt-5 w-full">
                <label for="complement" class="text-sm"
                    >Complement (Complemento)<span class="text-red-500">*</span></label
                >
                <input
                    bind:value={complement}
                    class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                    placeholder="Building name or details"
                />
                {#if requiredErrors.complement}
                    <p class="text-red-500 text-sm mt-1">Complement is required.</p>
                {/if}
            </div>
        </div>

        <div class="mt-10">
            <p class="text-lg">Contact Information</p>

            <div class="flex flex-col mt-5">
                <label for="corporate-email" class="text-sm"
                    >Corporate Email Address<span class="text-red-500">*</span></label
                >
                <input
                    bind:value={email}
                    class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                    placeholder="Enter your email"
                    type="email"
                />
                {#if requiredErrors.email}
                    <p class="text-red-500 text-sm mt-1">Email is required.</p>
                {/if}
            </div>

            <div class="flex flex-col mt-5">
                <label for="password" class="text-sm">Password<span class="text-red-500">*</span></label>
                <input
                    bind:value={password}
                    class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                    type="password"
                    placeholder="Password"
                />
                {#if requiredErrors.password}
                    <p class="text-red-500 text-sm mt-1">Password is required.</p>
                {/if}
            </div>

            <div class="w-full mt-5">
                <label for="contact" class="text-sm mb-1 block"
                    >Contact Number<span class="text-red-500">*</span></label
                >
                <div
                    class="flex items-center border rounded-lg overflow-hidden bg-[#F0F0F0]"
                >
                    <select
                        bind:value={callingCountry}
                        class="px-2 py-2 bg-[#F0F0F0] outline-none"
                        disabled
                    >
                        {#each countryOptions as option}
                            <option value={option}
                                >{option.emoji} {option.callingCode}</option
                            >
                        {/each}
                    </select>
                    <input
                        type="tel"
                        bind:value={phoneNumber}
                        class="flex-1 px-4 py-2 bg-[#F0F0F0] outline-none text-sm"
                        placeholder={`e.g. ${callingCountry?.callingCode} 11 91234-5678`}
                    />
                    
                </div>
                {#if requiredErrors.phoneNumber}
                    <p class="text-red-500 text-sm mt-1">Phone number is required.</p>
                {/if}
            </div>

            <div class="flex flex-col mt-5 w-full">
                <label for="responsible" class="text-sm"
                    >Responsible Person Name<span class="text-red-500">*</span></label
                >
                <input
                    bind:value={responsibleName}
                    class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
                    placeholder="e.g. Ana Costa"
                />
                {#if requiredErrors.responsibleName}
                    <p class="text-red-500 text-sm mt-1">Responsible person name is required.</p>
                {/if}
            </div>
        </div>

        <div class="flex gap-5 justify-between mt-10">
            <a
                class="text-black rounded-lg text-center w-full px-4 py-2 border"
                href="/login">Existing User</a
            >
            <button
                class="text-white w-full rounded-lg text-center bg-black px-4 py-2 border border-black"
                type="submit">Continue</button
            >
        </div>
    </form>
</div>