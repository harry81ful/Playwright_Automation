import { test, expect } from "../fixtures/pomFixtures";
import { foreName, message, surName } from "../utilities/util";

test.describe("@testCase2 contact form page sucess test", () => {
  test.beforeEach(async ({ page, landingPage, contactFormPage }) => {
    await landingPage.goto();
    await page.waitForLoadState("networkidle");

    const isPageTitleVisible = await landingPage.isPageTitleVIsible();
    await expect(isPageTitleVisible).toBeTruthy();

    await landingPage.navBar("Contact");
    await expect(contactFormPage.contactFormHeader).toBeVisible();
  });

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

  test("@testCase2 submit contact form with only mandatory fields", async ({
    contactFormPage,
  }) => {
    const firstName = foreName();
    const lastName = surName();

    await contactFormPage.foreName.fill(firstName);
    await contactFormPage.surName.fill(lastName);
    await contactFormPage.email.fill(firstName + lastName + "@gmail.com");
    await contactFormPage.message.fill(message());
    await contactFormPage.submitContactForm();

    await contactFormPage.modalBanner.waitFor({ state: "visible" });
    await contactFormPage.modalBanner.waitFor({ state: "hidden" });
    await contactFormPage.page.waitForLoadState("networkidle");

    const isSuccessMessageVisible =
      await contactFormPage.SuccessMessage.isVisible();
    await expect(isSuccessMessageVisible).toBeTruthy();
  });
});
