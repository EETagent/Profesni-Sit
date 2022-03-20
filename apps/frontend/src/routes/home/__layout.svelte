<script script lang="ts">
  import activePage from "$lib/store/header/page";
  import search from "$lib/store/header/search";

  import { getUsers } from "$lib/api/api";
  import type UserI from "$lib/types/user";

  import Header from "$lib/components/header.svelte";

  import People from "./people.svelte";

  let users: Array<UserI>;
  search.subscribe(async (s) => {
    if (s && s != "") {
      const request = await getUsers(true, 50, s);
      if (request.status === 200) {
        users = await request.json();
      }
    }
  });
</script>

<Header title={$activePage} />

<div class="w-9/10 mx-auto">
  {#if $search == undefined || $search == ""}
    <slot />
  {:else if users}
    <People {users} />
  {/if}
</div>

<footer class="w-full border-t border-t-gray-300">
  <div
    class="mx-auto w-9/10 py-6 flex flex-col justify-center md:flex-row md:justify-between items-center"
  >
    <span>{new Date().getFullYear()} Stále mě nenapadl žádný text</span>
    <span>Code & Design by <span class="font-bold">404 SOLUTIONS</span></span>
  </div>
</footer>

<style>
</style>
