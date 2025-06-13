import { expect } from "@playwright/test";
import { url, baseURL } from "../data/url";

export class SwagLabsPage {
  constructor(page) {
    this.page = page;
  }

  async openMainPage() {
    await this.page.goto(baseURL);
  }

  async login(username, password) {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
    await expect(this.page).toHaveURL(url.inventoryPage);
  }
  
  async selectCheckbox(checkbox) {
    await this.page.getByTestId(checkbox).check();
    await expect(this.page.getByTestId(checkbox)).toBeChecked();
  }
}
