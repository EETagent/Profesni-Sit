<script lang="ts">
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";
  
  import { login } from "$lib/api/api";
  import PrimaryButton from "$lib/components/ui/buttons/primary.svelte";

  let email: string;
  let password: string;

  const handleSubmit = async () => {
    const res = await login(email, password);
    if (res.ok) {
      $session = { authenticated: true };
      await goto("/home/me");
    }
  };
</script>

<div class="w-full flex flex-col">
  <h1 class="text-3xl text-center">Přihlásit se</h1>
  <form
    on:submit|preventDefault={handleSubmit}
    class="bg-white mt-7 p-6 w-full flex flex-col items-center justify-center  rounded-md border border-light-900"
  >
    <label class="mr-auto my-2" for="email">E-mail</label>
    <input
      bind:value={email}
      id="email"
      name="email"
      type="text"
      placeholder="E-mail"
      required
    />
    <div class="my-2 w-full flex justify-between">
      <label class="mr-auto" for="password">Heslo</label>

      <span class="ml-auto underline text-[#1c4877]">Zapomenuté heslo?</span>
    </div>

    <input
      bind:value={password}
      id="password"
      name="password"
      type="text"
      placeholder="****"
      required
    />
    <div class="w-full mt-3">
      <PrimaryButton text="Přihlásit se" />
    </div>
  </form>
  <div
    class="bg-transparent flex items-center justify-center mt-7 py-4 px-8 border rounded-md border-light-900"
  >
    <span
      >Ještě nemáte účet? <a
        sveltekit:prefetch
        href="/register"
        class="text-[#1c4877]">Založte si ho!</a
      ></span
    >
  </div>
</div>

<style lang="scss">
  input {
    @apply py-1 px-4 rounded-sm w-full border border-gray-300 outline-none;
  }
</style>
