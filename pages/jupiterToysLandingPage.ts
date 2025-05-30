import { Page } from "@playwright/test";

export class JupiterToysLandingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
  }

  async isPageTitleVIsible() {
    const getPageTitle = this.page.locator("h1", { hasText: "Jupiter Toys" });
    return await getPageTitle.isVisible();
  }

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

  async getCartCount(): Promise<number> {
    const cartcount = await this.page.locator("span.cart-count").textContent();
    return parseInt(cartcount || "0", 10);
  }
}
