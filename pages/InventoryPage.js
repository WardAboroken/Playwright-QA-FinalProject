import { expect } from "@playwright/test";
import { url } from "../data/url";
import { productsToAdd } from "../data/products";

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.titleLocator = page.locator(".title");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartIcon = page.locator(".shopping_cart_link");
  }

  // ניווט לעמוד המוצרים
  async openInventoryPage() {
    await this.page.goto(url.inventoryPage);
  }
  // מעבר לעגלה
  async goToCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(url.cartPage);
    await expect(this.titleLocator).toHaveText("Your Cart");
  }

  // בדיקה שאכן הגענו לעמוד המוצרים
  async expectInventoryPage() {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveURL(url.inventoryPage);
    await expect(this.titleLocator).toHaveText("Products");
  }

  // הוספת מוצרים לעגלה לפי רשימת טסט-איידים
  async addProductsByTestIds(products = productsToAdd) {
    // חכה שכל המוצרים ייטענו
    await this.page.waitForSelector('[data-test^="add-to-cart"]', {
      timeout: 10000,
    });

    for (const product of products) {
      const button = this.page.locator(`[data-test="${product.testId}"]`);
      await button.waitFor({ state: "visible", timeout: 5000 }); // המתן שהכפתור יהיה נראה
      await button.click();
    }
  }

  // אימות מספר הפריטים בעגלה לפי האייקון
  async expectCartItemCount(expectedCount) {
    await expect(this.cartBadge).toHaveText(expectedCount.toString());
  }
}
