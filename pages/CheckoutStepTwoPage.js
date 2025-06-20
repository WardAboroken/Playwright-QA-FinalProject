import { expect } from "@playwright/test";
import { url } from "../data/url";

export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelBtn = page.locator('[data-test="cancel"]');
    this.completeHeader = page.locator(".complete-header");
  }

  async finishCheckout() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(url.checkoutComplete);
    await expect(this.pageTitle).toHaveText("Checkout: Complete!");
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }

  async clickCancel() {
    await this.cancelBtn.click();
    await expect(this.page).toHaveURL(url.inventoryPage);
  }
}
