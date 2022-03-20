<script context="module">
  export async function load({ session }) {
    if (!session.authenticated) {
      return {
        status: 302,
        redirect: "/login",
      };
    } else {
      await fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: new Headers({
          Authorization: "Basic " + session.token,
          "Content-Type": "application/json",
        }),
      });
    }
    return {};
  }
</script>

<script lang="ts">
  import { session } from "$app/stores";

  import { onMount } from "svelte";

  onMount(() => {
    $session = { authenticated: false };
  });
</script>
