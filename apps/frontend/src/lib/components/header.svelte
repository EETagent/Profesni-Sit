<script lang="ts">
  import { slide } from "svelte/transition";
  import search from "$lib/store/header/search";

  let showMenu: boolean = false;

  export let title: string;
  const hideMenu = () => {
    showMenu = false;
  };

  let searchValue: string;

  $: search.set(searchValue);
</script>

<div
  class="flex flex-col items-center justify-center w-full bg-white border-b border-b-gray-300"
>
  <div class="w-8/10 flex flex-row items-center justify-center py-4">
    <span
      on:click={() => {
        showMenu = !showMenu;
      }}
      class="flex-1 pl-3 border-l border-l-gray-300">{title}</span
    >
    <input
      bind:value={searchValue}
      placeholder="Hledat"
      type="text"
      class="w-1/2 rounded-sm outline-none p-2 bg-[#f7f8f9] border border-gray-400"
    />
    <span class="flex-1" />
  </div>
  {#if showMenu}
    <div
      transition:slide
      class="menu w-9/10 bg-white py-10 flex flex-col md:flex-row justify-between"
    >
      <div class="menu__item border-r border-r-gray-300">
        <span
          ><a
            class:active={title === "Hledat"}
            on:click={hideMenu}
            sveltekit:prefetch
            href="/home/people">Hledat</a
          ></span
        >
        <span
          ><a
            class:active={title === "Já"}
            on:click={hideMenu}
            sveltekit:prefetch
            href="/home/me">Já</a
          ></span
        >
        <span
          ><a
            class:active={title === "Lidé"}
            on:click={hideMenu}
            sveltekit:prefetch
            href="/home/people">Lidé</a
          ></span
        >
        <span class:active={title === "Projekty"}
          ><a on:click={hideMenu} sveltekit:prefetch href="/home/projects"
            >Projekty</a
          ></span
        >
      </div>
      <div class="menu__item">
        <h3 class="text-black">Profil</h3>
        <span><a href="/logout">Odhlásit s</a>e</span>
      </div>
      <div class="menu__item">
        <h3 class="text-black">Další služby</h3>
        <span
          ><a href="https://www.ssps.cz" target="_blank">Domovské stránky</a
          ></span
        >
        <span
          ><a href="https://skripta.ssps.ct" target="_blank">Skripta</a></span
        >
        <span
          ><a href="https://bakalri.ssps.cz" target="_blank">Bakaláři</a></span
        >
        <span
          ><a href="https://moodle.ssps.cz" target="_blank">Virtuální škola</a
          ></span
        >
      </div>
      <div class=" menu__item">
        <h3 class="text-black">Ochrana soukromí</h3>
        <span><a href="/gdpr" target="_blank">Poučení o GDPR</a></span>
      </div>
      <div class="menu__item">
        <h3 class=" text-black w-full ">Ostatní</h3>
        <span>Nahlásit chybu</span>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .menu .menu__item {
    @apply flex flex-col pr-20;
  }
  .menu .menu__item .active {
    @apply font-bold text-profesnisit_blue;
  }
  .menu .menu__item h3 {
    @apply font-bold;
  }
  .menu .menu__item span {
    @apply mt-3 font-light;
    &:hover {
      @apply text-profesnisit_blue;
      @apply underline cursor-pointer;
    }
  }
</style>
