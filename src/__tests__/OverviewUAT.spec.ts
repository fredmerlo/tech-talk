import { test, expect } from '@playwright/test';

test.describe('Overview Numbers and Virtual Numbers Lists Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  
    await page.fill('input[name="username"]', 'user1');
    await page.fill('input[name="password"]', 'password1');
    await page.click('button[type="submit"]');
  
  });

  test('should display mobile and virtual numbers sections with lists', async ({ page }) => {
    // Navigate to the page containing your component
    await page.waitForURL('http://localhost:3000/overview');
  
    // Check for "Mobile Numbers" heading
    const mobileNumbersHeading = page.locator('text=Mobile Numbers');
    await expect(mobileNumbersHeading).toBeVisible();

    // Check for "Virtual Numbers" heading
    const virtualNumbersHeading = page.locator('text=Virtual Numbers');
    await expect(virtualNumbersHeading).toBeVisible();

    // Check for presence of list items in MobileNumberList
    const mobileListItems = page.locator('ul#mobile li.MuiListItem-root');
    expect(await mobileListItems.count()).toBeGreaterThan(0); // Adjust the selector as needed

    // Check for presence of list items in VirtualNumberList
    const virtualListItems = page.locator('ul#virtual li.MuiListItem-root');
    expect(await virtualListItems.count()).toBeGreaterThan(0); // Adjust the selector as needed

  });
});