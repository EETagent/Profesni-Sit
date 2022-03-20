<script lang="ts">
  import { goto } from "$app/navigation";

  import { deleteSelf } from "$lib/api/api";
  import ButtonDanger from "$lib/components/ui/buttons/spacy/danger.svelte";

  const wipeThatUser = async () => {
    const res = await deleteSelf();
    if (res.status === 200) {
      await goto("/logout");
    }
  };
</script>

<div class="py-10 w-full flex flex-col items-start justify-center">
  <h1 class="font-medium text-2xl">Nastavení</h1>
  <div class="my-4">
    <ButtonDanger text="Smazat účet" onClick={wipeThatUser} />
  </div>
  <span class="font-light text-gray-400"
    >* Zrušením účtu nenávratně přijdete o všechny data. Tato akce je nevratná.
  </span>
</div>

<style>
</style>
