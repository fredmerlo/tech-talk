import { test, expect } from '@playwright/test';

test.describe('Virtual Numbers Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  
    await page.fill('input[name="username"]', 'user1');
    await page.fill('input[name="password"]', 'password1');
    await page.click('button[type="submit"]');
  
  });

  test('should allow adding a new virtual number', async ({ page }) => {
    // Navigate to the page containing your component
    await page.waitForURL('http://localhost:3000/overview');

    // Click "Add New Virtual Number" button
    await page.click('text=ADD NEW VIRTUAL NUMBER'); // Adjust the text if your button says something different

    // Fill in the modal form and submit a new number
    // Assuming there's an input field within the modal, and a submit button
    await page.fill('input#number', '424-456-0789'); // Use a test number
    await page.click('text=ADD NUMBER'); // Adjust the text if your button says something different

    // Verify the new number appears in the list
    await expect(page.locator('text=424-456-0789')).toBeVisible();
  });

  test('adding an existing virtual number displays an error', async ({ page }) => {
    // Navigate to the page containing your component
    await page.waitForURL('http://localhost:3000/overview');
  
    // The virtual number you're trying to add, which already exists
    const existingNumber = '123-456-7890';
  
    // Open the modal to add a new virtual number
    await page.click('text=ADD NEW VIRTUAL NUMBER');
  
    // Attempt to add a virtual number that already exists
    await page.fill('input#number', existingNumber); // Adjust the selector as needed
    await page.click('text=ADD NUMBER'); // Adjust the text if your button says something different
  
    // Check for the presence of the error message indicating the number already exists
    // Adjust the error message text to match what your application displays
    const errorMessageLocator = page.locator('div.MuiAlert-message');
    await expect(errorMessageLocator).toHaveText('Virtual number already exists');
  });

  test('should allow deleting a virtual number', async ({ page }) => 
  {
    await page.waitForURL('http://localhost:3000/overview');
    // Assuming there's at least one number in the list and it has a delete button
    // Click the "Delete" button next to the first number in the list
    await page.click('ul#virtual li button:has-text("DELETE"):left-of(:text("234-567-8901"))');

    // Confirm the deletion in the confirmation dialog
    await page.click('text=CONFIRM'); // Adjust the text if your confirmation button says something different

    // Verify the number is removed from the list
    await expect(page.locator('text=234-567-8901')).not.toBeVisible();
  });
});
