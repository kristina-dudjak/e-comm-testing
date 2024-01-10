import { test as base, expect as expectBase } from "@playwright/test"
import RegisterPage from "../pages/registerPage"
import LoginPage from "../pages/loginPage"

export const test = base.extend<{
  registerPage: RegisterPage
  loginPage: LoginPage
}>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
})
export const expect = expectBase
