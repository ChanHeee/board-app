<script>
  import "../app.postcss"

  export let data

  $: user = data.user
</script>

<header class="flex justify-center my-10 gap-20">
  {#if user}
    <a href="/posts">Home</a>
    <a href="/posts/new">New post</a>
    <a href="/register">logout</a>
    <!-- <button>Logout</button> -->
  {:else}
    <a href="/posts">Home</a>
    <a href="/login">Sign in</a>
    <a href="/register">Sign up</a>
  {/if}
</header>

<div class="container w-[53%] mx-auto">
  <slot />
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap");
  * {
    font-family: "Roboto Mono", monospace;
  }
</style>
