import { test as base } from "@playwright/test";
import { JupiterToysLandingPage } from "../pages/jupiterToysLandingPage";
import { contactPage } from "../pages/contacFormPage";
import { shopPageElements } from "../pages/shopPage";
import { CartPage } from "../pages/CartPage";

// This file defines the Playwright fixtures for the page objects used in the tests.
// The custom fixtures so that the page object need not be initialized in every test file.
type pages = {
  landingPage: JupiterToysLandingPage;
  contactFormPage: contactPage;
  shopToys: shopPageElements;
  inCartPage: CartPage;
};
const myFixtures = base.extend<pages>({
  landingPage: async ({ page }, use) => {
    await use(new JupiterToysLandingPage(page));
  },
  contactFormPage: async ({ page }, use) => {
    await use(new contactPage(page));
  },
  shopToys: async ({ page }, use) => {
    await use(new shopPageElements(page));
  },
  inCartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export const test = myFixtures;
export const expect = myFixtures.expect;
