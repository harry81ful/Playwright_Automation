import { Page } from "@playwright/test";

export class JupiterToysLandingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page; // Initialize the page object in the constructor
  }

  async goto() {
    await this.page.goto("/"); // Navigate to the Jupiter Toys landing page. The base URl is defined in the playwright.config.ts file.
  }

  async isPageTitleVIsible() {
    const getPageTitle = this.page.locator("h1", { hasText: "Jupiter Toys" });
    return await getPageTitle.isVisible();
  }

  // method to navigate to different sections of the site using the navigation bar
  async navBar(menuItem: string) {
    const navMap: { [key: string]: string } = {
      Home: 'a[href="#/home"]',
      Shop: 'a[href="#/shop"]',
      Contact: 'a[href="#/contact"]',
      Login: 'a[href="#/login"]',
      Cart: 'a[href="#/cart"]',
    };
    if (!navMap[menuItem]) {
      throw new Error(`Menu item "${menuItem}" does not exist.`);
    }
    await this.page.click(navMap[menuItem]);
  }

  async startShoppingBtn() {
    const startShoppingButton = this.page.locator(
      'a.btn-success:has-text("Start Shopping")'
    );

    await startShoppingButton.click();
  }

  // Method to get the count of items in the cart displayed in the cart icon. Another way to get the cart count is to use the cart page.
  async getCartCount(): Promise<number> {
    const cartcount = await this.page.locator("span.cart-count").textContent();
    return parseInt(cartcount || "0", 10);
  }
}
