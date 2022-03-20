import { entities } from "@profesnisit/orm";

import Koa, { Context } from "koa";

import cors from "@koa/cors";
import koaHelmet from "koa-helmet";

import jwt from "koa-jwt";
import koaBody from "koa-body";
import serve from "koa-static";

import cron from "node-cron";

import accountRoute from "./routes/account";
import userRoute from "./routes/user";
import logoutRoute from "./routes/logout";

import generateToken from "./utils/generateLoginToken";
import useRedis from "./utils/useRedis";

import { login_jwt } from "./config.json";

import { verify as webtokenVerify } from "jsonwebtoken";
import { createConnection } from "typeorm";

createConnection({
  name: "default",
  type: "better-sqlite3",
  database: "./db/database.sqlite3",
  entities: entities,
  synchronize: true,
})
  .then(async () => {
    const app = new Koa({ proxy: true });

    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    app.use(koaHelmet());

    app.use(
      koaBody({
        json: true,
        multipart: false,
        urlencoded: true,
      })
    );

    app.use(serve(__dirname + "/../public"));

    app.use(accountRoute.routes()).use(accountRoute.allowedMethods());

    app.use(
      jwt({
        cookie: "token",
        secret: login_jwt,
        algorithms: ["HS512"],
        key: "webtoken",
        tokenKey: "tokenKey",
      })
    );

    app.use(async (ctx: Context, next: Koa.Next) => {
      const redisCallback = async (redis: any): Promise<string | undefined> => {
        return await redis.get(ctx.state.webtoken.email);
      };
      const token: string | undefined = await useRedis(redisCallback);
      if (!token) {
        ctx.status = 401;
        ctx.response.body = "Token is invalid..";
        return;
      }
      if (token !== ctx.state.tokenKey) {
        ctx.status = 401;
        ctx.response.body = "Token was invalidated";
        return;
      }
      return next();
    });

    app.use(async (ctx: Context, next: Koa.Next) => {
      if (ctx.state.webtoken.exp - Date.now() / 1000 < 60 * 60 * 1.5) {
        const token = {
          token: generateToken(
            ctx.state.webtoken.id,
            ctx.state.webtoken.email,
            "login"
          ),
        };
        ctx.cookies.set("token", token.token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          secureProxy: true,
        });
      }
      return next();
    });

    cron.schedule("*/2 * * * * *", async () => {
      const redisCallback = async (redis: any): Promise<void> => {
        for await (const email of redis.scanIterator()) {
          const token = await redis.get(email);
          if (token) {
            webtokenVerify(token, login_jwt, async (err: any) => {
              if (err) {
                await redis.del(email);
              }
            });
          }
        }
      };
      await useRedis(redisCallback);
    });

    app.use(userRoute.routes()).use(userRoute.allowedMethods());

    app.use(logoutRoute.routes()).use(accountRoute.allowedMethods());

    app.listen(3001, () => {
      console.log(`Server running on port 3001`);
    });
  })

  .catch((error) => console.log("TypeORM connection error: ", error));
