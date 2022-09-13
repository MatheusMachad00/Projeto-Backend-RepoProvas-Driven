import { prisma } from "../config/database";
import { TypeNewUserData } from "../types/userTypes";

export async function checkEmail(email: string) {
  const result = await prisma.user.findFirst({ where: { email } });
  return result;
};

export async function createUser(user: TypeNewUserData) {
  await prisma.user.create({ data: user });
};