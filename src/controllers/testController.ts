import { Request, Response } from 'express';
import * as testService from '../services/testService'

export async function createTest(req: Request, res: Response) {
  const testData = req.body;
  await testService.createTest(testData);
  res.sendStatus(201);
};

export async function getTestsByDiscipline(req: Request, res: Response) {
  const result = await testService.getTestByDiscipline();
  res.send(result).status(200);
};

export async function getTestsByTeacher(req: Request, res: Response) {
  const result = await testService.getTestByTeacher();
  res.send(result).status(200);
};