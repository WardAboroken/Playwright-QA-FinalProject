import { expect } from "@playwright/test";
import { url } from "../data/url";

export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.pageTitle = page.locator(".title");
  }

  async openCheckoutCompletePage() {
    await this.page.goto(url.checkoutComplete);
    await expect(this.page).toHaveURL(url.checkoutComplete);
    await expect(this.pageTitle).toHaveText("Checkout: Complete!");
    await expect(this.page.locator(".complete-header")).toHaveText(
      "Thank you for your order!"
    );
  }

  async backToProducts() {
    await this.backHomeButton.click();
    await expect(this.page).toHaveURL(url.inventoryPage);
    await expect(this.pageTitle).toHaveText("Products");
  }
}
