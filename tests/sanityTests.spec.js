// tests/sanityTests.spec.js
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { userData } from "../data/users";
import { productsToAdd } from "../data/products"; // הקובץ עם המוצרים

test("Full Sanity Test - Purchase Flow", async ({ page }) => {
  // שלב 1: התחברות
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.login("standard_user", userData["standard_user"]);
  await loginPage.expectLoginSuccess();

  // שלב 2: בדיקת דף המוצרים והוספת מוצרים
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.expectInventoryPage();
  await inventoryPage.addProductsByTestIds(productsToAdd);

  // שלב 3: מעבר לעגלה ואימות
  const cartPage = new CartPage(page);
  await cartPage.goToCart();
  await cartPage.expectCartPage();
  await cartPage.expectItemsCount(productsToAdd.length);

  // שלב 4: מעבר לצ'קאאוט שלב ראשון + מילוי פרטים
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.proceedToCheckoutStepOne();
  await checkoutPage.fillCustomerInfo("Test", "User", "12345");

  // שלב 5: סיום ההזמנה ואימות
  await checkoutPage.finishCheckout();
});
