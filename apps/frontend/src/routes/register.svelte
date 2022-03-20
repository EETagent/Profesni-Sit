<script lang="ts">
  import { fade } from "svelte/transition";

  import Registerform from "$lib/components/forms/registerform.svelte";
</script>

<section class="flex items-center justify-center min-h-screen min-w-screen">
  <div
    in:fade={{ delay: 300 }}
    out:fade={{ delay: 150 }}
    class="w-full mx-4 sm:w-110"
  >
    <Registerform />
  </div>
</section>
