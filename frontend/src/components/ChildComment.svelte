<script>
  import VoteForComment from "./VoteForComment.svelte"

  export let comment
  export let divClass = ""
</script>

<div class={"childComment mt-4 " + divClass}>
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
        commentId={comment.id}
      />
    </div>
  </div>
</div>
