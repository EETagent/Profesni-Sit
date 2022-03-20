<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ session, params, fetch }) {
    if (!session.authenticated) {
      return {
        status: 302,
        redirect: "/login",
      };
    }

    const res = await fetch(`/api/users/${params.id}`, {
      method: "GET",
      credentials: "include",
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
  import type UserI from "$lib/types/user";

  import Profile from "$lib/components/pages/user/profile.svelte";

  export let user: UserI;
</script>

{#if user}
  <Profile profile={user} isUser={false} />
{/if}

<style lang="scss">
</style>
