// tests/sanityTests.spec.js
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { userData, userDataWithPasswordToCheckout } from "../data/users";
import { products } from "../data/products"; // הקובץ עם המוצרים

test("Full Sanity Test - Purchase Flow", async ({ page }) => {
  // שלב 1: התחברות
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.login("standard_user", userData["standard_user"]);
  await loginPage.expectLoginSuccess();

  // שלב 2: דף המוצרים והוספת מוצרים
  const inventoryPage = new InventoryPage(page);
  const productsToAdd = products.slice(0, 2); // בחר 2 מוצרים
  await inventoryPage.expectInventoryPage();
  await inventoryPage.addProductsByTestIds(productsToAdd);
  await inventoryPage.expectCartItemCount(productsToAdd.length);

  // שלב 3: מעבר לעגלה ואימות
  const cartPage = new CartPage(page);
  await cartPage.goToCart();
  await cartPage.expectCartPage();
  await cartPage.expectItemsCount(productsToAdd.length);

  // שלב 4: צ'קאאוט שלב ראשון
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  await checkoutStepOnePage.proceedToCheckoutStepOne();
  const { firstName, lastName, postalCode } = userDataWithPasswordToCheckout;
  await checkoutStepOnePage.fillCustomerInfo(firstName, lastName, postalCode);
  await checkoutStepOnePage.continueToCheckoutStepTwo();

  // שלב 5: צ'קאאוט שלב שני וסיום ההזמנה
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  await checkoutStepTwoPage.finishCheckout();

  // שלב 6: עמוד השלמת הזמנה ואימות חזרה לדף המוצרים
  const checkoutCompletePage = new CheckoutCompletePage(page);
  await checkoutCompletePage.backToProducts();
});

