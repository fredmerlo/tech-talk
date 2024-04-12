import { test, expect } from '@playwright/test';

test.describe('Chart Renderings and Titles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  
    await page.fill('input[name="username"]', 'user1');
    await page.fill('input[name="password"]', 'password1');
    await page.click('button[type="submit"]');
  
  });

  test('should display both charts with their titles', async ({ page }) => {
    // Navigate to the page containing your charts
    await page.waitForURL('http://localhost:3000/overview');

    await page.locator('a[href="/usage"]').click();
    await page.waitForURL('http://localhost:3000/usage'); // Adjust the URL based on your routing

    // Verify the first chart (Cost per Number) is rendered
    // This example assumes the chart renders an SVG element; adjust as needed for your implementation
    const costChart = page.locator('div#cost div svg');
    await expect(costChart).toBeVisible();

    // Verify the title for the first chart
    const costTitle = page.locator('text=Cost per Number');
    await expect(costTitle).toBeVisible();

    // Verify the second chart (Minutes per Number) is rendered
    const usageChart = page.locator('div#usage div svg ');
    await expect(usageChart).toBeVisible();

    // Verify the title for the second chart
    const usageTitle = page.locator('text=Minutes per Number');
    await expect(usageTitle).toBeVisible();
  });

  test('should display the chart data details list', async ({ page }) => {
    await page.waitForURL('http://localhost:3000/overview');

    await page.locator('a[href="/usage"]').click();
    await page.waitForURL('http://localhost:3000/usage'); // Adjust the URL based on your routing

    // This assumes list items are rendered with a specific class or within a specific container
    const mobileListItems = page.locator('table#detail tbody tr');
    expect(await mobileListItems.count()).toBeGreaterThan(0); // Adjust the selector as needed

  });
});
