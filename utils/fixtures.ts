import { test as base, expect as expectBase } from "@playwright/test"
import RegisterPage from "../pages/registerPage"
import LoginPage from "../pages/loginPage"
import ForgotPasswordPage from "../pages/forgotPasswordPage"

export const test = base.extend<{
  registerPage: RegisterPage
  loginPage: LoginPage
  forgotPasswordPage: ForgotPasswordPage
}>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page))
  },
})
export const expect = expectBase
