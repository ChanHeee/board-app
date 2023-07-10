import { redirect } from "@sveltejs/kit"

export const load = async ({ params, locals, fetch }) => {
  const { token } = locals
  const id = params.id

  let post, commentData

  let response = await fetch(`http://nginx/api/posts/${id}`, {
    headers: { Authorization: token ? `Bearer ${token}` : null },
  })
  if (response.status == 200) {
    post = (await response.json()).post
  } else {
    throw redirect(303, "/posts")
  }

  response = await fetch(`http://nginx/api/comments/parent/${id}`, {
    headers: { Authorization: token ? `Bearer ${token}` : null },
  })
  if (response.status == 200) {
    commentData = await response.json()
  }

  return {
    post,
    ...commentData,
  }
}

export const actions = {
  replyToPost: async ({ request, locals, params }) => {
    const data = await request.formData()
    const text = data.get("text")
    const postId = params.id
    const token = locals.token

    if (!token) {
      return { success: false }
    }

    const response = await fetch(`http://nginx/api/comments/post/${postId}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ text: text }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.status == 200) {
      return { success: true, comment: (await response.json()).comment }
    } else {
      return { success: false }
    }
  },

  replyToComment: async ({ request, locals }) => {
    const data = await request.formData()
    const text = data.get("text")
    const commentId = data.get("commentId")
    const token = locals.token

    if (!token) {
      return { success: false }
    }

    const response = await fetch(`http://nginx/api/comments/${commentId}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ text: text }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.status == 200) {
      return { success: true, comment: (await response.json()).comment }
    } else {
      return { success: false }
    }
  },

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
