import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import validator from "validator";

import {
  Context,
  DataTypes,
  ErrorCodes,
  Payload,
  UserArgs,
  UserErrors,
} from "../../types";
import { User } from "@prisma/client";

export default {
  signUp: async (
    _: any,
    { user }: UserArgs,
    { prisma }: Context
  ): Promise<
    Payload<DataTypes.token, string | null> | Payload<DataTypes.token, null>
  > => {
    const { email = "", name, password = "", profile = "" } = user;

    const userErrors: UserErrors[] = [];
    const isValidEmail = validator.isEmail(email);
    const isValidPassword = validator.isLength(password, { min: 5 });

    if (!isValidEmail) {
      userErrors.push({ message: "Invalid email" });
    }
    if (!isValidPassword) {
      userErrors.push({ message: "Invalid password" });
    }
    if (!name) {
      userErrors.push({ message: "Invalid name" });
    }

    if (!profile) {
      userErrors.push({ message: "Invalid profile" });
    }

    if (userErrors.length > 0) {
      return {
        userErrors,
        token: null,
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userPayload = {
      email,
      name,
      password: hashPassword,
    };

    return prisma.user
      .create({ data: { ...userPayload } })
      .then((user) => ({
        token: JWT.sign(
          { userId: user.id },
          process.env.JSON_WEB_TOKEN_SIGNATURE!
        ),
        userId: user.id,
      }))
      .then(({ token, userId }) => {
        return prisma.profile
          .create({ data: { userId, bio: profile as string } })
          .then((_) => {
            return { token, userId };
          });
      })
      .then(({ token, userId }) => {
        return {
          userErrors: [],
          id: userId,
          token,
        };
      })
      .catch((e) => {
        if (e.code === ErrorCodes.NOT_UNIQUE) {
          userErrors.push({
            message: `This ${e.meta.target[0]} is already in use`,
          });
        }

        userErrors.push({ message: "User was not created" });

        return {
          userErrors,
          token: null,
        };
      });
  },
  signIn: async (
    _: any,
    { email = "", password = "" }: Pick<User, "email" | "password">,
    { prisma }: Context
  ): Promise<
    Payload<DataTypes.token, string | null> | Payload<DataTypes.token, null>
  > => {
    const userErrors: UserErrors[] = [];
    const isValidEmail = validator.isEmail(email);
    const isValidPassword = validator.isLength(password, { min: 5 });

    if (!isValidEmail) {
      userErrors.push({ message: "Invalid email" });
    }
    if (!isValidPassword) {
      userErrors.push({ message: "Invalid password" });
    }

    if (userErrors.length > 0) {
      return {
        userErrors,
        token: null,
      };
    }

    try {
      return prisma.user
        .findUnique({ where: { email } })
        .then((user) => {
          if (!user) {
            throw new Error("User doesn't exist");
          }

          return bcrypt
            .compare(password, user!.password)
            .then((isAuthenticated) => {
              return {
                isAuthenticated,
                user,
              };
            });
        })
        .then(({ isAuthenticated, user }) => {
          if (isAuthenticated) {
            const token = JWT.sign(
              { userId: user?.id },
              process.env.JSON_WEB_TOKEN_SIGNATURE!
            );

            return {
              userErrors: [],
              id: user?.id,
              token,
            };
          }

          return {
            userErrors: [{ message: "User fail to authenticate" }],
            token: null,
          };
        })
        .catch((e) => {
          return {
            userErrors: [{ message: e.message }],
            token: null,
          };
        });
    } catch (error) {
      console.log("the error: ", error);

      return { userErrors: [], token: null };
    }
  },
};
