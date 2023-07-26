<script>
  import ChildComment from "./ChildComment.svelte"

  import VoteForComment from "./VoteForComment.svelte"

  export let baseUrl

  export let comment
  export let divClass = ""
  export let replyToCommentHandler = undefined

  const getChildCommentsHandler = async (commentId, skip) => {
    const response = await fetch(
      `${baseUrl}/api/comments/child/${commentId}?skip=${skip}`
    )
    if (response.status == 200) {
      const { comments: moreComments } = await response.json()
      comment.childComments = [...comment.childComments, ...moreComments]
    }
  }
</script>

<div class={"comment mt-8 " + divClass}>
  <div class="flex flex-col justify-center">
    <p class="text-black font-bold mb-1">
      {comment.user.username}
      <span class="font-normal text-gray-600">
        {comment.text}
      </span>
    </p>
    <div class="flex items-center gap-2 text-zinc-500 mb-1">
      <VoteForComment
        count={comment.point}
        like={comment.like}
        divClass="text-black"
      />
      <p class="text-xl font-thin">|</p>
      <button class="text-sm" on:click={replyToCommentHandler}> Reply </button>
    </div>

    <div class="childComments">
      {#if comment.childComments?.length > 0}
        {#each comment.childComments as child}
          <ChildComment comment={child} divClass="ml-8" />
        {/each}
      {/if}
    </div>
    {#if comment.numChildComments}
      <button
        class={comment.numChildComments == comment.childComments.length
          ? "hidden "
          : "text-sm mr-auto text-zinc-500"}
        on:click={getChildCommentsHandler(
          comment.id,
          comment.childComments.length
        )}
        >View replies ({comment.numChildComments -
          comment.childComments.length})</button
      >
      <button
        class={comment.numChildComments != comment.childComments.length
          ? "hidden"
          : "text-sm mr-auto text-zinc-500 mt-2"}
        on:click={() => {
          comment.childComments = []
        }}>Hide replies</button
      >
    {/if}
  </div>
</div>
