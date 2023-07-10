export const handle = async ({ event, resolve }) => {
  const token = event.cookies.get("token")
  event.locals.token = token
  return resolve(event)
}
