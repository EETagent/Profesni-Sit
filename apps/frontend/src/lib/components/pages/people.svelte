<script lang="ts">
  import defaultAvatar from "../../../assets/default-avatar.png";

  export let profiles;

  export let onClick: Function = (profile: string) => {};

  const getImageUrl = (path: string): string => "http://localhost:3001" + path;
</script>

<div class="py-10 flex flex-col">
  <h1 class="font-medium text-2xl mb-10">Lidé</h1>
  {#each profiles as profile}
    <div class="mt-3 flex flex-row h-25 pb-6 border-b border-b-gray-400">
      <figure class="h-full">
        <img
          class="w-full h-full rounded-md"
          alt=""
          src={profile.imagePath !== "" && profile.imagePath
            ? getImageUrl(profile.imagePath)
            : defaultAvatar}
        />
      </figure>
      <div class="ml-3 flex flex-col">
        <h3
          class="font-bold text-gray-700 hover:text-profesnisit_blue hover:cursor-pointer"
        >
          <span on:click={() => onClick(profile.id)}>
            {profile.firstName}
            {profile.lastName}
          </span>
        </h3>
        <span class="text-sm text-gray-400">{profile.email}</span>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
</style>
