import { expect } from "@playwright/test";
import { url } from "../data/url";

export class CheckoutStepOnePage {
  constructor(page) {
    this.page = page;
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelBtn = page.locator('[data-test="cancel"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.pageTitle = page.locator(".title");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async proceedToCheckoutStepOne() {
    await this.page.goto(url.checkoutStepOne);
    await expect(this.page).toHaveURL(url.checkoutStepOne);
    await expect(this.pageTitle).toHaveText("Checkout: Your Information");
  }

  async fillCustomerInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToCheckoutStepTwo() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(url.checkoutStepTwo);
    await expect(this.pageTitle).toHaveText("Checkout: Overview");
  }

  async clickCancel() {
    await this.cancelBtn.click();
    await expect(this.page).toHaveURL(url.cartPage);
  }

  async expectErrorMessage(message) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }
}
