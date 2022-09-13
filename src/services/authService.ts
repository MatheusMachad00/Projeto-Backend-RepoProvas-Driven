import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authRepository from '../repositories/authRepository'
import { TypeNewUserData } from '../types/userTypes'

export async function signup(signupData: TypeNewUserData) {
  const { email, password } = signupData
  const SALT = 10;
  const encryptedPassword = bcrypt.hashSync(password, SALT);

  const emailExists = await authRepository.checkEmail(email);
  console.log(emailExists)
  if (emailExists) throw { type: 'conflict' };

  await authRepository.createUser({ email, password: encryptedPassword });
};

export async function login(login: TypeNewUserData) {
  const KEY_JWT = process.env.JWT_SECRET;
  const userData = await getUserOrFail(login);
  console.log(userData)
  const token = jwt.sign(userData, String(KEY_JWT));


  return token;
};

async function getUserOrFail(login: TypeNewUserData) {
  const user = await authRepository.checkEmail(login.email);
  if (!user) throw { type: "unauthorized" };

  const isPasswordValid = bcrypt.compareSync(login.password, user.password);
  if (!isPasswordValid) throw { type: "unauthorized" };

  return user;
};

export async function findUserById(id: number) {
  const user = await authRepository.findById(id);
  if (!user) throw { type: "not_found" };
  return user;
}