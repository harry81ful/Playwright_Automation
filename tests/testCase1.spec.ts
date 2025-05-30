import { test, expect } from "../fixtures/pomFixtures";
import { foreName, surName, telephone } from "../utilities/util";

test.describe("@testCase1 contact form page error test", () => {
  test.beforeEach(async ({ page, landingPage, contactFormPage }) => {
    await landingPage.goto();
    await page.waitForLoadState("networkidle");

    const isPageTitleVisible = await landingPage.isPageTitleVIsible();
    await expect(isPageTitleVisible).toBeTruthy();

    await landingPage.navBar("Contact");
    await expect(contactFormPage.contactFormHeader).toBeVisible();
  });

  test("@testCase1 submit empty form and then fill form", async ({
    contactFormPage,
  }) => {
    await contactFormPage.submitContactForm();
    const isErrorBannerVisible = await contactFormPage.errorBanner.isVisible();
    await expect(isErrorBannerVisible).toBeTruthy();

    await contactFormPage.fillContactForm();
    const hasValidationError = await contactFormPage.hasAnyValidationError();
    await expect(hasValidationError).toBeFalsy();
  });

  test("@testCase1 submit form with only forename and surname", async ({
    contactFormPage,
  }) => {
    await contactFormPage.foreName.fill(foreName());
    await contactFormPage.surName.fill(surName());
    await contactFormPage.submitContactForm();
    const hasAnyValidationError = await contactFormPage.hasAnyValidationError();
    await expect(hasAnyValidationError).toBeTruthy();
  });

  test("@testCase1 submit with invalid email", async ({ contactFormPage }) => {
    await contactFormPage.foreName.fill(foreName());
    await contactFormPage.surName.fill(surName());
    await contactFormPage.email.fill("invalid-email");
    await contactFormPage.telephone.fill(telephone);
    await contactFormPage.message.fill("This is a test message.");
    // await contactFormPage.submitContactForm();
  });

  test("@testCase1 submit form with invalid telephone number", async ({
    contactFormPage,
  }) => {
    await contactFormPage.fillContactForm();
    await contactFormPage.telephone.fill("invalid-telephone");
    const hasAnyValidationError = await contactFormPage.hasAnyValidationError();
    await expect(hasAnyValidationError).toBeTruthy();
  });
});
