<script>
  import Icon from "@iconify/svelte";
  import countries from "world-countries";
  import { gql, request } from "graphql-request";
  import { saleorApiUrl } from "$lib/saleor/auth";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";
  import LoginModal from "../auth/LoginModal.svelte";

  let isLoginOpen = false;
  let firstName = "";
  let cpf = "";
  let postalCode = "";
  let state = "";
  let city = "";
  let street = "";
  let number = "";
  let complement = "";
  let apartment = "";
  let block = "";
  let email = "";
  let password = "";
  let phoneNumber = "";
  const requiredErrors = {
    firstName: false,
    cpf: false,
    email: false,
    password: false,
    phoneNumber: false,
    postalCode: false,
    state: false,
    city: false,
    street: false,
    number: false,
    complement: false,
    apartment: false,
    block: false,
  };

  const resetRequiredErrors = () => {
    for (const key in requiredErrors) {
      requiredErrors[key] = false;
    }
  };
  const checkRequiredFields = () => {
    resetRequiredErrors();
    let errorFound = false;

    if (!firstName.trim()) {
      requiredErrors.firstName = true;
      if (!errorFound) {
        errorFound = true;
      }
    }

    if (!cpf.trim()) {
      requiredErrors.cpf = true;
      if (!errorFound) {
        errorFound = true;
      }
    }
    if (!email.trim()) {
      requiredErrors.email = true;
      if (!errorFound) {
        errorFound = true;
      }
    }
    if (!password.trim()) {
      requiredErrors.password = true;
      if (!errorFound) {
        errorFound = true;
      }
    }
    if (!phoneNumber.trim()) {
      requiredErrors.phoneNumber = true;
      if (!errorFound) {
        errorFound = true;
      }
    }
    if (!postalCode.trim()) {
      requiredErrors.postalCode = true;
      if (!errorFound) {
        errorFound = true;
      }
    }
    if (!state.trim()) {
      requiredErrors.state = true;
      if (!errorFound) {
        errorFound = true;
      }
    }
    if (!city.trim()) {
      requiredErrors.city = true;
      if (!errorFound) {
        errorFound = true;
      }
    }

    if (!street.trim()) {
      requiredErrors.street = true;
      if (!errorFound) {
        errorFound = true;
      }
    }
    if (!number.trim()) {
      requiredErrors.number = true;
      if (!errorFound) {
        errorFound = true;
      }
    }
    if (!complement.trim()) {
      requiredErrors.complement = true;
      if (!errorFound) {
        errorFound = true;
      }
    }
    if (!apartment.trim()) {
      requiredErrors.apartment = true;
      if (!errorFound) {
        errorFound = true;
      }
    }
    if (!block.trim()) {
      requiredErrors.block = true;
      if (!errorFound) {
        errorFound = true;
      }
    }
    return errorFound;
  };

  const countryOptions = countries.map((c) => ({
    label: c.name.common,
    value: c.cca2,
    emoji: c.flag,
    callingCode: c.idd?.root && c.idd?.suffixes?.length ? `${c.idd.root}${c.idd.suffixes[0]}` : "",
  }));

  let selectedCountry = "🇧🇷 Brazil";
  let callingCountry = "🇧🇷 +55";

  const REGISTER_USER = gql`
    mutation RegisterUser(
      $email: String!
      $password: String!
      $firstName: String!
      $redirectUrl: String!
      $metadata: [MetadataInput!]!
      $channel: String!
    ) {
      accountRegister(
        input: {
          email: $email
          password: $password
          firstName: $firstName
          redirectUrl: $redirectUrl
          metadata: $metadata
          channel: $channel
        }
      ) {
        user {
          id
          email
          firstName
          lastName
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

    const redirectUrl = `${saleorApiUrl}confirm-email`;
    const channel = "channel-pln";
    const metadata = [
      { key: "cpf", value: cpf },
      { key: "postalCode", value: postalCode },
      { key: "state", value: state },
      { key: "city", value: city },

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
        firstName,
        redirectUrl,
        metadata,
        channel,
      });

      if (res.accountRegister.accountErrors.length) {
        alert("Error: " + res.accountRegister.accountErrors.map((e) => e.message).join(", "));
      } else {
        toast.success("Check Your email");

        goto("/");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  }
</script>

<div class="w-full">
  <form on:submit|preventDefault={handleRegister} class="space-y-4 mx-auto">
    <div class="mt-5">
      <p class="text-lg">Personal Information</p>
      <div class="flex flex-col mt-5">
        <label for="name" class="text-sm">Full Name<span class="text-red-500">*</span></label>
        <input
          bind:value={firstName}
          class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
          placeholder="e.g. Joao"
        />
        {#if requiredErrors.firstName}
          <span class="text-red-500">This field is required</span>
        {/if}
      </div>

      <div class="flex flex-col mt-5">
        <label for="name" class="text-sm">CPF<span class="text-red-500">*</span></label>
        <input
          bind:value={cpf}
          class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
          placeholder="e.g. 123 432 988"
        />
        {#if requiredErrors.cpf}
          <span class="text-red-500">This field is required</span>
        {/if}
      </div>
    </div>

    <div class="mt-5">
      <p class="text-lg">Address</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div class="flex flex-col mt-5 w-full">
          <label for="name" class="text-sm">Select Country<span class="text-red-500">*</span></label
          >
          <input
            bind:value={selectedCountry}
            class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
            placeholder="e.g. 12354-990"
            disabled
          />
          {#if requiredErrors.country}
            <p class="text-red-500 text-sm mt-1">Country is required.</p>
          {/if}
        </div>
        <div class="flex flex-col mt-5 w-full">
          <label for="name" class="text-sm"
            >CEP (Postal Code)<span class="text-red-500">*</span></label
          >
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
          <label for="name" class="text-sm">State (Estado)<span class="text-red-500">*</span></label
          >
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
    </div>

    <div class="mt-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="flex flex-col mt-5 w-full">
          <label for="name" class="text-sm"
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
          <label for="name" class="text-sm"
            >Number (Numero)<span class="text-red-500">*</span></label
          >
          <input
            bind:value={number}
            class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
            placeholder="e.g. 12354-990"
          />
          {#if requiredErrors.number}
            <p class="text-red-500 text-sm mt-1">Number is required.</p>
          {/if}
        </div>
      </div>
    </div>

    <div class="mt-5">
      <div class="flex flex-wrap justify-between gap-3">
        <div class="flex flex-col mt-5 w-full">
          <label for="name" class="text-sm"
            >Apartment (Apartmento)<span class="text-red-500">*</span></label
          >
          <input
            bind:value={apartment}
            class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
            placeholder="e.g. Joao Silva"
          />
          {#if requiredErrors.apartment}
            <p class="text-red-500 text-sm mt-1">Apartment is required.</p>
          {/if}
        </div>
        <div class="flex flex-col mt-5 w-full">
          <label for="name" class="text-sm">Block (Quadra)<span class="text-red-500">*</span></label
          >
          <input
            bind:value={block}
            class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
            placeholder="e.g. 12354-990"
          />
          {#if requiredErrors.block}
            <p class="text-red-500 text-sm mt-1">Block is required.</p>
          {/if}
        </div>
      </div>
    </div>

    <div class="mt-5">
      <div class="flex flex-col mt-5 w-full">
        <label for="name" class="text-sm">City (Cidade)<span class="text-red-500">*</span></label>
        <input
          bind:value={city}
          class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
          placeholder="e.g. 12354-990"
        />
        {#if requiredErrors.city}
          <p class="text-red-500 text-sm mt-1">City is required.</p>
        {/if}
      </div>
    </div>

    <div class="mt-5">
      <div class="flex flex-col mt-5 w-full">
        <label for="name" class="text-sm"
          >Complement (Complemento)<span class="text-red-500">*</span></label
        >
        <input
          bind:value={complement}
          class="bg-[#F0F0F0] rounded-lg px-4 py-2 mt-2"
          placeholder="Apartments,buildings or additional address details"
        />
        {#if requiredErrors.complement}
          <p class="text-red-500 text-sm mt-1">Complement is required.</p>
        {/if}
      </div>
    </div>

    <div class="mt-10">
      <div class="flex flex-col mt-5">
        <label for="name" class="text-sm">E-mail Address<span class="text-red-500">*</span></label>
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
        <label for="name" class="text-sm">Password<span class="text-red-500">*</span></label>
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
        <label for="name" class="text-sm mb-1 block"
          >Contact Number<span class="text-red-500">*</span></label
        >
        <div class="flex items-center border rounded-lg overflow-hidden bg-[#F0F0F0]">
          <input
            bind:value={callingCountry}
            class="px-4 py-2 w-[100px] bg-[#F0F0F0] outline-none"
            disabled
          />

          <input
            type="tel"
            class="flex-1 px-4 py-2 bg-[#F0F0F0] outline-none text-sm"
            placeholder={`e.g. 11 91234-5678`}
            bind:value={phoneNumber}
          />

          {#if requiredErrors.phoneNumber}
            <p class="text-red-500 text-sm mt-1">Phone number is required.</p>
          {/if}
        </div>
      </div>
    </div>

    <div class="flex gap-5 justify-between mt-10">
      <span
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === "Enter" || e.key === " "}
        on:click={(isLoginOpen = true)}
        class="text-black rounded-lg text-center w-full px-4 py-2 border"
      >
        Existing User
      </span>
      <button
        class="text-white w-full rounded-lg text-center bg-black px-4 py-2 border border-black"
        type="submit">Continue</button
      >
    </div>
  </form>
</div>

<LoginModal isOpen={isLoginOpen} close={() => (isLoginOpen = false)} />
