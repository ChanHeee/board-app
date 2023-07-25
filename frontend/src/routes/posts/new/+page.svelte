<script>
  import { enhance } from "$app/forms"
  $: categories = []
  $: console.log(categories)

  export let form

  let title
  let content
  let name = ""
</script>

<div class="flex flex-col max-w-[500px] mx-auto mt-20">
  <p class="title w-full max-w-[500px] mx-auto text-2xl font-semibold">
    Create post
  </p>
  <br />
  <form
    method="post"
    use:enhance={({ cancel, data: formData }) => {
      if (!title || !content) {
        cancel()
      }
      formData.set("categories", categories)
      categories = []
    }}
  >
    <input
      class="w-full mx-auto mb-2 box-border border-[3px] rounded-[3px] border-[rgba(0,0,0,.79)] py-[0.6rem] px-[1rem] focus:border-blue-800 focus:ring-0"
      bind:value={title}
      name="title"
      type="text"
      placeholder="title"
    />
    <textarea
      rows={5}
      class="w-full mx-auto mb-2 box-border border-[3px] rounded-[3px] border-[rgba(0,0,0,.79)] py-[0.6rem] px-[1rem] focus:border-blue-800 focus:ring-0"
      bind:value={content}
      name="content"
      type="text"
      placeholder="content"
    />
    <input
      class="w-full mx-auto box-border border-[3px] rounded-[3px] border-[rgba(0,0,0,.79)] py-[0.6rem] px-[1rem] focus:border-blue-800 focus:ring-0"
      bind:value={name}
      on:keydown={(e) => {
        if (e.key == "Enter" && name != "") {
          e.preventDefault()
          const nameWithoutBlank = name.replace(/^\s+|\s+$/gm, "")
          if (!categories.includes(nameWithoutBlank)) {
            categories = [...categories, nameWithoutBlank]
            name = ""
          }
        }
      }}
      on:blur={() => {
        if (!categories.includes(name) && name != "") {
          const nameWithoutBlank = name.replace(/^\s+|\s+$/gm, "")
          categories = [...categories, nameWithoutBlank]
          name = ""
        }
      }}
      type="text"
      placeholder="category"
    />
    <div class="mt-4 flex flex-wrap gap-2 justify-center max-w-[500px]">
      {#each categories as category}
        <div
          class="flex max-h-[28px] whitespace-nowrap truncate items-center text-sm bg-zinc-400 px-3 py-[3px] gap-x-1"
        >
          <div
            on:click={(e) => {
              categories = categories.filter(
                (item) => item != e.target.parentNode.parentNode.innerText
              )
            }}
            on:keydown={undefined}
            on:keyup={undefined}
            on:keypress={undefined}
          >
            <svg
              fill="#ffffff"
              width="14px"
              viewBox="-28 0 512 512"
              class="cursor-pointer"
            >
              <path
                d="M64 388L196 256 64 124 96 92 228 224 360 92 392 124 260 256 392 388 360 420 228 288 96 420 64 388Z"
                on:click={(e) => {
                  categories = categories.filter(
                    (item) =>
                      item !=
                      e.target.parentNode.parentNode.parentNode.innerText
                  )
                }}
                on:keydown={undefined}
                on:keyup={undefined}
                on:keypress={undefined}
              />
            </svg>
          </div>
          <span class="cursor-default mb-[2px] text-white">{category}</span>
        </div>
      {/each}
    </div>
    <div class="mt-6 submit flex items-start">
      {#if form?.success == false}
        <p class={"mr-auto px-[1rem] py-[0.3rem] bg-red-500 text-white"}>
          Fail to create new post
        </p>
      {/if}

      <button
        class="font-light ml-auto pl-[3rem] pr-[0.5rem] py-[0.3rem] bg-black text-white w-fit h-fit"
      >
        Submit
      </button>
    </div>
  </form>
</div>
