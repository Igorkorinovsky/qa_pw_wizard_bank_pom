import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { LoginPage } from '../../../src/pages/manager/OpenAccountPage';


test('Assert manager can choose currencies for account', async ({ page }) => {
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */
   const openAccount = new LoginPage(page);
  

   await openAccount.goToOpenAccountPage();
   await openAccount.selectCurrency('Dollar');
   await openAccount.assertDropDownValue('Dollar'); 

   await openAccount.selectCurrency('Pound');
   await openAccount.assertDropDownValue('Pound');

   await openAccount.selectCurrency('Rupee');
   await openAccount.assertDropDownValue('Rupee');

});
