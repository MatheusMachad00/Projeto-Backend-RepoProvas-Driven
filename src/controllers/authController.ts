import { Request, Response } from 'express';
import * as authService from '../services/authService'
import { TypeNewUserData } from '../types/userTypes';


export async function signup(req: Request, res: Response) {
  const signupData = req.body;
  await authService.signup(signupData);
  res.sendStatus(201);
};

export async function login(req: Request, res: Response) {
  const {email, password} = req.body;
  const result = await authService.login({email, password});
  res.send({ token: result }).status(200);
};