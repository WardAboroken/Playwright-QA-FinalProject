// import { test, expect } from "@playwright/test";
// import { ExamplePage } from "../pages/SwagLabsPage";

// // #region ex1
//  // פיתרון 1
// test("Select 3 checkboxes out of 5", async ({ page }) => {
//   const examplePage = new ExamplePage(page);
//   await examplePage.openMainPage()

//   for (let i = 0; i < 3; i++) {
//     await examplePage.selectCheckbox(examplePage.checkboxFieldsArray[i]);
//   }
// });

//  // פיתרון 2
//  test("Select 3 checkboxes out of 5 - another solution", async ({ page }) => {
//   const examplePage = new ExamplePage(page);
//   await examplePage.openMainPage();

//   const usedIndexes = new Set();

//   while (usedIndexes.size < 3) {
//     let index = Math.floor(Math.random() * examplePage.checkboxFieldsArray.length);
//     if (!usedIndexes.has(index)) {
//       usedIndexes.add(index);
//       await examplePage.selectCheckbox(examplePage.checkboxFieldsArray[index]);
//     }
//   }
// });

// // #endregion ex1

// // #region ex2

// // #endregion ex2
