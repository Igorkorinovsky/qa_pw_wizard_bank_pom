import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstnameField = page.getByPlaceholder('First Name');
    this.lastnameField = page.getByPlaceholder('Last Name');
    this.postcodeField = page.getByPlaceholder('Post Code');
    this.addcustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.submitButton = this.page.locator('form').getByRole('button', { name: 'Add Customer' });
  
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
  async fillFirstName(name) {
  await this.page.getByPlaceholder('First Name').fill(name);
}
  async fillLastName(name) {
  await this.page.getByPlaceholder('Last Name').fill(name);
}
  async fillPostCode(code) {
  await this.page.getByPlaceholder('Post Code').fill(code);
}
  async clickAddCustomer() {
  await this.addcustomerButton.first().click();

}
 // async clickAddCustomerButton() {
  //await this.page.locator('form').getByRole('button', { name: 'Add Customer' }).click();
  async clickAddCustomerButton() {
  await this.submitButton.click();
}

}
