import { test, expect } from '@playwright/test';

test.describe('Header Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  
    await page.fill('input[name="username"]', 'user1');
    await page.fill('input[name="password"]', 'password1');
    await page.click('button[type="submit"]');
  
  });

  test('header displays correct information', async ({ page }) => {
    // Navigate to the page where the header is displayed
    // This might involve logging in first if the header is part of a protected route
    await page.waitForURL('http://localhost:3000/overview');
  
    // Optionally, log in to see the header, if required
    // await page.fill('#username', 'user');
    // await page.fill('#password', 'password');
    // await page.click('#login-button');
    // await page.waitForNavigation();
  
    // Check for the presence of the header elements and their text
    await expect(page.locator('text=Welcome,')).toHaveText(/Welcome, \w+/); // Checks if username is displayed
    await expect(page.locator('text=Primary Number:')).toBeVisible();
    await expect(page.locator('text=Total Usage:')).toHaveText(/Total Usage: \d+/); // Checks if total usage is displayed
    await expect(page.locator('text=Total Cost:')).toHaveText(/Total Cost: [$]\d+/); // Checks if total cost is displayed
  });
});