import { Context } from "koa";

import { getManager, Repository } from "typeorm";

import { User } from "@profesnisit/orm";

import { verify as argonVerify } from "argon2";

import UserController from "./user";

import generateToken from "../utils/generateLoginToken";

//import recapatcha from "../middlewares/recaptcha";

import useRedis from "../utils/useRedis";

export default class AccountController {
  public static register = async (ctx: Context): Promise<void> => {
    //await recapatcha(ctx);
    //if (ctx.status !== 200) {
    //  return;
    //}
    await UserController.createUser(ctx);
    if (ctx.status === 200) {
      const response: any = ctx.response.body;
      ctx.request.body = response;
      await this.login(ctx, true);
    }
  };

  public static login = async (
    ctx: Context,
    fromRegistration: boolean = false
  ): Promise<void> => {
    if (!ctx.request.body.email || !ctx.request.body.password) {
      ctx.status = 400;
      ctx.response.body = "Missing e-mail || password";
      return;
    }

    const repository: Repository<User> = getManager().getRepository(User);

    const user: User | undefined = await repository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email: ctx.request.body.email })
      .getOne();

    if (!user) {
      ctx.status = 404;
      ctx.response.body = `User ${ctx.request.body.email} not found`;
    } else if (
      !fromRegistration
        ? await argonVerify(user.password, ctx.request.body.password, {
            timeCost: 200,
            type: 2,
            memoryCost: 4096,
            parallelism: 10,
          })
        : true
    ) {
      const token = generateToken(user.id, user.email, "login");
      ctx.status = 200;

      const redisCallback = async (redis: any): Promise<string | undefined> => {
        return await redis.set(ctx.request.body.email, token);
      };
      await useRedis(redisCallback);
      ctx.response.body = JSON.stringify(token);

      ctx.cookies.set("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        secureProxy: true,
      });
    } else {
      ctx.status = 401;
      ctx.response.body = "Bad password or e-mail address";
    }
  };

  public static logout = async (ctx: Context) => {
    const redisCallback = async (redis: any): Promise<string | undefined> => {
      return await redis.del(ctx.state.webtoken.email);
    };
    await useRedis(redisCallback);
    ctx.status = 200;
    ctx.response.body = "User logged-out successfully";
  };
}
