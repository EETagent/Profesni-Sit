<script lang="ts">
  let activeTabId = 0;

  export let tabs: string[];

  export let onTabUpdate: Function = () => {};

  $: onTabUpdate(activeTabId);
</script>

<ul class="w-full mt-7 flex flex-wrap border-b border-gray-200">
  {#each tabs as tab, id}
    <li on:click={() => (activeTabId = id)}>
      <span class:selected={activeTabId === id}>{tab}</span>
    </li>
  {/each}
</ul>

<style>
  ul li:hover {
    cursor: pointer;
  }
  ul li span {
    @apply border border-solid text-black inline-block py-3 px-5 text-sm font-medium text-center bg-profesnisit_gray rounded-t-md;
  }
  ul li .selected {
    @apply border-b border-b-white;
    @apply text-profesnisit_blue;
  }
</style>
