import { unlink } from "fs";
import { join as pathJoin, basename } from "path";

import Router from "@koa/router";
import koaBody from "koa-body";

import sharp from "sharp";

import UserController from "../controller/user";

const router = new Router({ prefix: "/users" });

router.get("/", UserController.getAllUsers);

router.get("/me", UserController.getUserByToken);
router.put("/me", UserController.updateUserByToken);
router.del("/me", UserController.deleteUserByToken);

router.get("/id/:id", UserController.getUserById);
router.put("/id/:id", UserController.updateUserById);
router.delete("/id/:id", UserController.deleteUserById);

router.post("/create", UserController.createUser);

router.put(
  "/me/avatar",
  koaBody({
    multipart: true,
    formidable: {
      maxFields: 1,
      maxFileSize: 5 * 1000 * 1000,
    },
  }),
  async (ctx) => {
    if (ctx.request.files) {
      if (
        ctx.request.files.avatar &&
        !(ctx.request.files.avatar instanceof Array)
      ) {
        const allowedTypes: Array<string> = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];

        const { path, name, type } = ctx.request.files.avatar;
        if (type && allowedTypes.includes(type)) {
          const imgName = basename(ctx.state.webtoken.id + ".jpg");
          await sharp(path)
            .resize(400, 400)
            .toFile(pathJoin(__dirname, "../../public", "uploads", imgName))
            .then(async () => {
              ctx.request.body.imagePath = pathJoin("/uploads", imgName);
              await UserController.updateUserByToken(ctx);
            })
            .catch((e) => {
              ctx.status = 400;
              ctx.body = e;
            });
        } else {
          ctx.status = 400;
          ctx.response.body = `Only ${allowedTypes.toString()} are allowed`;
        }
        await unlink(path, () => {});
      } else {
        ctx.request.files.avatar.forEach(async (f) => {
          await unlink(f.path, () => {});
        });
        ctx.status = 400;
        ctx.response.body = "Invalid avatar upload";
      }
    } else {
      ctx.status = 400;
      ctx.response.body = "Missing file";
    }
  }
);

export default router;
