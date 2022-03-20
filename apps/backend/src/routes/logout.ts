import Router from "@koa/router";

import AccountController from "../controller/account";

const router = new Router();

router.post("/logout", AccountController.logout);

export default router;
