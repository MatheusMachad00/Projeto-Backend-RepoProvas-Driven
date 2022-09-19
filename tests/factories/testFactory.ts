import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import app from '../../src';

export async function testFactory() {
  return ({
    name: faker.lorem.word(3),
    pdfUrl: faker.internet.url(),
    categoryId: 2,
    disciplineId: 3,
    teacherId: 2
  });
};

export async function getToken() {
  const login = {
    email: "teste@gmail.com",
    password: "1234567890",
    confirmPassword: "1234567890"
  };
  
  await supertest(app).post(`/signup`).send(login);
  const loginData = await supertest(app).post(`/login`).send({email: login.email, password: login.password});
  const token = loginData.body.token;
  return token;
}