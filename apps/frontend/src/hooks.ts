import * as cookie from "cookie";

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get("cookie") || "");

  event.locals.token = cookies.token;
  event.locals.authenticated = !!cookies.token;

  return resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  return {
    authenticated: event.locals.authenticated,
    token: event.locals.token,
  };
}
