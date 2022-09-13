import { Request, Response } from 'express';
import * as authService from '../services/authService'


export async function signup(req: Request, res: Response) {
  const signupData = req.body;
  await authService.signup(signupData);
  res.sendStatus(201);
};

export async function login(req: Request, res: Response) {
  const loginData = req.body;
  const result = await authService.login(loginData);
  res.send({ token: result }).status(200);
};