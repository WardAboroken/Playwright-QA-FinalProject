// tests/sanityTests.spec.js
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

import { usersData } from "../data/usersDDT"; // קובץ הדאטה החדש בפורמט DDT
import { products } from "../data/products";

usersData.forEach((user) => {
  // נוודא שנבדק רק משתמש חוקי כמו standard_user
  if (user.username === "standard_user") {
    test(`Sanity Purchase Flow - User: ${user.username}`, async ({ page }) => {
      // שלב 1: התחברות
      const loginPage = new LoginPage(page);
      await loginPage.openLoginPage();
      await loginPage.login(user.username, user.password);
      await loginPage.expectLoginSuccess();

      // שלב 2: עמוד המוצרים
      const inventoryPage = new InventoryPage(page);
      const productsToAdd = products.slice(0, 2); // בחר 2 מוצרים
      await inventoryPage.expectInventoryPage();
      await inventoryPage.addProductsByTestIds(productsToAdd);
      await inventoryPage.expectCartItemCount(productsToAdd.length);

      // שלב 3: עגלת קניות
      const cartPage = new CartPage(page);
      await cartPage.goToCart();
      await cartPage.expectCartPage();
      await cartPage.expectItemsCount(productsToAdd.length);

      // שלב 4: מילוי פרטים
      const checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.proceedToCheckoutStepOne();
      await checkoutStepOnePage.fillCustomerInfo(
        user.firstName,
        user.lastName,
        user.postalCode
      );
      await checkoutStepOnePage.continueToCheckoutStepTwo();

      // שלב 5: סיום ההזמנה
      const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
      await checkoutStepTwoPage.finishCheckout();

      // שלב 6: חזרה לעמוד מוצרים
      const checkoutCompletePage = new CheckoutCompletePage(page);
      await checkoutCompletePage.backToProducts();
    });
  }
});
