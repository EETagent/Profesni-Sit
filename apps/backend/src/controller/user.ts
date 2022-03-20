import { Context } from "koa";

import { getManager, Repository } from "typeorm";

import { validate as ormValidate } from "class-validator";

import { hash as argon2Hash } from "argon2";

import { User, UserDetails } from "@profesnisit/orm";

import useRedis from "../utils/useRedis";

class UserController {
  public static getAllUsers = async (ctx: Context): Promise<void> => {
    const isCompactParam = ctx.request.query.compact != undefined;

    const filter = ctx.request.query.filter;

    const limit = ctx.request.query.limit ?? Number.MAX_SAFE_INTEGER;

    const repository: Repository<User> = getManager().getRepository(User);

    let allUsers: Array<User> = isCompactParam
      ? await repository
          .createQueryBuilder("user")
          .select([
            "user.id",
            "user.firstName",
            "user.lastName",
            "user.email",
            "user.imagePath",
          ])
          .take(limit as number)
          .getMany()
      : await repository.find({
          relations: ["userdetails"],
          take: limit as number,
        });

    // Filtrování přes JavaScript, nikoli přes SQL, výkonostní potíže zanedbatelné pro tento projekt, nulová SQL Injection
    if (filter) {
      let filterS = (filter as string).toLowerCase();
      allUsers = allUsers.filter(
        (f) =>
          f.firstName.toLowerCase().includes(filterS) ||
          f.lastName.toLocaleLowerCase().includes(filterS) ||
          f.email.toLowerCase().includes(filterS)
      );
    }

    ctx.status = 200;
    ctx.response.body = allUsers;
  };

  private static getUser = async (ctx: Context, id: string): Promise<void> => {
    const repository: Repository<User> = getManager().getRepository(User);

    const user: User | undefined = await repository.findOne(id);

    if (!user) {
      ctx.status = 404;
      ctx.response.body = "User " + id + " not found";
    } else {
      ctx.status = 200;
      ctx.response.body = user;
    }
  };

  public static getUserById = async (ctx: Context): Promise<void> => {
    const id: string | undefined = ctx.params.id;
    if (!id) {
      ctx.status = 401;
      ctx.response.body = "Missing user parameter";
      return;
    }
    await this.getUser(ctx, id);
  };
  public static getUserByToken = async (ctx: Context): Promise<void> => {
    const id: string = ctx.state.webtoken.id;
    await this.getUser(ctx, id);
  };

  public static createUser = async (ctx: Context): Promise<void> => {
    console.log(ctx.request.body);
    if (
      !ctx.request.body.email ||
      !ctx.request.body.password ||
      !ctx.request.body.firstName ||
      !ctx.request.body.lastName
    ) {
      ctx.status = 400;
      ctx.response.body = "Missing e-mail || password || firstName || lastName";
      return;
    }

    const email: string = ctx.request.body.email;
    const repository: Repository<User> = getManager().getRepository(User);

    if (await repository.findOne({ email: email })) {
      ctx.status = 400;
      ctx.response.body = `User with e-mail address ${email} already exists`;
      return;
    }

    const newUser: User = new User();

    newUser.email = ctx.request.body.email;
    newUser.password = await argon2Hash(ctx.request.body.password, {
      timeCost: 200,
      type: 2,
      memoryCost: 4096,
      parallelism: 10,
    });
    newUser.firstName = ctx.request.body.firstName;
    newUser.lastName = ctx.request.body.lastName;

    const details: UserDetails = new UserDetails();
    newUser.userdetails = details;

    const errors = await ormValidate(newUser);
    if (errors.length === 0) {
      const user = await repository.save(newUser);
      ctx.status = 200;
      ctx.response.body = user;
    } else {
      ctx.status = 401;
      ctx.response.body = "Invalid" + JSON.stringify(errors);
    }
  };

  private static updateUser = async (
    ctx: Context,
    id: string
  ): Promise<void> => {
    const userRepository: Repository<User> = getManager().getRepository(User);
    const detailsRepository: Repository<UserDetails> =
      getManager().getRepository(UserDetails);

    const updateUser: User | undefined = await userRepository.findOne(id, {
      relations: ["userdetails"],
    });

    if (!updateUser) {
      ctx.status = 404;
      ctx.response.body = "User not found";
      return;
    }
    ctx.status = 200;

    await userRepository.update(id, {
      ...(ctx.request.body.birthDay && { birthDay: ctx.request.body.birthDay }),
      ...(ctx.request.body.about && { about: ctx.request.body.about }),
      ...(ctx.request.body.class && { class: ctx.request.body.class }),
      ...(ctx.request.body.imagePath && {
        imagePath: ctx.request.body.imagePath,
      }),
      // "Update" ID, které zaručeně existuje, vyhneme se tak dlouhému ověřování, v případě, že ani jedna položka výše neexistuje
      id: id,
    });

    if (ctx.request.body.details) {
      const details: UserDetails = updateUser.userdetails;
      detailsRepository.update(details.id, {
        details: ctx.request.body.details,
      });
    }
  };

  public static updateUserById = async (ctx: Context): Promise<void> => {
    const id: string | undefined = ctx.params.id;
    if (!id) {
      ctx.status = 400;
      ctx.response.body = "Missing user parameter";
      return;
    }
    await this.updateUser(ctx, id);
  };

  public static updateUserByToken = async (ctx: Context): Promise<void> => {
    const id: string = ctx.state.webtoken.id;
    await this.updateUser(ctx, id);
  };

  private static deleteUser = async (
    ctx: Context,
    id: string
  ): Promise<void> => {
    const repository: Repository<User> = getManager().getRepository(User);

    const removeUser: User | undefined = await repository.findOne(id);

    if (!removeUser) {
      ctx.status = 404;
      ctx.response.body = "User not found";
    } else {
      const redisCallback = async (redis: any): Promise<string | undefined> => {
        return await redis.del(removeUser.email);
      };
      await useRedis(redisCallback);

      await repository.remove(removeUser);
      ctx.status = 200;
    }
  };

  public static deleteUserById = async (ctx: Context): Promise<void> => {
    const id: string | undefined = ctx.params.id;
    if (!id) {
      ctx.status = 400;
      ctx.response.body = "Missing user parameter";
      return;
    }
    if (ctx.state.admin !== true) {
      ctx.status = 403;
      ctx.response.body = "Insufficient permissions to delete the user";
      return;
    }
    await this.deleteUser(ctx, id);
  };

  public static deleteUserByToken = async (ctx: Context): Promise<void> => {
    const id: string = ctx.state.webtoken.id;
    await this.deleteUser(ctx, id);
  };
}

export default UserController;
