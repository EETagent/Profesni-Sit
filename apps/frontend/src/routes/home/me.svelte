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

    const res = await fetch("http://localhost:3001/users/me/", {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        Authorization: "Basic " + session.token,
        "Content-Type": "application/json",
      }),
    });

    if (res.ok) {
      return {
        props: {
          user: await res.json(),
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

  export let user: any;

  import activePage from "$lib/store/header/page";

  import Profile from "$lib/components/pages/user/profile.svelte";
  import Settings from "$lib/components/pages/user/settings.svelte";
  import Switch from "$lib/components/ui/controls/switch.svelte";

  //import CurrentUser from "../../store/currentuser";

  onMount(() => {
    activePage.set("Já");
  });

  const switchControls: Array<"Můj profil" | "Nastavení"> = [
    "Můj profil",
    "Nastavení",
  ];
  let localSwitchState: "Můj profil" | "Nastavení" = "Můj profil";
</script>

<div
  class="py-4 w-full flex items-center justify-center border-b border-b-gray-300"
>
  <Switch
    slot="switch"
    controls={switchControls}
    onChange={(e) => (localSwitchState = switchControls[e])}
  />
</div>

{#if localSwitchState === "Můj profil"}
  {#if user}
    <Profile isUser={true} profile={user} />
  {/if}
{:else if localSwitchState === "Nastavení"}
  <Settings />
{/if}

<style>
</style>
