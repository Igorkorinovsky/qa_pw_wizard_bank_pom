import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
     this.customersButton = page.getByRole('button', { name: 'Customers' });
     this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
     this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
     this.deleteCustButton = page.getByRole('button', { name: 'Delete'});
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }
  async openCustomersPage() {
    await this.customersButton.click();
  }

  async openAddCustomerPage() {
    await this.addCustomerButton.click();
  }

  async openOpenAccountPage() {
    await this.openAccountButton.click();
  }
  async assertManagerButtonsAreVisible() {
  await expect(this.customersButton).toBeVisible();
  await expect(this.openAccountButton).toBeVisible();
  await expect(this.addCustomerButton).toBeVisible();
}
async deleteCust() {
    await this.deleteCustButton.click();
  }

}