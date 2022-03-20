import * as cookie from "cookie";

import { register } from "$lib/api/api";

export const post = async ({ request }) => {
  const body = await request.json();

  const email: string = body.email;
  const password: string = body.password;

  const firstName: string = body.firstName;
  const lastName: string = body.lastName;

  if (!email || !password) {
    return {
      status: 400,
      body: {
        message: "Missing email or password",
      },
    };
  }

  if (!firstName || !lastName) {
    return {
      status: 400,
      body: {
        message: "Missing firstName or lastName",
      },
    };
  }

  const res = await register(email, password, firstName, lastName, true);

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
    body: {
      message: "Success",
    },
  };
};
