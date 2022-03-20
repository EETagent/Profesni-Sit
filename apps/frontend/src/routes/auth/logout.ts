import * as cookie from "cookie";

import { logout } from "$lib/api/api";

export const post = async ({request}) => {
  const res = await logout(true, request.headers);

  if (res.status !== 200) {
    return {
      status: res.status,
      body: {
        message: await res.text(),
      },
    };
  }

  const headers = {
    "Set-Cookie": cookie.serialize("token", "", {
      httpOnly: true,
      maxAge: 1,
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    }),
  };
  return {
    status: 200,
    headers,
  };
};
