export const load = async ({ cookies, locals }) => {
  const { token } = locals
  let user

  let response = await fetch("http://nginx/api/users/current", {
    headers: { Authorization: token ? `Bearer ${token}` : null },
  })

  if (response.status == 200) {
    user = (await response.json()).user
  }

  console.log("\n\n", process.env.BASE_URL, "\n\n")
  return {
    baseUrl: process.env.BASE_URL,
    user,
    token,
  }
}
