<script lang="ts">
  export let value = "";

  export let id: string;
  export let placeholder: string = "";

  export let disabled: boolean = false;
</script>

<input bind:value {id} name={id} type="text" {disabled} {placeholder} />

<style lang="scss">
  input {
    @apply py-2 px-4 rounded-sm w-full border border-gray-300 outline-none;
    @apply font-light;
    &:focus {
      @apply border-profesnisit_blue;
    }
    &:disabled {
      @apply text-gray-400 bg-[#f6f7fa];
    }
  }
</style>
