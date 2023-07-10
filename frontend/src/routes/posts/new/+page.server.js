import { redirect } from "@sveltejs/kit"

export const load = async ({ parent }) => {
  const { user } = await parent()

  if (!user) {
    throw redirect(303, "/posts")
  }
}

export const actions = {
  default: async ({ request, locals }) => {
    const data = await request.formData()
    const title = data.get("title")
    const content = data.get("content")
    const categories = data.get("categories").split(",")
    const token = locals.token

    const response = await fetch("http://nginx/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content, categories }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status == 200) {
      const post = (await response.json()).post
      throw redirect(303, `/posts/${post.id}`)
    } else {
      return { success: false }
    }
  },
}
