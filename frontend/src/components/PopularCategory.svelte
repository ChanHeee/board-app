<script>
  export let categories
</script>

<div class="invisible min-[1200px]:visible temp mt-12 sticky top-25">
  <h2 class="font-semilight p-2 mb-2">Popular Categories</h2>
  {#if categories}
    {#each categories as category}
      <div class="flex items-center mb-2">
        <a
          href={"/posts/category/" + category.name}
          data-sveltekit-preload-data="tap"
        >
          <span
            class=" mr-2 text-xs text-slate-700 px-[0.5rem] py-[0.3rem] bg-zinc-100 ml-1 hover:bg-zinc-200"
            >{category.name}
          </span>
        </a>
        <span class="text-xs text-gray-500"> x {category.count}</span>
      </div>
    {/each}
  {/if}
</div>
