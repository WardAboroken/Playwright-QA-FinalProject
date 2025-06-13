import { expect } from "@playwright/test";
import { url } from "../data/url";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInputLocator = page.locator('[data-test="username"]');
    this.passwordInputLocator = page.locator('[data-test="password"]');
    this.loginButtonLocator = page.locator('[data-test="login-button"]');
    this.errorMessageLocator = page.locator('[data-test="error"]');
    this.titleLocator = page.locator(".title");
  }

  async openLoginPage() {
    await this.page.goto(url.loginPage);
  }

  async login(username, password) {
    await this.usernameInputLocator.fill(username);
    await this.passwordInputLocator.fill(password);
    await this.loginButtonLocator.click();
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL(url.inventoryPage);
    await expect(this.titleLocator).toHaveText("Products");
  }

  async expectLoginFailure(message) {
    await expect(this.errorMessageLocator).toBeVisible();
    await expect(this.errorMessageLocator).toHaveText(message);
  }
}
