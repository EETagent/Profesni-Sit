import { sign as jwtSign } from "jsonwebtoken";

import {
  login_jwt,
  login_jwt_expiry,
  email_jwt,
  email_jwt_expiry,
} from "../config.json";

const generateToken = (
  id: string,
  email: string,
  type: "login" | "email"
): string => {
  const token: string = jwtSign(
    {
      id: id,
      email: email,
    },
    type === "login" ? login_jwt : email_jwt,
    {
      algorithm: "HS512",
      expiresIn: type === "login" ? login_jwt_expiry : email_jwt_expiry,
    }
  );
  return token;
};

export default generateToken;
