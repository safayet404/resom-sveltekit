<script>
  import { updateShippingAddress, updateBillingAddress, getCheckoutDetails } from "$lib/api/saleor";
  import { goto } from "$app/navigation";
  import countries from "world-countries";
  import { onMount } from "svelte";

  let address = {
    firstName: "John",
    lastName: "Doe",
    streetAddress1: "Uttara",
    city: "Dhaka",
    postalCode: "1230",
    country: "BD",
    phone: "+8801679175553",
  };

  let checkoutToekn = localStorage.getItem("checkoutToken");
  console.log(checkoutToekn);

  onMount(async () => {
    if (checkoutToekn) {
      const chek = await getCheckoutDetails(checkoutToekn);
    }
  });
  const countryOptions = countries.map((c) => ({
    label: c.name.common,
    value: c.cca2,
    emoji: c.flag,
    callingCode: c.idd?.root && c.idd?.suffixes?.length ? `${c.idd.root}${c.idd.suffixes[0]}` : "",
  }));

  let selectedCountry = address.country;

  // Get selected country info
  let callingCountry = countryOptions.find((c) => c.value === selectedCountry);
  let phoneNumber = "";

  // Sync address.country with selectedCountry
  $: address.country = selectedCountry;

  // Sync callingCountry when country changes
  $: callingCountry = countryOptions.find((c) => c.value === selectedCountry);

  // Update address.phone
  $: address.phone = callingCountry?.callingCode
    ? `+${callingCountry.callingCode} ${phoneNumber}`
    : phoneNumber;

  async function submitAddresses() {
    const token = localStorage.getItem("checkoutToken");
    if (!token) return alert("No checkout token found");

    try {
      let shipRes = await updateShippingAddress(token, address);
      if (shipRes.checkoutShippingAddressUpdate.errors.length) {
        return alert(
          "Shipping address error: " +
            shipRes.checkoutShippingAddressUpdate.errors.map((e) => e.message).join(", "),
        );
      }

      let billRes = await updateBillingAddress(token, address);
      if (billRes.checkoutBillingAddressUpdate.errors.length) {
        return alert(
          "Billing address error: " +
            billRes.checkoutBillingAddressUpdate.errors.map((e) => e.message).join(", "),
        );
      }

      goto("/checkout/shipping");
    } catch (err) {
      alert("Failed to update addresses: " + err.message);
    }
  }
</script>

