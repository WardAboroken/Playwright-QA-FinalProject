p# Final Playwright QA Project - Swag Labs 🧪

This is my final automation project written with [Playwright](https://playwright.dev/), designed to test the Swag Labs demo web app.  
The tests simulate user flows and cover both **positive** and **negative** login scenarios, **cart**, and **checkout**.

## 📁 Project Structure

```FINALPROJECT/
├── data/ → Static test data (usernames, URLs)
├── helpers/ → Optional: selectors or utility functions
├── pages/ → Page Object Model (POM) classes
├── tests/ → Test specs (login, cart, checkout, etc.)
├── playwright.config.js → Playwright configuration
├── README.md → This file 😄
```

---

## 🚀 How to Run the Tests

1. Install dependencies:
   npm install

2. Run all tests:
   npx playwright test

3. View HTML test report:
   npx playwright show-report

---

## ✅ Features Tested

- 🔐 Positive and negative login tests (including locked_out_user)
- 🛒 Add to cart flow and cart item verification
- 🧾 Checkout steps 1 & 2 with form validation
- 🎉 Final order confirmation and thank-you message

---

## 🔧 Technologies Used

- Playwright
- JavaScript (ES6)
- Node.js

---

## 🌐 App Under Test

[https://www.saucedemo.com/](https://www.saucedemo.com/)
