import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test.describe('Login Tests', () => {

  test('should navigate to overview page after successful login', async ({ page }) => {
    // Given I am on the login page
    await page.goto('http://localhost:3000/');

    // When I type a valid username and password
    await page.fill('input[name="username"]', 'user1');
    await page.fill('input[name="password"]', 'password1');
    await page.click('button[type="submit"]');

    // Then I should see the overview page
    await page.waitForURL('http://localhost:3000/overview');
    const isOverviewVisible = await page.isVisible('text="Overview"');
    expect(isOverviewVisible).toBe(true);
  });

  test('should show an error message for invalid credentials', async ({ page }) => {
    // Given I am on the login page
    await page.goto('http://localhost:3000/');

    // When I type a valid username and an invalid password
    await page.fill('input[name="username"]', 'validUsername');
    await page.fill('input[name="password"]', 'invalidPassword');
    await page.click('button[type="submit"]');

    // Then I should see an error message on the login page
    await page.waitForSelector('.MuiAlert-message');
    const errorMessage = await page.textContent('.MuiAlert-message');
    expect(errorMessage).toBe('Invalid username or password');
  });
});