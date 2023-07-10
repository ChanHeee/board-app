export const load = async ({ url, params, locals }) => {
  const { token } = locals

  let page = parseInt(url.searchParams.get("page")) || 1
  if (!page || page < 1) {
    page = 1
  }
  let skip = (page - 1) * 15
  const username = params.name

  let postsData, categories

  let response = await fetch(
    `http://backend:5000/api/posts?user=${username}&skip=${skip}`,
    { headers: { Authorization: token ? `Bearer ${token}` : null } }
  )

  if (response.status == 200) {
    postsData = await response.json()
  }

  response = await fetch(`http://backend:5000/api/categories/popular`)
  if (response.status == 200) {
    categories = (await response.json()).categories
  }

  return {
    page,
    ...postsData,
    username,
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

    const response = await fetch("http://backend:5000/api/posts/upvote", {
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

    await fetch("http://backend:5000/api/posts/downvote", {
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

    await fetch("http://backend:5000/api/posts/vote", {
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
