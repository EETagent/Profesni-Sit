<script lang="ts">
  export let activated: boolean = false;
</script>

<span on:click on:click={() => (activated = !activated)}
  >{!activated ? "Editovat" : "Zrušit editaci"}
</span>

<style lang="scss">
  span {
    @apply font-medium;
    @apply text-profesnisit_blue;
    &:hover {
      @apply cursor-pointer;
    }
  }
</style>
