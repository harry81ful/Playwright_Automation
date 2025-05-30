import { test, expect } from "../fixtures/pomFixtures";
import { itemToAdd } from "../utilities/util";

test.describe("@testCase3 Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear", () => {
  test.beforeEach(async ({ page, landingPage, shopToys }) => {
    await landingPage.goto();
    await page.waitForLoadState("networkidle");
    const isPageTitleVisible = await landingPage.isPageTitleVIsible();
    await expect(isPageTitleVisible).toBeTruthy();
    await landingPage.navBar("Shop");
  });

  test("@testCase3 add 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear to cart and verify the count", async ({
    page,
    shopToys,
    landingPage,
    inCartPage,
  }) => {
    let totalItems = 0;
    for (const item of itemToAdd) {
      await shopToys.searchForToy(item.name, item.quantity);
      totalItems += item.quantity;
    }
    const count = await landingPage.getCartCount();
    await expect(totalItems).toEqual(count);

    await landingPage.navBar("Cart");
    await page.waitForLoadState("networkidle");

    const totalUniqueItemsadded = itemToAdd.length;
    const itemCount = await inCartPage.itemsInCart();
    await expect(itemCount).toEqual(totalUniqueItemsadded);

    const calculatedPrice = await inCartPage.getCartItemTotalprice();
    const totalPriceOnPage = await inCartPage.getCartTotalPrice();
    console.log("Calculated Price:", calculatedPrice);
    console.log("Total Price on Page:", totalPriceOnPage);

    await expect(calculatedPrice).toEqual(totalPriceOnPage);
  });
});
