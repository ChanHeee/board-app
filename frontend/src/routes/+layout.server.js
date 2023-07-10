import axios from "axios"

export const load = async ({ cookies, locals }) => {
  const { token } = locals
  let user

  let response = await fetch("http://nginx/api/users/current", {
    headers: { Authorization: token ? `Bearer ${token}` : null },
  })

  if (response.status == 200) {
    user = (await response.json()).user
  }

  return {
    user,
    token,
  }
}
