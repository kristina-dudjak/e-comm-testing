import { test as base, expect as expectBase } from "@playwright/test"
import RegisterPage from "../pages/registerPage"

export const test = base.extend<{ registerPage: RegisterPage }>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page))
  },
})
export const expect = expectBase
