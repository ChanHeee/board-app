<script>
  import PopularCategory from "../components/PopularCategory.svelte"
  import PostList from "../components/PostList.svelte"
  import PostPagination from "../components/PostPagination.svelte"
  import PostTab from "../components/PostTab.svelte"

  export let data
  $: order = data.params.order || "popular"
  $: page = data.page
  $: total = data.total
</script>

<div class="flex justify-around">
  <div class="w-7/12">
    <PostTab {order} />
    <PostList posts={data.posts} />
    <div class="flex justify-center gap-3 mb-10">
      <PostPagination {page} {total} />
    </div>
  </div>
  <div class="w-3/12 sticky top-10 h-fit">
    <PopularCategory categories={data?.categories} />
  </div>
</div>
