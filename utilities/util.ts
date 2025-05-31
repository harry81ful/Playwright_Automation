import { faker } from "@faker-js/faker";

// This file contains utility functions for generating random data using Faker.js
// This is to showcase different ways to generate data for testing purposes.
export const generateUniqueEmailId = (): {} => {
  let foreName = faker.person.firstName(); // Generate a new first name
  let email = `${foreName}@gmail.com`;
  return { email, foreName };
};

// This function generates a unique email ID using Faker.js
export const foreName: () => string = () => faker.person.firstName(); //generate a new first name eever time its called
export const surName: () => string = () => faker.person.lastName(); //generate a new last name every time its called
export const telephone = "02 12345678";
export const message = () => faker.lorem.paragraph(); //generate a new message every time its called

// This array contains items to be added to the cart in the shop page tests
export const itemToAdd = [
  { name: "Stuffed Frog", quantity: 2 },
  { name: "Fluffy Bunny", quantity: 5 },
  { name: "Valentine Bear", quantity: 3 },
];
