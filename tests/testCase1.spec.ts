import { test, expect } from "../fixtures/pomFixtures";
import { foreName, surName, telephone } from "../utilities/util";

//test suite for the contact form page
test.describe("@testCase1 contact form page error test", () => {
  //Test describe runs all test cases in the block before each test case.
  //test beforeach runs before each test case in the block.
  //Tags are used to run specific test cases using the command line. More tags can be added as required.

  test.beforeEach(async ({ page, landingPage, contactFormPage }) => {
    await landingPage.goto();
    await page.waitForLoadState("networkidle"); // Wait for the page to load completely

    const isPageTitleVisible = await landingPage.isPageTitleVIsible();
    await expect(isPageTitleVisible).toBeTruthy(); // Check if the page title is visible

    await landingPage.navBar("Contact");
    await expect(contactFormPage.contactFormHeader).toBeVisible(); // Check if the contact form header is visible
  });

  test("@testCase1 submit empty form and then fill form", async ({
    contactFormPage,
  }) => {
    await contactFormPage.submitContactForm();
    const isErrorBannerVisible = await contactFormPage.errorBanner.isVisible();
    await expect(isErrorBannerVisible).toBeTruthy(); //isErrorBannerVisible returns true if the error banner is visible.

    await contactFormPage.fillContactForm();
    const hasValidationError = await contactFormPage.hasAnyValidationError();
    await expect(hasValidationError).toBeFalsy();
  });

  //test to check if the form is submitted with only forename and surname
  test("@testCase1 submit form with only forename and surname", async ({
    contactFormPage,
  }) => {
    await contactFormPage.foreName.fill(foreName());
    await contactFormPage.surName.fill(surName());
    await contactFormPage.submitContactForm();
    const hasAnyValidationError = await contactFormPage.hasAnyValidationError();
    await expect(hasAnyValidationError).toBeTruthy();
  });

  //test to check error message when invalid email is submitted
  test("@testCase1 submit with invalid email", async ({ contactFormPage }) => {
    await contactFormPage.foreName.fill(foreName());
    await contactFormPage.surName.fill(surName());
    await contactFormPage.email.fill("invalid-email");
    await contactFormPage.telephone.fill(telephone);
    await contactFormPage.message.fill("This is a test message.");
  });

  //test to check if the form throws error when invalid phone number is submitted. Although this does not stop from completing the form.
  test("@testCase1 submit form with invalid telephone number", async ({
    contactFormPage,
  }) => {
    await contactFormPage.fillContactForm();
    await contactFormPage.telephone.fill("invalid-telephone");
    const hasAnyValidationError = await contactFormPage.hasAnyValidationError();
    await expect(hasAnyValidationError).toBeTruthy();
  });
});
