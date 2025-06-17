import { expect } from "@playwright/test";
import { url } from "../data/url";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator(".shopping_cart_link");
    this.cartTitle = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async expectCartPage() {
    await expect(this.page).toHaveURL(url.cartPage);
    await expect(this.cartTitle).toHaveText("Your Cart");
  }

  async expectItemsCount(expectedCount) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }
}
