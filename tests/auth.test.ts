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

  it('Deve falhar no email ', async () => {
    const user = await authFactory.signupFailEmail();
    const result = await supertest(app).post("/signup").send(user);

    expect(result.status).toEqual(422);
  });

  it('Deve falhar na senha ', async () => {
    const user = await authFactory.signupFailConfirmPassword();
    const result = await supertest(app).post("/signup").send(user);

    expect(result.status).toEqual(422);
  });
});

describe('Testa o login', () => {
  it('Deve retornar 200 e o token', async () => {
    const newUser = await authFactory.signupFactory();
    const user = await authFactory.loginFactory();

    await supertest(app).post("/signup").send(newUser);

    const result = await supertest(app).post("/login").send(user);
    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  it('Deve falhar no email', async () => {
    const newUser = await authFactory.signupFactory();
    const user = await authFactory.loginFactoryFailEmail();

    await supertest(app).post("/signup").send(newUser);

    const result = await supertest(app).post("/login").send(user);
    expect(result.status).toEqual(401);
  });

  it('Deve falhar na senha', async () => {
    const newUser = await authFactory.signupFactory();
    const user = await authFactory.loginFactoryFailPassword();

    await supertest(app).post("/signup").send(newUser);

    const result = await supertest(app).post("/login").send(user);
    expect(result.status).toEqual(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});