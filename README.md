## spree-playwright-challenge

# Overview
This project contains automated end-to-end testing for spree e-commerce demo site - checkout flow using Playwright.

# Tech Stack
- Playwright
- TypeScript

# Project Structure
library/
- pages/        -> Page Objects
- components/   -> UI Components
- types/        -> Shared TypeScript Types
- utilities/    -> Helper Utilities

tests/
- checkout.spec.ts  -> End-to-end checkout test

.github/workflows -> GitHub Action

# Running the Test
Install dependencies:
```bash
npm install

Run test in headless:
```bash
npx playwright text

Run test in headed:
```bash
npx playwright test --headed