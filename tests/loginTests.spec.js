import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { userData } from "../data/users";
import { negativeUsersData } from "../data/negativeUsers";
import { negativeLoginMessages } from "../data/messages";

test("Positive login with standard_user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.login("standard_user", userData["standard_user"]);
  await loginPage.expectLoginSuccess();
});

test.describe("Positive login with all users", () => {
  const positiveUsers = Object.keys(userData).filter(
    (username) => username !== "locked_out_user"
  );

  positiveUsers.forEach((username) => {
    test(`Login test for ${username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.openLoginPage();
      await loginPage.login(username, userData[username]);
      await loginPage.expectLoginSuccess();
    });
  });
});

test("Negative login with locked_out_user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  // Find the test data for locked_out_user
  const lockedOutUser = negativeUsersData.find(
    (user) => user.username === "locked_out_user"
  );
  await loginPage.openLoginPage();
  await loginPage.login(lockedOutUser.username, lockedOutUser.password);
  await loginPage.expectLoginFailure(lockedOutUser.expectedMessage);
});

test.describe
  .only("Negative login tests with all possible negative users", () => {
  negativeUsersData.forEach((user, index) => {
    test(`Login Test [${index + 1}] - username: '${
      user.username || "[empty]"
    }'`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.openLoginPage();
      await loginPage.login(user.username, user.password);
      await loginPage.expectLoginFailure(user.expectedMessage);
    });
  });
});
