import * as authController from '../src/controllers/authController'
import { prisma } from '../src/config/database';
import * as authFactory from './factories/authFactory'
import app from '../src/index'
import supertest from 'supertest';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

describe('Testa o signup', () => {
  it('Deve retornar 201', async () => {
    const user = await authFactory.signupFactory();
    const result = await supertest(app).post("/signup").send(user);
    expect(result.status).toEqual(201);
  });

  /* it('Deve falhar no email ', () => {
    
  });

  it('Deve falhar na senha ', () => {
    
  }); */
});

afterAll(async () => {
  await prisma.$disconnect();
});