import { Page, Locator } from "@playwright/test";
import { foreName, surName, telephone, message } from "../utilities/util";

// This class represents the contact page and provides methods to interact with the contact form.
// Then pattern decision is used to showcase when a more granular approach is needed for page objects.
export class contactPage {
  readonly page: Page;
  readonly contactFormHeader: Locator;
  readonly foreName: Locator;
  readonly surName: Locator;
  readonly email: Locator;
  readonly telephone: Locator;
  readonly message: Locator;
  readonly submitButton: Locator;
  readonly errorBanner: Locator;
  readonly foreNmaeValidationError: Locator;
  readonly emailValidationError: Locator;
  readonly messageValidationError: Locator;
  readonly emailFormatValidationError: Locator;
  readonly SuccessMessage: Locator;
  readonly modalBanner: Locator;

  // The constructor initializes the page object and locators for the contact form elements.
  constructor(page: Page) {
    this.page = page;
    this.contactFormHeader = page.locator("strong", {
      hasText: "We welcome your feedback",
    });
    this.foreName = this.page.locator("#forename");
    this.surName = this.page.locator("#surname");
    this.email = this.page.locator("#email");
    this.telephone = this.page.locator("#telephone");
    this.message = this.page.locator("#message");
    this.submitButton = page.locator("a.btn-contact.btn-primary");
    this.errorBanner = page.locator(
      'div.alert.alert-error:has-text("We welcome your feedback")'
    );
    this.foreNmaeValidationError = page.locator("#forename-err");
    this.emailValidationError = page.locator("#email-err");
    this.messageValidationError = page.locator("#message-err");
    this.emailFormatValidationError = page.locator("#email-err");
    this.SuccessMessage = page.locator("div.alert.alert-success >> strong");
    this.modalBanner = page.locator(".modal-footer");
  }

  // This method checks if the contact form is visible on the page. This menthod is useful during regression.
  async fillContactForm() {
    const firstName = foreName();
    const lastName = surName();
    await this.foreName.fill(firstName);
    await this.surName.fill(lastName);
    await this.email.fill(firstName + lastName + "@gmail.com");
    await this.telephone.fill(telephone);
    await this.message.fill(message());
    // Wait for the form to be filled before submitting
    await this.page.waitForTimeout(500); // Adjust the timeout as needed
  }

  async submitContactForm() {
    await this.submitButton.click();
  }

  //This method checks if any of the validation errors are visible on the page and returns a boolean value.
  async hasAnyValidationError(): Promise<boolean> {
    return (
      (await this.errorBanner.isVisible()) ||
      (await this.foreNmaeValidationError.isVisible()) ||
      (await this.emailValidationError.isVisible()) ||
      (await this.messageValidationError.isVisible()) ||
      this.emailFormatValidationError.isVisible()
    );
  }

  // async modalbanner(): Promise<void> {
  //   await this.modalBanner.waitFor({ state: "visible" });
  //   await this.modalBanner.waitFor({ state: "hidden" });
  //   await this.page.waitForLoadState("networkidle");
  // }
}
