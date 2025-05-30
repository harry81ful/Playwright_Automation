import { Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async itemsInCart() {
    const cartItems = this.page.locator("tr.cart-item");
    await cartItems.first().waitFor({ state: "attached" });
    const itemCount = await cartItems.count();
    return itemCount;
  }

  async getCartItemTotalprice() {
    let totalPrice = 0;

    const cartItems = this.page.locator("tr.cart-item");
    await cartItems.first().waitFor({ state: "attached" });
    const itemCount = await cartItems.count();

    for (let i = 0; i < itemCount; i++) {
      const row = cartItems.nth(i);

      const priceText = await row.locator("td").nth(1).innerText();
      const toyPrice = parseFloat(priceText.replace("$", ""));

      const toyQantyText = await row
        .locator("input[name='quantity']")
        .inputValue();
      const toyQuantity = parseInt(toyQantyText);

      totalPrice += toyPrice * toyQuantity;
    }
    return totalPrice;
  }

  async getCartTotalPrice() {
    const totalPriceText = await this.page.locator(".total").innerText();
    const match = totalPriceText.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }
}
