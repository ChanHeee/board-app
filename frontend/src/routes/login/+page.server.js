import { redirect } from "@sveltejs/kit"

export const actions = {
  default: async ({ request, cookies, fetch }) => {
    const data = await request.formData()

    const email = data.get("email")
    const password = data.get("password")

    const response = await fetch("http://nginx/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(response)

    if (response.status == 200) {
      const token = (await response.json()).token
      cookies.set("token", token, {
        httpOnly: true,
        secure: false,
        path: "/",
        maxAge: 60 * 30,
      })
      throw redirect(303, "/posts")
    } else {
      return { success: false }
    }
  },
}
