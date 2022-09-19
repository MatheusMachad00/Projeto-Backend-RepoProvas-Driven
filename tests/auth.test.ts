import { prisma } from '../src/config/database';
import * as authFactory from './factories/authFactory'
import app from '../src/index'
import supertest from 'supertest';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

describe('Signup test', () => {
  it('Must return status code 201', async () => {
    const user = await authFactory.signupFactory();
    const result = await supertest(app).post("/signup").send(user);

    expect(result.status).toEqual(201);
  });

  it('Must fail on email validation', async () => {
    const user = await authFactory.signupFailEmail();
    const result = await supertest(app).post("/signup").send(user);

    expect(result.status).toEqual(422);
  });

  it('Must fail on password validation', async () => {
    const user = await authFactory.signupFailConfirmPassword();
    const result = await supertest(app).post("/signup").send(user);

    expect(result.status).toEqual(422);
  });
});

describe('Login test', () => {
  it('Must return status code 200 and token', async () => {
    const newUser = await authFactory.signupFactory();
    const user = await authFactory.loginFactory();

    await supertest(app).post("/signup").send(newUser);

    const result = await supertest(app).post("/login").send(user);
    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  it('Must fail on email validation', async () => {
    const newUser = await authFactory.signupFactory();
    const user = await authFactory.loginFactoryFailEmail();

    await supertest(app).post("/signup").send(newUser);

    const result = await supertest(app).post("/login").send(user);
    expect(result.status).toEqual(401);
  });

  it('Must fail on password validation', async () => {
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