import { faker } from '@faker-js/faker';

export async function signupFactoryFaker() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(15, true),
    ConfirmPassword: faker.internet.password(15, true),
  };
};

export async function loginFactoryFaker() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
};

export async function signupFactory() {
  return{
    email: 'nazuna@gmail.com',
    password: 'bloodS22222222',
    confirmPassword: 'bloodS22222222'
  }
};

export async function loginFactory() {
  return {
    email: 'nazuna@gmail.com',
    password: 'bloodS22222222',
  };
};