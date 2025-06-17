import { expect } from "@playwright/test";
import { url } from "../data/url";
import { productsToAdd } from "../data/products";

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.titleLocator = page.locator(".title");
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  // ניווט לעמוד המוצרים
  async openInventoryPage() {
    await this.page.goto(url.inventoryPage);
  }

  // בדיקה שאכן הגענו לעמוד המוצרים
  async expectInventoryPage() {
    await expect(this.page).toHaveURL(url.inventoryPage);
    await expect(this.titleLocator).toHaveText("Products");
  }

  // הוספת מוצרים לעגלה לפי רשימת טסט-איידים
  async addProductsByTestIds(products = productsToAdd) {
    for (const product of products) {
      await this.page.getByTestId(product.testId).click();
    }
  }

  // אימות מספר הפריטים בעגלה לפי האייקון
  async expectCartItemCount(expectedCount) {
    await expect(this.cartBadge).toHaveText(expectedCount.toString());
  }
}
