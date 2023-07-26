export const load = async ({ url, locals, fetch }) => {
  const { token } = locals

  let page = parseInt(url.searchParams.get("page")) || 1
  if (!page || page < 1) {
    page = 1
  }
  let skip = (page - 1) * 15
  let order = url.searchParams.get("order") || "popular"

  let postsData, categories

  let response = await fetch(
    `http://nginx/api/posts?skip=${skip}&order=${order}`,
    {
      headers: { Authorization: token ? `Bearer ${token}` : null },
    }
  )
  if (response.status == 200) {
    postsData = await response.json()
  }

  response = await fetch(`http://nginx/api/categories/popular`)
  if (response.status == 200) {
    categories = (await response.json()).categories
  }

  return {
    ...postsData,
    page,
    params: {
      order,
    },
    categories,
  }
}

export const actions = {
  upvote: async ({ request, locals }) => {
    const token = locals.token
    if (!token) {
      return
    }

    const data = await request.formData()
    const postId = data.get("postId")

    const response = await fetch("http://nginx/api/posts/upvote", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ postId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status == 200) {
      return { success: true, post: (await response.json()).post }
    }
  },
  downvote: async ({ request, locals }) => {
    const token = locals.token
    if (!token) {
      return
    }

    const data = await request.formData()
    const postId = data.get("postId")

    await fetch("http://nginx/api/posts/downvote", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ postId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    return
  },
  delete: async ({ request, locals }) => {
    const token = locals.token
    if (!token) {
      return
    }

    const data = await request.formData()
    const postId = data.get("postId")

    await fetch("http://nginx/api/posts/vote", {
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify({ postId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    return
  },
}
