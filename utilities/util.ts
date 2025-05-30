import { faker } from "@faker-js/faker";

export const generateUniqueEmailId = (): {} => {
  let foreName = faker.person.firstName(); // Generate a new first name
  let email = `${foreName}@gmail.com`;
  return { email, foreName };
};

export const foreName: () => string = () => faker.person.firstName(); //generate a new first name eever time its called
export const surName: () => string = () => faker.person.lastName(); //generate a new last name every time its called
export const telephone = "02 12345678";
export const message = () => faker.lorem.paragraph(); //generate a new message every time its called
