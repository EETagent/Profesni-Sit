<script lang="ts">
  import defaultAvatar from "../../../../assets/default-avatar.png";

  import type UserI from "$lib/types/user";
  import { updateSelf } from "$lib/api/api";

  import Tabs from "$lib/components/ui/controls/tabs.svelte";
  import PrimaryButton from "$lib/components//ui/buttons/primary.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Datepicker from "$lib/components/ui/input/datepicker.svelte";
  import Select from "$lib/components/ui/input/select.svelte";
  import Edit from "$lib/components/ui/buttons/text/edit.svelte";
  import TextButton from "$lib/components/ui/buttons/text/main.svelte";

  export let profile: UserI;
  export let isUser = false;

  const updateData = async () => {
    const res = await updateSelf(profile);
  };

  const getImageUrl = (path: string): string => "http://localhost:3001" + path;

  let currentView: 0 | 1 = 0;

  let aboutInputToggle: boolean = false;
  let dateInputToggle: boolean = false;
  let classInputToggle: boolean = false;
</script>

<div
  class="py-10 w-full flex flex-col items-center md:flex-row md:items-start justify-center"
>
  <div class="flex flex-col w-full md:w-1/4 items-center md:items-start">
    <figure class="w-full pb-6 border-b border-b-gray-400">
      <img
        class="w-full h-full"
        src={profile.imagePath !== "" && profile.imagePath
          ? getImageUrl(profile.imagePath)
          : defaultAvatar}
        alt="A"
      />
    </figure>
    <div class="mt-6 flex flex-col self-start">
      <span class="mb-2">{profile.about ? profile.about : ""}</span>
      <span class="text-gray-400">{profile.email}</span>
      <span class="mt-2 text-gray-400"
        >{profile.birthDay
          ? profile.birthDay
          : "Datum narození neuvedeno"}</span
      >
      <span class="mt-2 text-gray-400"
        >{profile.registeredAt ? profile.registeredAt : ""}</span
      >
    </div>
  </div>
  <div
    class="md:ml-20 flex flex-col w-full items-center md:items-start md:w-3/4"
  >
    <div class="flex flex-col">
      <h1 class="font-bold text-2xl">{profile.firstName} {profile.lastName}</h1>
      <h3 class="font-normal my-3">
        {profile.class ? profile.class : "Třída neuvedena"}
      </h3>
      <div class="flex flex-row items-center justify-start">
        <span class="text-gray-300">Poslat zprávu</span>
        <div class="mx-3 w-35">
          <PrimaryButton text="V kontaktu" />
        </div>
        <span class="font-medium text-profesnisit_blue">Nahlásit uživatele</span
        >
      </div>
    </div>
    <Tabs
      tabs={isUser ? ["Profil", "Informace"] : ["Profil"]}
      onTabUpdate={(id) => {
        currentView = id;
      }}
    />
    {#if currentView === 0}
      {#if isUser}
        <div class="ml-auto my-3 w-35">
          <PrimaryButton text="Editovat" />
        </div>
      {/if}
      <span class="text-gray-300 mt-3 mb-1 text-sm"
        >Vytvořeno 15. 9. 2020 | Upraveno 1. 12. 2020
      </span>
      <div class="bg-white p-6 border border-gray-200 rounded-sm">
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam neque.
          Duis condimentum augue id magna semper rutrum. In dapibus augue non
          sapien. Vivamus luctus egestas leo. Donec ipsum massa, ullamcorper in,
          auctor et, scelerisque sed, est. Praesent vitae arcu tempor neque
          lacinia pretium. Nullam sapien sem, ornare ac, nonummy non, lobortis a
          enim. Nunc tincidunt ante vitae massa. Quis autem vel eum iure
          reprehenderit qui in ea voluptate velit esse quam nihil molestiae
          consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
          pariatur? Pellentesque arcu. Nulla pulvinar eleifend sem. Quis autem
          vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
          molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
          nulla pariatur? Etiam bibendum elit eget erat. Fusce consectetuer
          risus a nunc. Sed ut perspiciatis unde omnis iste natus error sit
          voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
          ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt explicabo. Donec iaculis gravida nulla. Nulla turpis magna,
          cursus sit amet, suscipit a, interdum id, felis. Nullam sapien sem,
          ornare ac, nonummy non, lobortis a enim. Aliquam ante.
        </p>

        <p>
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Donec vitae arcu. Phasellus enim erat, vestibulum vel, aliquam a,
          posuere eu, velit. In enim a arcu imperdiet malesuada. Pellentesque
          ipsum. In laoreet, magna id viverra tincidunt, sem odio bibendum
          justo, vel imperdiet sapien wisi sed libero. Mauris elementum mauris
          vitae tortor. Etiam neque. Aliquam erat volutpat. Mauris dictum
          facilisis augue. Mauris suscipit, ligula sit amet pharetra semper,
          nibh ante cursus purus, vel sagittis velit mauris vel metus. Sed vel
          lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem.
          Praesent id justo in neque elementum ultrices. Nullam justo enim,
          consectetuer nec, ullamcorper ac, vestibulum in, elit. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum. In laoreet, magna id viverra tincidunt,
          sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Integer
          lacinia. Nam quis nulla.
        </p>

        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Proin mattis lacinia justo. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam libero tempore, cum soluta nobis est eligendi optio cumque
          nihil impedit quo minus id quod maxime placeat facere possimus, omnis
          voluptas assumenda est, omnis dolor repellendus. Mauris metus. Aliquam
          erat volutpat. Nullam rhoncus aliquam metus. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          hymenaeos. Integer vulputate sem a nibh rutrum consequat. Fusce tellus
          odio, dapibus id fermentum quis, suscipit id erat. Nullam justo enim,
          consectetuer nec, ullamcorper ac, vestibulum in, elit. Donec ipsum
          massa, ullamcorper in, auctor et, scelerisque sed, est. Proin pede
          metus, vulputate nec, fermentum fringilla, vehicula vitae, justo.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos hymenaeos. Praesent dapibus. Nullam sapien sem, ornare
          ac, nonummy non, lobortis a enim. Curabitur ligula sapien, pulvinar a
          vestibulum quis, facilisis vel sapien. Nam quis nulla. In enim a arcu
          imperdiet malesuada. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos hymenaeos.
        </p>
      </div>
    {:else if currentView === 1}
      <div class="information w-full">
        <div class="information__description">
          <label for="about">O mně</label>
          <Edit bind:activated={aboutInputToggle} />
        </div>
        <Input
          bind:value={profile.about}
          disabled={!aboutInputToggle}
          id="about"
          placeholder="Napište něco o sobě"
        />
        {#if aboutInputToggle}
          <div class="my-2 flex items-end justify-end">
            <TextButton
              text="Uložit"
              on:click={() => {
                updateData();
                aboutInputToggle = false;
              }}
            />
          </div>
        {/if}
        <div class="information__description">
          <label for="birthDate">Datum narození</label>
          <Edit bind:activated={dateInputToggle} />
        </div>
        <Datepicker
          bind:datepickerValue={profile.birthDay}
          disabled={!dateInputToggle}
          id="birthDate"
          placeholder="Vyberte datum narození"
        />
        {#if dateInputToggle}
          <div class="my-2 flex items-end justify-end">
            <TextButton
              text="Uložit"
              on:click={() => {
                updateData();
                dateInputToggle = false;
              }}
            />
          </div>
        {/if}
        <div class="information__description">
          <label for="class">Třída</label>
          <Edit bind:activated={classInputToggle} />
        </div>
        <Select
          bind:value={profile.class}
          options={["k", "g", "b", "a", "c", "l"]
            .flatMap((c) =>
              ["1", "2", "3", "4"].map((y) => y + c.toUpperCase())
            )
            .sort()}
          disabled={!classInputToggle}
          id="class"
          placeholder="Vyberte třídu"
        />
        {#if classInputToggle}
          <div class="my-2 flex items-end justify-end">
            <TextButton
              text="Uložit"
              on:click={() => {
                updateData();
                classInputToggle = false;
              }}
            />
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<!-- <ul class="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
  <li class="mr-2">
    <a
      href="#"
      aria-current="page"
      class="inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
      >Profile</a
    >
  </li>
  <li class="mr-2">
    <a
      href="#"
      class="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
      >Dashboard</a
    >
  </li>
</ul> -->
<style lang="scss">
  .information {
    @apply mt-2;
  }
  .information .information__description {
    @apply my-3;
    @apply w-full flex flex-row;
    @apply items-center justify-between;
  }
</style>
