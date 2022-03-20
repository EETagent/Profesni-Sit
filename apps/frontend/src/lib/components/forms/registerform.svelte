<script lang="ts">
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";

  import { register } from "$lib/api/api";
  import PrimaryButton from "$lib/components/ui/buttons/primary.svelte";

  let email: string, password: string, firstName: string, lastName: string;

  const handleSubmit = async () => {
    const res = await register(email, password, firstName, lastName);
    if (res.ok) {
      $session = { authenticated: true };
      await goto("/home/me");
    }
  };
</script>

<div class="w-full flex flex-col">
  <h1 class="text-3xl text-center">Registrovat se</h1>
  <form
    on:submit|preventDefault={handleSubmit}
    class="bg-white mt-7 p-6 w-full flex flex-col items-center justify-center  rounded-md border border-light-900"
  >
    <label for="firstName">Jméno</label>
    <input
      bind:value={firstName}
      id="firstName"
      type="text"
      placeholder="Jan"
      required
    />

    <label for="lastName">Příjmení</label>
    <input
      bind:value={lastName}
      id="lastName"
      type="text"
      placeholder="Novák"
      required
    />

    <label for="email">E-mail</label>
    <input
      bind:value={email}
      id="email"
      type="text"
      placeholder="Jan.Novak@email.cz"
      required
    />

    <label for="password">Heslo</label>
    <input
      bind:value={password}
      id="password"
      type="password"
      placeholder="****"
      required
    />

    <div class="my-2 w-full flex flex-col items-start justify-start text-left">
      <input class="w-4" type="checkbox" required />
      <span class="underline text-[#1c4877]">Souhlasím s podmínkami GDPR </span>
    </div>

    <div class="w-full mt-3">
      <PrimaryButton text="Registrovat se" />
    </div>
  </form>
  <div
    class="bg-transparent flex items-center justify-center mt-7 py-4 px-8 border rounded-md border-light-900"
  >
    <span
      >Již máte účet? <a sveltekit:prefetch href="/login" class="text-[#1c4877]"
        >Přihlašte se!</a
      ></span
    >
  </div>
</div>

<style lang="scss">
  label {
    @apply mr-auto my-2;
  }
  input {
    @apply py-1 px-4 rounded-sm w-full border border-gray-300 outline-none;
  }
</style>
