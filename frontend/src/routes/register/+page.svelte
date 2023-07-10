<script>
  import { enhance } from "$app/forms"

  export let form
  let email = ""
  let username = ""
  let password = ""
</script>

<div class="login flex flex-col max-w-[500px] mx-auto mt-20">
  <div class="flex items-center">
    <p class="box title w-fit text-2xl font-semibold">Sign up</p>
    {#if form?.success == false}
      <p
        class=" ml-auto max-h-[32px] px-[1rem] py-[0.3rem] bg-red-500 text-white"
      >
        Incorrect.
      </p>
    {/if}
  </div>
  <br />
  <form method="post" use:enhance>
    <input
      name="email"
      bind:value={email}
      class="w-full mx-auto mb-2 box-border border-[3px] rounded-[3px] border-[rgba(0,0,0,.79)] py-[0.6rem] px-[1rem] focus:border-blue-800 focus:ring-0"
      type="text"
      placeholder="email"
    />
    <input
      name="username"
      bind:value={username}
      class="w-full mx-auto mb-2 box-border border-[3px] rounded-[3px] border-[rgba(0,0,0,.79)] py-[0.6rem] px-[1rem] focus:border-blue-800 focus:ring-0"
      type="text"
      placeholder="username"
    />
    <input
      name="password"
      bind:value={password}
      class="w-full mx-auto mb-8 box-border border-[3px] rounded-[3px] border-[rgba(0,0,0,.79)] py-[0.6rem] px-[1rem] focus:border-blue-800 focus:ring-0"
      type="password"
      placeholder="password"
    />
    <div class="submit flex items-start">
      <div class="message ml-auto">
        <p>already have an account?</p>
        <a
          href="/login"
          class="underline text-[#0000ee] visited:text-[#551a8b] active:text-red-500"
          >Login</a
        >
      </div>

      <button
        class="font-light ml-5 pl-[3rem] pr-[0.5rem] py-[0.5rem] bg-black text-white w-fit h-fit"
      >
        Submit
      </button>
    </div>
  </form>
</div>
