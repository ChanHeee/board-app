<script>
  import PopularCategory from "../../../../components/PopularCategory.svelte"
  import PostList from "../../../../components/PostList.svelte"
  import PostPagination from "../../../../components/PostPagination.svelte"
  import PostTab from "../../../../components/PostTab.svelte"
  export let data

  $: page = data.page
  $: total = data.total
  $: username = data.username
</script>

<div class="flex justify-around">
  <div class="w-7/12">
    <PostTab {username} />
    <PostList posts={data.posts} />
    <div class="flex justify-center gap-3 mb-10">
      <PostPagination {page} {total} {username} />
    </div>
  </div>
  <div class="w-3/12 sticky top-10 h-fit">
    <PopularCategory categories={data?.categories} />
  </div>
</div>
