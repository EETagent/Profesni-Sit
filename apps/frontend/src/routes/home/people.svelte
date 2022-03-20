<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ session, fetch }) {
    if (!session.authenticated) {
      return {
        status: 302,
        redirect: "/login",
      };
    }

    const res = await fetch("http://localhost:3001/users?compact", {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      return {
        props: {
          users: await res.json(),
        },
      };
    }

    return {
      status: res.status,
    };
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import activePage from "$lib/store/header/page";

  import type UserI from "$lib/types/user";
  export let users: Array<UserI>;

  import { getUser } from "$lib/api/api";

  import Profile from "$lib/components/pages/user/profile.svelte";
  import People from "$lib/components/pages/people.svelte";
  import Switch from "$lib/components/ui/controls/switch.svelte";

  onMount(() => {
    activePage.set("Lidé");
  });

  let user: UserI;
  let userName: string;

  const fetchUser = async (id: string) => {
    const res = await getUser(id);
    if (res.status === 200) {
      user = await res.json();
      userName = `${user.firstName} ${user.lastName}`;
    }
  };

  const selectUser = async (id: string) => {
    if (user) {
      if (user.id !== id) {
        await fetchUser(id);
      }
    } else {
      await fetchUser(id);
    }

    localSwitchState = userName;
    active = 1;
  };

  $: localSwitchControls = !userName ? ["Lidé"] : ["Lidé", userName];

  let active = 0;

  $: localSwitchState = active === 0 ? "Lidé" : userName;
</script>

<div
  class="py-4 w-full flex items-center justify-center border-b border-b-gray-300"
>
  <Switch
    slot="switch"
    controls={localSwitchControls}
    onChange={(a) => (active = a)}
    {active}
  />
</div>

{#if localSwitchState === "Lidé"}
  <People onClick={selectUser} profiles={users} />
{:else if localSwitchState === userName}
  <Profile profile={user} />
{/if}

<style lang="scss">
</style>
