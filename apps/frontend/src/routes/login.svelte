<script context="module">
  export async function load({ session }) {
    if (session.authenticated) {
      return {
        status: 302,
        redirect: "/home/me",
      };
    }
    return {};
  }
</script>


<script lang="ts">
  import { fade } from "svelte/transition";

  import Loginform from "$lib/components/forms/loginform.svelte";
</script>

<section class="flex items-center justify-center min-h-screen min-w-screen">
  <div
    in:fade={{ delay: 300 }}
    out:fade={{ delay: 150 }}
    class="w-full mx-4 sm:w-110"
  >
    <Loginform />
  </div>
</section>
