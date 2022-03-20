<script lang="ts">
  export let text: string;
  export let onClick: VoidFunction;

  let twoClicksToDefcon: boolean = false;
</script>

<button
  on:click|trusted={() => {
    if (twoClicksToDefcon) {
      onClick();
    }
    twoClicksToDefcon = !twoClicksToDefcon;
  }}
  class:!bg-red-500={twoClicksToDefcon}
  class:animate-bounce={twoClicksToDefcon}
  >{!twoClicksToDefcon ? text : "Opravdu ?!!"}</button
>

<style lang="scss">
  button {
    @apply rounded-[0.25rem] w-full py-2 px-3 text-white bg-profesnisit_red transition-colors duration-300  border-b-2 border-b-[#aa625e];
    &:hover {
      @apply bg-profesnisit_red_transparent;
    }
  }
</style>
