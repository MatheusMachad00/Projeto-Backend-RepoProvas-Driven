import { User } from "@prisma/client";

export type TypeNewUserData = Omit<User, 'id'>;
export type TypeUserData = Omit<User, 'password' | 'email'>