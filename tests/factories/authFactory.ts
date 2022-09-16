import { faker } from '@faker-js/faker';

let newEmail = faker.internet.email();
let newPassword = faker.internet.password(15, true);

export async function signupFactory() {
  return {
    email: newEmail,
    password: newPassword,
    confirmPassword: newPassword,
  };
};

export async function signupFailEmail() {
  return {
    email: faker.lorem.words(3),
    password: newPassword,
    ConfirmPassword: newPassword,
  };
};

export async function signupFailConfirmPassword() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(15),
    ConfirmPassword: faker.internet.password(16),
  };
};

export async function loginFactory() {
  return {
    email: newEmail,
    password: newPassword
  };
};

export async function loginFactoryFailEmail() {
  return {
    email: faker.internet.email(),
    password: newPassword
  };
};

export async function loginFactoryFailPassword() {
  return {
    email: newEmail,
    password: faker.internet.password(16)
  };
};