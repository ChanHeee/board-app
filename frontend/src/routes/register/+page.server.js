import { redirect } from "@sveltejs/kit"

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData()
    const email = formData.get("email")
    const username = formData.get("username")
    const password = formData.get("password")

    const response = await fetch("http://nginx/api/users/", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status == 200) {
      throw redirect(303, "/login")
    } else {
      console.log(response)
      return { success: false }
    }
  },
}
