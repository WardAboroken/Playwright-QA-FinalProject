import { expect } from "@playwright/test";
import { url } from "../data/url";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.pageTitle = page.locator(".title");
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator(".complete-header");
  }

  async proceedToCheckoutStepOne() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(url.checkoutStepOne);
    await expect(this.pageTitle).toHaveText("Checkout: Your Information");
  }

  async fillCustomerInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await expect(this.page).toHaveURL(url.checkoutStepTwo);
    await expect(this.pageTitle).toHaveText("Checkout: Overview");
  }

  async finishCheckout() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(url.checkoutComplete);
    await expect(this.pageTitle).toHaveText("Checkout: Complete!");
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }
}
