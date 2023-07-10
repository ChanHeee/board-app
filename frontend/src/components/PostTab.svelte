<script>
  export let category = undefined
  export let username = undefined
  export let order = undefined

  import { Icon } from "svelte-awesome"
  import user from "svelte-awesome/icons/user"
  import hashtag from "svelte-awesome/icons/hashtag"
  $: selected = order
</script>

<div class="flex gap-2 mb-3 items-center">
  <a href="/posts">
    <button
      class={"text-2xl font-semibold " +
        (selected == "popular" ? "" : "text-zinc-300")}
      on:click={() => (selected = "popular")}
    >
      Popular
    </button>
  </a>
  <h1
    class={"text-2xl font-light " +
      (selected == "popular" ? "" : "text-zinc-300")}
  >
    |
  </h1>
  <a href="/posts?order=newest" on:click={() => (selected = "newest")}>
    <button
      class={"text-2xl font-semibold " +
        (selected == "newest" ? "" : "text-zinc-300")}
    >
      New
    </button>
  </a>
  {#if category}
    <h1 class="text-2xl font-light text-zinc-300">|</h1>
    <button class="text-2xl font-semibold">
      <Icon data={hashtag} scale={1} class="mr-[-0.7rem]" />
      {category}
    </button>
  {/if}
  {#if username}
    <h1 class="text-2xl font-light text-zinc-300">|</h1>
    <button class="text-2xl font-semibold">
      <Icon data={user} scale={1.1} class="mr-[-0.5rem] text-slate-600" />
      {username}
    </button>
  {/if}
</div>
