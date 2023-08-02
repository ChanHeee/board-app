<script>
  import { enhance } from "$app/forms"
  import Vote from "./../../../components/Vote.svelte"
  import plusCircle from "svelte-awesome/icons/plusCircle"
  import { Icon } from "svelte-awesome"
  import Comment from "../../../components/Comment.svelte"

  export let data
  export let form
  $: post = data.post
  $: comments = data.comments
  $: token = data.token

  let text
  let commentId
</script>

<div class="flex flex-col justify-top mx-auto w-3/4 mt-[4rem]">
  <div class="post">
    <div class="flex items-center mb-3">
      <Vote
        count={post.point}
        divClass="mr-5 text-lg"
        like={post.like}
        postId={post.id}
      />
      <h1 class="text-3xl font-bold">
        "{post.title}"
      </h1>
    </div>
    <div class="flex gap-3 font-light mb-7">
      <div class="flex whitespace-nowrap">
        <p>by</p>
        <a href={"/posts/user/" + post.user.username}>
          <button class="ml-2 underline">
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
      <div class="flex flex-wrap gap-x-4 h-fit">
        {#each post.categories as category}
          <a href={"/posts/category/" + category}>
            <span class="whitespace-nowrap text-gray-400 hover:text-black">
              #{category}
            </span>
          </a>
        {/each}
      </div>
    </div>
    <p class="post_content font-semibold mb-7 text-lg">
      {post.content}
    </p>
  </div>

  <div class="comments mb-5 max-h-[23rem] overflow-y-scroll">
    {#if comments}
      {#each comments as comment}
        <Comment
          {comment}
          {token}
          replyToCommentHandler={() => {
            commentId = comment.id
            text = ""
          }}
        />
        {#if comment.id == commentId}
          <form
            method="post"
            action="?/replyToComment"
            use:enhance={({ data: formData, cancel }) => {
              if (!text) {
                cancel()
              } else {
                formData.set("text", text)
                formData.set("commentId", commentId)
                text = ""
                commentId = null
              }
            }}
            class="w-full flex flex-col"
          >
            <textarea
              type="text"
              name="text"
              bind:value={text}
              placeholder="What are your thoughts?"
              class="w-full mt-3 border-[3px] border-black focus:border-blue-800 focus:ring-0 mb-3"
            />
            <div class="flex">
              {#if form?.success == false}
                <p
                  class={"mr-auto px-[1rem] py-[0.3rem] bg-red-500 text-white"}
                >
                  Please <a href="/login" class="underline">login</a> first.
                </p>
              {/if}
              <button
                class="font-light ml-auto pl-[3rem] pr-[0.5rem] py-[0.3rem] bg-black text-white w-fit h-fit"
                on:click={() => {
                  commentId = null
                  text = ""
                  form.success = undefined
                }}
              >
                Cancel
              </button>
              <button
                class={"font-light ml-3 pl-[3rem] pr-[0.5rem] py-[0.3rem] bg-black text-white w-fit h-fit " +
                  (!text ? "cursor-not-allowed bg-neutral-500" : "")}
              >
                Submit
              </button>
            </div>
          </form>
        {/if}
      {/each}
      <div class="flex justify-center">
        <button
          class={data.total > data.comments.length ? "" : "hidden"}
          on:click={async () => {
            const response = await fetch(
              `/api/comments/parent/${post.id}?skip=${data.comments.length}`,
              { headers: { Authorization: token ? `Bearer ${token}` : null } }
            )
            if (response.status == 200) {
              const { comments: moreComments } = await response.json()
              console.log(moreComments)
              data.comments = [...comments, ...moreComments]
            }
          }}
        >
          <Icon data={plusCircle} scale={1.5} />
        </button>
      </div>
    {/if}
  </div>
  {#if !commentId}
    <form
      method="post"
      action="?/replyToPost"
      use:enhance={({ cancel, data: formData }) => {
        if (!text) {
          cancel()
        } else {
          formData.set("text", text)
          text = ""
        }
      }}
      class="w-full flex flex-col"
    >
      <textarea
        type="text"
        name="text"
        bind:value={text}
        placeholder="What are your thoughts?"
        class="border-[3px] border-black focus:border-blue-800 focus:ring-0 mb-5"
      />
      <div class="flex">
        {#if form?.success == false}
          <p class={"mr-auto px-[1rem] py-[0.3rem] bg-red-500 text-white"}>
            Please <a href="/login" class="underline">login</a> first.
          </p>
        {/if}

        <button
          class={"font-light ml-auto pl-[3rem] pr-[0.5rem] py-[0.3rem] bg-black text-white w-fit h-fit " +
            (text ? "" : "cursor-not-allowed bg-neutral-500")}
        >
          Submit
        </button>
      </div>
    </form>
  {/if}
</div>
