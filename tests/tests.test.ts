import app from '../src/index'
import supertest from 'supertest';
import { prisma } from '../src/config/database';
import * as testFactory from './factories/testFactory'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "tests"`;
  await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

describe('Create a new test', () => {
  it('Must return status code 201', async () => {
    const token = await testFactory.getToken();
    const test = await testFactory.testFactory();
    const result = await supertest(app)
      .post('test/create')
      .send(test)
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toEqual(201);
  });

  it.todo('Must return status code 422 (wrong type)');
  it.todo('Must return status code 422 (missing data) ');
});

describe('Get tests', () => {
  it('Must return status code 200 and tests by discipline', async () => {
    const token = await testFactory.getToken();
    const result = await supertest(app)
      .get("/getByDiscipline")
      .send()
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toEqual(200);
    expect(typeof (result.body)).toBe('array');
  });

  it('Must return status code 200 and tests by teacher', async () => {
    const token = await testFactory.getToken();
    const result = await supertest(app)
      .get("/getByTeacher")
      .send()
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toEqual(200);
    expect(typeof (result.body)).toBe('array');
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});