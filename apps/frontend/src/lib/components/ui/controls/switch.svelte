<script lang="ts">
  export let onChange: Function = () => {};
  export let controls: Array<string> = [];
  export let active = 0;

  $: onChange(active);
</script>

<div class="w-60">
  <div
    class="flex mx-2 mt-2 rounded-md relative tabs items-center justify-center"
  >
    {#each controls as control, index}
      <button
        class:active={active === index}
        class:text-profesnisit_blue={active === index}
        on:click={() => {
          active = index;
        }}
        class="tabs__item"
      >
        {control}
      </button>
    {/each}

    <span class="tabs__animate" class:full-scale={controls.length === 1} />
  </div>
</div>

<style lang="scss">
  .full-scale {
    transform: translateX(0) scaleX(1) !important;
  }
  button {
    @apply relative z-10 py-1 my-2 text-center rounded-md text-sm cursor-pointer select-none;
    @apply font-medium;
  }
  .tabs__animate {
    @apply absolute -bottom-4 h-0.5 transition-transform  duration-300;
    @apply bg-profesnisit_blue rounded-md;
    width: calc(70%);
    transform-origin: 0 0;
    transition: transform 0.25s;
  }
  .tabs .tabs__item {
    &:nth-child(2) {
      @apply ml-6;
    }
    &:focus {
      @apply outline-none;
    }
    &:first-child.active ~ .tabs__animate {
      transform: translateX(-10%) scaleX(0.5);
    }
    &:nth-child(2).active ~ .tabs__animate {
      transform: translateX(40%) scaleX(0.5);
    }
  }
</style>
