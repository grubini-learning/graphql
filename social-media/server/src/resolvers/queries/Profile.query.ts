import { User } from "@prisma/client";
import { Context, Payload, UserErrors, Profile as PProfile } from "../../types";

export default {
  profile: async (
    _: any,
    { userId }: { userId: number },
    { prisma, userInfo }: Context
  ): Promise<
    Payload<"profile", PProfile | null> & { isMyProfile: boolean }
  > => {
    if (!userId) {
      return {
        userErrors: [{ message: "User was not provided" }],
        isMyProfile: false,
        profile: null,
      };
    }
    const userErrors: UserErrors[] = [];

    let profile = await prisma.profile.findUnique({
      where: { userId: +userId },
    });
    let isMyProfile = +userId === userInfo?.userId;

    if (!profile) {
      userErrors.push({ message: "User provided does not exist" });
      profile = null;
      isMyProfile = false;
    }

    return {
      userErrors,
      profile,
      isMyProfile,
    };
  },
};

export const Profile = {
  user: (
    parent: PProfile,
    _: any,
    { prisma }: Context
  ): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id: parent.userId } });
  },
};
