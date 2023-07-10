<script>
  import { enhance } from "$app/forms"
  export let count
  export let divClass
  export let like = null
  export let postId

  const UP_COLOR = "#FF4502"
  const DOWN_COLOR = "#7193ff"
  const DEFAULT_COLOR = "#000000"

  let up = DEFAULT_COLOR
  let down = DEFAULT_COLOR
</script>

<div class={"h-fit flex flex-col justify-center items-center " + divClass}>
  {#if like}
    <form
      action="?/delete"
      method="post"
      use:enhance={({ data }) => {
        data.set("postId", postId)
      }}
    >
      <button>
        <svg fill={UP_COLOR} viewBox="0 0 24 24" width="18px">
          <path
            d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"
          />
        </svg>
      </button>
    </form>
  {:else}
    <form
      action="?/upvote"
      method="post"
      use:enhance={({ data }) => {
        data.set("postId", postId)
      }}
    >
      <button>
        <svg
          class="hover:bg-gray-200 hover:rounded-sm p-[1px]"
          fill={up}
          on:mouseover={() => {
            up = UP_COLOR
          }}
          on:mouseout={() => {
            up = DEFAULT_COLOR
          }}
          on:focus={null}
          on:blur={null}
          viewBox="0 0 24 24"
          width="20px"
        >
          <path
            d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"
          />
        </svg>
      </button>
    </form>
  {/if}
  <h1
    class="font-bold text-center"
    class:upColor={like == true}
    class:downColor={like == false}
  >
    <p>{count}</p>
  </h1>
  <!-- {#if like == true}
    <h1 class={`font-bold text-center text-[${UP_COLOR}]`}>
      {count}
    </h1>
  {:else if like == false}
    <h1>
      {count}
    </h1>
  {:else}
    <h1 class={`font-bold text-center text-[${DEFAULT_COLOR}]`}>
      {count}
    </h1>
  {/if} -->

  {#if like == false}
    <form
      action="?/delete"
      method="post"
      use:enhance={({ data }) => {
        data.set("postId", postId)
      }}
    >
      <button>
        <svg
          fill={DOWN_COLOR}
          viewBox="0 0 24 24"
          width="20px"
          transform="rotate(180)"
        >
          <path
            d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"
          />
        </svg>
      </button>
    </form>
  {:else}
    <form
      action="?/downvote"
      method="post"
      use:enhance={({ data }) => {
        data.set("postId", postId)
      }}
    >
      <button>
        <svg
          class="hover:bg-gray-200 hover:rounded-sm p-[1px]"
          fill={down}
          viewBox="0 0 24 24"
          width="20px"
          transform="rotate(180)"
          on:mouseover={() => {
            down = DOWN_COLOR
          }}
          on:mouseout={() => {
            down = DEFAULT_COLOR
          }}
          on:focus={null}
          on:blur={null}
          ><path
            d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"
          />
        </svg>
      </button>
    </form>
  {/if}
</div>

<style>
  .upColor {
    color: #ff4502;
  }
  .downColor {
    color: #7193ff;
  }
</style>
