<script lang="ts">
  import OutClick from "../../outclick.svelte";

  let showOptions: boolean = false;
  let selectElement: HTMLElement;

  export let value: string = "";

  export let id: string;
  export let placeholder: string = "";

  export let options: Array<string>;

  export let disabled: boolean = false;
</script>

<svelte:body
  on:keyup={(k) => {
    if (k.key === "Escape") {
      showOptions = false;
    }
  }} />

<div>
  <div class="mt-1 relative">
    <OutClick excludeByDOMNode={[selectElement]} on:outclick={() => showOptions = false}>
      <input
        bind:value
        name={id}
        {id}
        {placeholder}
        {disabled}
        on:click={() => (showOptions = !showOptions)}
        readonly
      />
    </OutClick>
    {#if showOptions}
      <div bind:this={selectElement} class="z-30 absolute mt-5 w-full">
        <div class="-top-3 left-10 absolute w-4 overflow-hidden inline-block">
          <div
            class=" h-3 w-3 bg-white rotate-45 transform origin-bottom-left"
          />
        </div>

        <ul
          class="w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          tabindex="-1"
          role="listbox"
        >
          {#each options as option, index}
            <li
              on:click={() => {
                value = option;
                showOptions = false;
              }}
              class="hover:bg-[#f6f7fa] cursor-pointer select-none py-2 pl-3 pr-9"
              id={id + "-option-" + index}
              role="option"
            >
              <span class="font-normal ml-3 block truncate">{option}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>

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
