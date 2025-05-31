import { test, expect } from "../fixtures/pomFixtures";
import { foreName, message, surName } from "../utilities/util";

// Test suite for the contact form page
test.describe("@testCase2 contact form page sucess test", () => {
  // Test describe runs all test cases in the block before each test case.
  test.beforeEach(async ({ page, landingPage, contactFormPage }) => {
    await landingPage.goto();
    await page.waitForLoadState("networkidle"); // Wait for the page to load completely

    const isPageTitleVisible = await landingPage.isPageTitleVIsible();
    await expect(isPageTitleVisible).toBeTruthy(); // Check if the page title is visible

    await landingPage.navBar("Contact");
    await expect(contactFormPage.contactFormHeader).toBeVisible(); // Check if the contact form header is visible
  });

  //test to check if the contact form is submitted with all fields filled
  test("@testCase2 submit contact form with all fields filled", async ({
    page,
    contactFormPage,
  }) => {
    await contactFormPage.fillContactForm();
    await contactFormPage.submitContactForm();

    await contactFormPage.modalBanner.waitFor({ state: "visible" });
    await contactFormPage.modalBanner.waitFor({ state: "hidden" });
    await page.waitForLoadState("networkidle");

    const isSuccessMessageVisible =
      await contactFormPage.SuccessMessage.isVisible();
    await expect(isSuccessMessageVisible).toBeTruthy();
  });

  //test to check if the contact form is submitted with only mandatory fields filled
  test("@testCase2 submit contact form with only mandatory fields", async ({
    contactFormPage,
  }) => {
    const firstName = foreName(); // Generate a random first name and store it in a variable
    const lastName = surName(); // Generate a random last name and store it in a variable

    await contactFormPage.foreName.fill(firstName);
    await contactFormPage.surName.fill(lastName);
    await contactFormPage.email.fill(firstName + lastName + "@gmail.com");
    await contactFormPage.message.fill(message());
    await contactFormPage.submitContactForm();

    await contactFormPage.modalBanner.waitFor({ state: "visible" });
    await contactFormPage.modalBanner.waitFor({ state: "hidden" });
    await contactFormPage.page.waitForLoadState("networkidle");

    const isSuccessMessageVisible =
      await contactFormPage.SuccessMessage.isVisible(); // method returns true if the success message is visible
    await expect(isSuccessMessageVisible).toBeTruthy(); // Check if the success message is visible after form submission
  });
});
