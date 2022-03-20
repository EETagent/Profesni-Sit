import { Context } from "koa";
import fetch, { Response } from "node-fetch";

interface reCAPTCHAResponseI {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes": string[];
}
const recapatcha = async (ctx: Context): Promise<void> => {
  if (!ctx.request.body.recaptcha) {
    ctx.status = 401;
    Object.assign(ctx.body, {
      error: "Missing reCAPTCHA",
    });
    return;
  }

  const responseKey: string = ctx.request.body.recapatcha;
  const secretKey: string = "AAA";

  const recaptchaValidateURL: string = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${responseKey}`;

  const request: Response = await fetch(recaptchaValidateURL, {
    method: "post",
  });

  const response: reCAPTCHAResponseI =
    (await request.json()) as reCAPTCHAResponseI;

  if (!response.success) {
    ctx.status = 401;
    Object.assign(ctx.body, {
      error: "Invalid reCAPTCHA",
    });
  } else {
    ctx.status = 200;
  }
};

export default recapatcha;
