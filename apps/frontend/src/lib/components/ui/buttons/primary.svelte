<script lang="ts">
  export let text: string;
</script>

<button on:click class="hover:">{text}</button>

<style lang="scss">
  button {
    @apply rounded-md w-full p-3 text-white bg-profesnisit_blue transition-colors duration-300;
    &:hover {
      @apply bg-profesnisit_blue_transparent;
    }
  }
</style>
