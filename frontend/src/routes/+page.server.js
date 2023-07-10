export const load = async ({ url, locals }) => {
  const { token } = locals

  let page = parseInt(url.searchParams.get("page")) || 1
  if (!page || page < 1) {
    page = 1
  }
  let skip = (page - 1) * 15
  let order = url.searchParams.get("order") || "popular"

  let postsData, categories

  let response = await fetch(
    `http://backend:5000/api/posts?skip=${skip}&order=${order}`,
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
    ...postsData,
    page,
    params: {
      order,
    },
    categories,
  }
}
