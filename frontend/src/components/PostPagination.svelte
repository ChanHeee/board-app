<script>
  import { Pagination, ChevronLeft, ChevronRight } from "flowbite-svelte"
  import { goto } from "$app/navigation"

  export let category = undefined
  export let username = undefined
  export let order = undefined
  export let total
  export let page = 1

  const toURL = ({ category, username, order, page }) => {
    let url = `/posts`
    if (category) {
      url = url + `/category/${category}`
    } else if (username) {
      url = url + `/user/${username}`
    }

    if (page) {
      if (order) {
        url = url + `?order=${order}&page=${page}`
      } else {
        url = url + `?page=${page}`
      }
    }

    return url
  }
  // const arrayNum = (page) => {
  //   return page % viewPageSize == 0
  //     ? Math.floor(page / viewPageSize)
  //     : Math.floor(page / viewPageSize) + 1
  // }

  // const viewPageSize = 5
  // const pageSize = 15

  // $: startPage = (arrayNum(page) - 1) * 5 + 1

  // $: last = Math.ceil(total / pageSize)
  // $: pagesLen =
  //   startPage / viewPageSize == last / viewPageSize
  //     ? last % viewPageSize
  //     : viewPageSize
  // $: pages = [...Array(pagesLen)].map((_, i) => {
  //   return {
  //     name: startPage + i,
  //     href: toURL({ category, username, order, page: startPage + i }),
  //     active: startPage + i == page,
  //   }
  // })

  const pageSize = 15
  const paginationLen = 5
  $: pages = () => {
    const result = []
    for (var i = 0; i < 5; i++) {
      if (startPage(page) + i > last) {
        break
      }
      result.push({
        name: startPage(page) + i,
        href: toURL({ category, username, order, page: startPage(page) + i }),
        active: startPage(page) + i == page,
      })
    }
    return result
  }

  $: startPage = (page) => {
    if (page % paginationLen == 0) {
      return (Math.floor(page / paginationLen) - 1) * paginationLen + 1
    } else {
      return Math.floor(page / paginationLen) * paginationLen + 1
    }
  }
  $: last = Math.ceil(total / pageSize)

  const previous = () => {
    if (page != 1) {
      goto(toURL({ category, username, order, page: startPage(page) - 1 }))
    }
  }
  const next = () => {
    if (page == last) {
      return
    } else if (startPage(page) == startPage(last)) {
      goto(
        toURL({
          category,
          username,
          order,
          page: page + 1,
        })
      )
    } else {
      goto(
        toURL({
          category,
          username,
          order,
          page: startPage(page) + paginationLen,
        })
      )
    }
  }
</script>

{#if page <= last}
  <Pagination
    pages={pages()}
    on:previous={previous}
    on:next={next}
    icon
    activeClass="text-gray-500 border border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
  >
    <svelte:fragment slot="prev">
      <span class="sr-only">Previous</span>
      <ChevronLeft class="w-5 h-5" />
    </svelte:fragment>
    <svelte:fragment slot="next">
      <span class="sr-only">Next</span>
      <ChevronRight class="w-5 h-5" />
    </svelte:fragment>
  </Pagination>
{/if}
