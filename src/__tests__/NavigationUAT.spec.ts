import { test, expect } from '@playwright/test';

test.describe('Navigation and Logout Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  
    await page.fill('input[name="username"]', 'user1');
    await page.fill('input[name="password"]', 'password1');
    await page.click('button[type="submit"]');
  
  });

  test('navigates to the Overview section', async ({ page }) => {
    await page.waitForURL('http://localhost:3000/overview');

    await page.click('text=Overview');
    await expect(page).toHaveURL('http://localhost:3000/overview'); // Adjust the URL based on your routing
  });

  test('navigates to the Charts section', async ({ page }) => {
    await page.waitForURL('http://localhost:3000/overview');

    await page.locator('a[href="/usage"]').click();
    await expect(page).toHaveURL('http://localhost:3000/usage'); // Adjust the URL based on your routing
  });

  test('performs logout', async ({ page }) => {
    await page.waitForURL('http://localhost:3000/overview');


    await page.click('text=Logout');
    await expect(page).toHaveURL('http://localhost:3000/login'); // Assuming the user is redirected to the homepage on logout
    // Additional checks can be added here to ensure the user is actually logged out
  });
});
