import { expect } from "@playwright/test";
import { url } from "../data/url";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator(".shopping_cart_link");
    this.cartTitle = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]'
    );
  }

  // ניווט לעמוד העגלה
  async openCart() {
    await this.page.goto(url.cartPage);
  }

  async expectCartPage() {
    // בדוק אם הגענו לעמוד העגלה
    await expect(this.page).toHaveURL(url.cartPage);
    await expect(this.cartTitle).toHaveText("Your Cart");
  }

  async expectItemsCount(expectedCount) {
    // בדוק אם מספר הפריטים בעגלה תואם לצפוי
    await expect(this.cartItems.first()).toBeVisible({ timeout: 5000 }); // המתן שהפריט הראשון יהיה נראה
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async goToCart() {
    // נווט לעמוד העגלה דרך האייקון
    await this.cartIcon.click();
    await this.expectCartPage();
  }

  async proceedToCheckout() {
    // נווט לעמוד הצ'קאאוט
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(url.checkoutStepOne);
  }

  async continueShopping() {
    // חזור לעמוד המוצרים
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL(url.inventoryPage);
  }
}
