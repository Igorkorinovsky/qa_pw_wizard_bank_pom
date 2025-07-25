import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
//import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { LoginPage } from '../../../src/pages/manager/OpenAccountPage';

let firstName;
let lastName;
let fullName;


test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
    const addCustomer = new AddCustomerPage(page);
   
     firstName = faker.person.firstName();
     lastName = faker.person.lastName();
     fullName = `${firstName} ${lastName}`;

    const postCode = faker.location.zipCode(); 


  await addCustomer.open();
  //await addCustomer.clickAddCustomer();
  await addCustomer.fillFirstName(firstName);
  await addCustomer.fillLastName(lastName);
  await addCustomer.fillPostCode(postCode);
  await addCustomer.clickAddCustomerButton();
  console.log(`Created customer: ${fullName}`);

  await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
  const openAccount = new LoginPage(page);
 
  await openAccount.goToOpenAccountPage();
  //await openAccount.waitForCustomerOption(fullName);

  await openAccount.selectCustomer(fullName);
  await openAccount.selectCurrency('Dollar');
  await openAccount.clickProcess();

  await page.reload();

  const customersPage = new CustomersListPage(page);
  await customersPage.open();

  const lastRow = await customersPage.getLastCustomerRow();
  const customerData = await customersPage.getCustomerDataFromRow(lastRow);

  expect(customerData.firstName).toBe(firstName);
  expect(customerData.lastName).toBe(lastName);
  expect(customerData.accountNumber).not.toBe('');

});
