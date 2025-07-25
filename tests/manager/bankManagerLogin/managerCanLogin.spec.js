import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {
  /* 
  Test:
  1. Open Wizard bank home page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
  2. Click [Bank Manager Login]
  3. Assert button [Add Customer] is visible
  4. Assert button [Open Account] is visible
  5. Assert button [Customers] is visible
  */
   const openAccount = new LoginPage(page);
   const managerPage = new BankManagerMainPage(page); 

   await openAccount.open();
   await openAccount.clickBankManagerLogin();
   await managerPage.assertManagerButtonsAreVisible();
});
