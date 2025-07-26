import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

let firstName;
let lastName;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */

  const addCustomer = new AddCustomerPage(page);
     firstName = faker.person.firstName();
     lastName = faker.person.lastName();
     const postCode = faker.location.zipCode(); 

  await addCustomer.open();
  await addCustomer.clickAddCustomerButton();
  await addCustomer.fillFirstName(firstName);
  await addCustomer.fillLastName(lastName);
  await addCustomer.fillPostCode(postCode);
  await addCustomer.clickAddCustomerButton();
});

test('Assert manager can delete customer', async ({ page }) => {

  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */

 
   const customersListPage = new CustomersListPage(page);
   const bankManagerMainPage = new BankManagerMainPage(page);
 
  
   await bankManagerMainPage.openCustomersPage(); 
   await customersListPage.deleteCustomerByName(firstName, lastName);
   await customersListPage.assertCustomerNotPresent(firstName, lastName);
   await page.reload();
   await customersListPage.assertCustomerNotPresent(firstName, lastName);
});

