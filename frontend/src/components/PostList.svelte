<script>
  import { enhance } from "$app/forms"
  import Vote from "./Vote.svelte"

  export let posts

  const upvote = async () => {
    await fetch("http://nginx/api/posts/upvote")
  }

  let text = ""
</script>

<div class="posts pb-5">
  {#if posts.length > 0}
    {#each posts as post}
      <div class="flex items-center">
        <Vote
          count={post.point}
          divClass="mr-3"
          like={post.like}
          postId={post.id}
        />
        <div class="post mb-2 py-3 flex flex-col">
          <a href={"/posts/" + post.id}>
            <p class="truncate text-xl font-medium tracking-wider mb-1">
              "{post.title}"
            </p>
          </a>

          <div class="post-bottom ml-2 flex items-center justify-between">
            <div class="flex gap-3 font-light">
              <div class="flex whitespace-nowrap">
                <p>by</p>
                <a href={"/posts/user/" + post.user.username}>
                  <button class="ml-2 underline font-light">
                    {post.user.username}
                  </button>
                </a>
              </div>
              <p>|</p>
              <p class="flex whitespace-nowrap">
                {post.numComments} comments
              </p>
              {#if post.categories.length > 0}
                <p>|</p>
              {/if}
              <div class="flex flex-wrap overflow-hidden gap-2 h-[24px]">
                {#each post.categories as category}
                  <a href={"/posts/category/" + category}>
                    <span
                      class="whitespace-nowrap text-gray-400 hover:text-black"
                      >#{category}</span
                    >
                  </a>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  {:else}
    <p class="div my-10">No posts found.</p>
  {/if}
</div>
