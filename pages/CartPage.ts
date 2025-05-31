import { Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page; //page object is initilized in the constructor
  }

  async itemsInCart() {
    const cartItems = this.page.locator("tr.cart-item");
    await cartItems.first().waitFor({ state: "attached" });
    const itemCount = await cartItems.count();
    return itemCount;
  }

  //Calcluate the total price of all items in the cart
  async getCartItemTotalprice() {
    let totalPrice = 0;

    const cartItems = this.page.locator("tr.cart-item");
    await cartItems.first().waitFor({ state: "attached" });
    const itemCount = await cartItems.count(); //get the count of items in the cart

    for (let i = 0; i < itemCount; i++) {
      const row = cartItems.nth(i);

      const priceText = await row.locator("td").nth(1).innerText();
      const toyPrice = parseFloat(priceText.replace("$", "")); //parse the price as a float from string

      const toyQantyText = await row
        .locator("input[name='quantity']")
        .inputValue();
      const toyQuantity = parseInt(toyQantyText); //parse the quantity as an integer freom string

      totalPrice += toyPrice * toyQuantity;
    }
    return totalPrice;
  }

  async getCartTotalPrice() {
    const totalPriceText = await this.page.locator(".total").innerText();
    const match = totalPriceText.match(/[\d.]+/); //regular expression to match numbers with decimal points
    return match ? parseFloat(match[0]) : 0; //parse the total price as a float
  }
}
