<script lang="ts">
  export let text: string;
</script>

<span on:click>{text}</span>

<style lang="scss">
  span {
    @apply font-medium;
    @apply text-profesnisit_blue;
    &:hover {
      @apply cursor-pointer;
    }
  }
</style>
