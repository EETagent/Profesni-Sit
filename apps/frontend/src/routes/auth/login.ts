import * as cookie from "cookie";

import { login } from "$lib/api/api";

export const post = async ({ request }) => {
  const req = await request.json();

  const email: string = req.email;
  const password: string = req.password;

  if (!email || !password) {
    return {
      status: 400,
      body: {
        message: "Missing email or password",
      },
    };
  }

  const res = await login(email, password, true);

  if (res.status !== 200) {
    return {
      status: res.status,
      body: {
        message: await res.text(),
      },
    };
  }

  const token = await res.json();

  const headers = {
    "Set-Cookie": cookie.serialize("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 4,
      sameSite: "strict",
      path: "/",
    }),
  };

  return {
    status: 200,
    headers,
  };
};
