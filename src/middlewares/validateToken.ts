import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserById } from '../services/authService'
import { TypeUserData } from '../types/userTypes';

/* export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const KEY_JWT = process.env.JWT_SECRET;

  const {userId} = jwt.verify(String(token), String(KEY_JWT)) as { userId: number };
  if (!token) throw { type: "unprocessable_entity" };

  const userData: TypeUserData = await findUserById(Number(userId));

  res.locals.verifiedToken = userData;
  next();
}; */

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const KEY_JWT = process.env.JWT_SECRET;

  const verified = jwt.verify(String(token), String(KEY_JWT));
  console.log(verified)
  if (!verified) throw { type: 'unauthorized' };

  res.locals.verifiedToken = verified;
  next();
}