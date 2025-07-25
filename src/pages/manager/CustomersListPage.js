import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.tableRows = this.page.locator('table tbody tr');
    this.tableHeaders = this.page.locator('table thead th');

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async getLastCustomerRow() {
  return this.tableRows.last();
}

async getCustomerDataFromRow(row) {
  const cells = row.locator('td');
  return {
    firstName: await cells.nth(0).textContent(),
    lastName: await cells.nth(1).textContent(),
    postCode: await cells.nth(2).textContent(),
    accountNumber: await cells.nth(3).textContent(),
  };
  }

async assertLastCustomerMatches({ firstName, lastName, postCode }) {
  const row = await this.getLastCustomerRow();
  await expect(row).toContainText(firstName);
  await expect(row).toContainText(lastName);
  await expect(row).toContainText(postCode);
  const cells = row.locator('td');
  await expect(cells.nth(3)).toHaveText(''); 
  }
  async deleteCustomerByName(firstName, lastName) {
    const row = this.tableRows.filter({ hasText: `${firstName} ${lastName}` }).first();
    const deleteButton = row.locator('button');
    await deleteButton.click();
  }

  async assertCustomerNotPresent(firstName, lastName) {
    const matchingRows = this.tableRows.filter({ hasText: `${firstName} ${lastName}` });
    await expect(matchingRows).toHaveCount(0);
  }
  async searchCustomer(searchTerm) {
    const searchInput = this.page.locator('input[placeholder="Search Customer"]');
    await searchInput.fill(searchTerm);
}


}