<div class="mx-auto container p-4">
  <div class="grid grid-cols-3">
    <div class="col-span-1 mt-20">
      <h1>Summary</h1>
    </div>
    <div class="mt-20 col-span-2">
      <h2 class="text-3xl font-bold mb-10">Shipping & Billing Address</h2>

      <div class="flex flex-col mt-5">
        <label for="first-name" class="text-sm">First Name *</label>
        <input
          class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
          placeholder="First Name"
          bind:value={address.firstName}
        />
      </div>

      <div class="flex flex-col mt-5">
        <label for="first-name" class="text-sm">Last Name *</label>
        <input
          class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
          placeholder="Last Name"
          bind:value={address.lastName}
        />
      </div>
      <!-- <div class="flex flex-col mt-5">
            <label for="first-name" class="text-sm">Phone Number *</label>
            <input
                class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
                placeholder="Phone"
                bind:value={address.phone}
            />
        </div> -->

      <div class="w-full mt-5">
        <label for="phone" class="text-sm mb-1 block">Phone Number *</label>
        <div class="flex items-center border rounded-lg overflow-hidden bg-[#F0F0F0]">
          <select class="px-2 py-2 bg-[#F0F0F0] outline-none text-sm" bind:value={callingCountry}>
            {#each countryOptions as option (option.value)}
              <option value={option}>
                {option.emoji}
                {option.callingCode}
              </option>
            {/each}
          </select>
          <input
            type="tel"
            id="phone"
            class="flex-1 px-4 py-2 bg-[#F0F0F0] outline-none text-sm"
            placeholder={`e.g. ${callingCountry?.callingCode} 3212342`}
            bind:value={phoneNumber}
          />
        </div>
        <p class="text-xs text-gray-500 mt-1">
          Full number: {address.phone}
        </p>
      </div>

      <div class="flex flex-col mt-5">
        <label for="first-name" class="text-sm">Street Address *</label>
        <input
          class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
          placeholder="Street Address"
          bind:value={address.streetAddress1}
        />
      </div>
      <div class="flex flex-col mt-5">
        <label for="first-name" class="text-sm">City *</label>
        <input
          class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
          placeholder="City"
          bind:value={address.city}
        />
      </div>
      <div class="flex flex-col mt-5">
        <label for="first-name" class="text-sm">Postal Code *</label>
        <input
          class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
          placeholder="Postal Code"
          bind:value={address.postalCode}
        />
      </div>

      <div class="flex flex-col mt-5 w-full">
        <label for="name" class="text-sm">Select Country*</label>
        <select bind:value={selectedCountry} class="bg-[#F0F0F0] rounded-lg p-3 mt-2">
          {#each countryOptions as option}
            <option value={option.value}>
              {option.emoji}
              {option.label}
            </option>
          {/each}
        </select>

        <!-- Show selected country for debug/display -->
        <p class="mt-2 text-sm text-gray-600">
          Selected Country Code: {selectedCountry}
        </p>
      </div>
      <!-- <div class="flex flex-col mt-5">
            <label for="first-name" class="text-sm">Country *</label>
            <input
                class="bg-[#F0F0F0] rounded-lg p-2 mt-2"
                placeholder="Country (e.g. US, BD)"
                bind:value={address.country}
            />
        </div> -->

      <button
        class="block mx-auto bg-black text-white w-full mt-3 p-2 rounded-md"
        on:click={submitAddresses}>Continue</button
      >
    </div>
  </div>
</div>

<!-- <script>
    import {
        updateShippingAddress,
        updateBillingAddress,
    } from "$lib/api/saleor";
    import { goto } from "$app/navigation";

    const brazilStates = [
        { code: "AC", name: "Acre" },
        { code: "AL", name: "Alagoas" },
        { code: "AP", name: "Amapá" },
        { code: "AM", name: "Amazonas" },
        { code: "BA", name: "Bahia" },
        { code: "CE", name: "Ceará" },
        { code: "DF", name: "Distrito Federal" },
        { code: "ES", name: "Espírito Santo" },
        { code: "GO", name: "Goiás" },
        { code: "MA", name: "Maranhão" },
        { code: "MT", name: "Mato Grosso" },
        { code: "MS", name: "Mato Grosso do Sul" },
        { code: "MG", name: "Minas Gerais" },
        { code: "PA", name: "Pará" },
        { code: "PB", name: "Paraíba" },
        { code: "PR", name: "Paraná" },
        { code: "PE", name: "Pernambuco" },
        { code: "PI", name: "Piauí" },
        { code: "RJ", name: "Rio de Janeiro" },
        { code: "RN", name: "Rio Grande do Norte" },
        { code: "RS", name: "Rio Grande do Sul" },
        { code: "RO", name: "Rondônia" },
        { code: "RR", name: "Roraima" },
        { code: "SC", name: "Santa Catarina" },
        { code: "SP", name: "São Paulo" },
        { code: "SE", name: "Sergipe" },
        { code: "TO", name: "Tocantins" }
    ];

    let address = {
        firstName: "John",
        lastName: "Doe",
        streetAddress1: "São Paulo",
        city: "São Paulo",
        postalCode: "04829-310",
        country: "BR",
        countryArea: "SP",
        phone: "+55 11958414069",
    };

    let phoneNumber = "11958414069";

    // Ensure full international format
    $: address.phone = `+55 ${phoneNumber}`;

    async function submitAddresses() {
        const token = localStorage.getItem("checkoutToken");
        if (!token) return alert("No checkout token found");

        try {
            let shipRes = await updateShippingAddress(token, address);
            if (shipRes.checkoutShippingAddressUpdate.errors.length) {
                return alert(
                    "Shipping address error: " +
                        shipRes.checkoutShippingAddressUpdate.errors
                            .map((e) => e.message)
                            .join(", ")
                );
            }

            let billRes = await updateBillingAddress(token, address);
            if (billRes.checkoutBillingAddressUpdate.errors.length) {
                return alert(
                    "Billing address error: " +
                        billRes.checkoutBillingAddressUpdate.errors
                            .map((e) => e.message)
                            .join(", ")
                );
            }

            goto("/checkout/shipping");
        } catch (err) {
            alert("Failed to update addresses: " + err.message);
        }
    }
</script>

<div class="mx-auto container p-4">
    <h2 class="md:mt-28 text-3xl font-bold mb-10 lg:mt-20">
        Shipping & Billing Address
    </h2>

    <div class="flex flex-col mt-5">
        <label class="text-sm">First Name *</label>
        <input class="bg-[#F0F0F0] rounded-lg p-2 mt-2" placeholder="First Name" bind:value={address.firstName} />
    </div>

    <div class="flex flex-col mt-5">
        <label class="text-sm">Last Name *</label>
        <input class="bg-[#F0F0F0] rounded-lg p-2 mt-2" placeholder="Last Name" bind:value={address.lastName} />
    </div>

    <div class="flex flex-col mt-5">
        <label class="text-sm">Phone Number *</label>
        <div class="flex items-center border rounded-lg overflow-hidden bg-[#F0F0F0]">
            <span class="px-2">+55</span>
            <input
                type="tel"
                class="flex-1 px-4 py-2 bg-[#F0F0F0] outline-none text-sm"
                placeholder="11958414069"
                bind:value={phoneNumber}
            />
        </div>
        <p class="text-xs text-gray-500 mt-1">Full number: {address.phone}</p>
    </div>

    <div class="flex flex-col mt-5">
        <label class="text-sm">Street Address *</label>
        <input class="bg-[#F0F0F0] rounded-lg p-2 mt-2" placeholder="Street Address" bind:value={address.streetAddress1} />
    </div>

    <div class="flex flex-col mt-5">
        <label class="text-sm">City *</label>
        <input class="bg-[#F0F0F0] rounded-lg p-2 mt-2" placeholder="City" bind:value={address.city} />
    </div>

    <div class="flex flex-col mt-5">
        <label class="text-sm">Postal Code *</label>
        <input class="bg-[#F0F0F0] rounded-lg p-2 mt-2" placeholder="Postal Code" bind:value={address.postalCode} />
    </div>

    <div class="flex flex-col mt-5">
        <label class="text-sm">State (UF) *</label>
        <select bind:value={address.countryArea} class="bg-[#F0F0F0] rounded-lg p-3 mt-2">
            {#each brazilStates as state}
                <option value={state.code}>{state.name}</option>
            {/each}
        </select>
    </div>

    <button class="block mx-auto bg-black text-white w-full mt-6 p-2 rounded-md" on:click={submitAddresses}>
        Continue
    </button>
</div>
 -->
