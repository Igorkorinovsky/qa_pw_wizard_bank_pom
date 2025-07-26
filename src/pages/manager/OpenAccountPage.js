import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.bankManagerLogin = page.getByRole('button', { name: 'Bank Manager Login' });
    this.currencyDropdown = page.locator('#currency');
    this.customerDropDown = page.locator('#userSelect');
    this.processButton = page.locator('button[type="submit"]');
  }

  async open() {
    await this.page.goto(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login'
    );
  }
  async goToOpenAccountPage() {
  await this.page.goto(
    'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount'
  );
}

  async clickBankManagerLogin() {
    await this.bankManagerLogin.click();
  }

  async selectCurrency(currencyName) {
    await this.currencyDropdown.selectOption(currencyName);
  }

  async assertDropDownValue(expectedValue) {
    const selectedOption = this.currencyDropdown.locator('option:checked');
    await expect(selectedOption).toHaveText(expectedValue);
  }
  async selectCustomer(customerName) {
    await this.customerDropDown.click();

  const options = await this.customerDropDown.locator('option').allTextContents();
  console.log('Available customers:', options);

  const normalize = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  const found = options.find(opt => normalize(opt) === normalize(customerName));

  if (!found) {
    throw new Error(`Customer "${customerName}" not found in dropdown!`);
  }

  await this.customerDropDown.selectOption({ label: found });



  }

  async clickProcess() {
    this.page.once('dialog', async (dialog) => {
      console.log('Alert message:', dialog.message());
      await dialog.accept();
    });

    await this.processButton.click();
  }

  async waitForCustomerOption(customerName) {
    await expect(this.customerDropDown.locator('option')).toContainText(customerName, { timeout: 5000 });
  }
}
