import Router from "@koa/router";
import { Context } from "koa";

import AccountController from "../controller/account";

const router = new Router();

router.post("/login", (ctx: Context) => AccountController.login(ctx));

router.post("/register", AccountController.register);

router.post("/reset/:token");

export default router;
