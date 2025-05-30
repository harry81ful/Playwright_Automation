import { test as base } from "@playwright/test";
import { JupiterToysLandingPage } from "../pages/jupiterToysLandingPage";
import { contactPage } from "../pages/contacFormPage";

type pages = {
  landingPage: JupiterToysLandingPage;
  contactFormPage: contactPage;
};
const myFixtures = base.extend<pages>({
  landingPage: async ({ page }, use) => {
    await use(new JupiterToysLandingPage(page));
  },
  contactFormPage: async ({ page }, use) => {
    await use(new contactPage(page));
  },
});
export const test = myFixtures;
export const expect = myFixtures.expect;
