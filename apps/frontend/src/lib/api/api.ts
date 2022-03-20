import type UserI from "$lib/types/user";

export const login = async (
  email: string,
  password: string,
  remote: boolean = false
): Promise<Response> => {
  const res = await fetch(
    !remote ? "/auth/login" : "http://localhost:3001/login",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }
  );
  return res;
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  remote: boolean = false
): Promise<Response> => {
  const res = await fetch(
    !remote ? "/auth/register" : "http://localhost:3001/register",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }),
    }
  );
  return res;
};

export const logout = async (
  remote: boolean = false,
  headers: any
): Promise<Response> => {
  const res = await fetch(
    !remote ? "/auth/logout" : "http://localhost:3001/logout",
    {
      method: "POST",
      credentials: "include",
      headers: headers,
    }
  );
  return res;
};

export const getSelf = async (): Promise<Response> => {
  const res = await fetch("/api/users/me", {
    method: "GET",
    credentials: "include",
  });
  return res;
};

export const deleteSelf = async (): Promise<Response> => {
  const res = await fetch("/api/users/me", {
    method: "DELETE",
    credentials: "include",
  });
  return res;
};

export const updateSelf = async (profile: UserI): Promise<Response> => {
  const res = await fetch("/api/users/me", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });
  return res;
};

export const getUser = async (id: string): Promise<Response> => {
  const res = await fetch("/api/users/id/" + id, {
    method: "GET",
    credentials: "include",
  });
  return res;
};

export const getUsers = async (
  compact: boolean = false,
  limit?: number,
  filter?: string
): Promise<Response> => {
  let params = new URLSearchParams();
  if (compact) {
    params.append("compact", "true");
  }
  if (limit) {
    params.append("limit", limit.toString());
  }
  if (filter) {
    params.append("filter", filter);
  }
  const res = await fetch(`/api/users?${params}`, {
    method: "GET",
    credentials: "include",
  });
  return res;
};
