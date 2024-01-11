import { expect, test } from "../../utils/fixtures"
const userData = JSON.parse(JSON.stringify(require("../../data/user.json")))

test.beforeEach(async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.goto()
})

test.describe("Forgot password page tests", () => {
  test("Page title equals: 'Forgot Your Password?'", async ({
    forgotPasswordPage,
  }) => {
    expect(forgotPasswordPage.title).toHaveText("Forgot Your Password?")
  })

  test("Display error message for empty email input", async ({
    forgotPasswordPage,
  }) => {
    await forgotPasswordPage.enterEmail("")
    await forgotPasswordPage.submitForm()
    expect(forgotPasswordPage.error).toHaveText(
      " Warning: The E-Mail Address was not found in our records, please try again!"
    )
  })

  test("Back button redirects to login page", async ({
    forgotPasswordPage,
  }) => {
    expect(await forgotPasswordPage.getBackBtnHref()).toEqual(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    )
  })

  test("Display success message for valid email input", async ({
    forgotPasswordPage,
  }) => {
    await forgotPasswordPage.enterEmail(userData.user.email)
    await forgotPasswordPage.submitForm()
    await forgotPasswordPage.isSuccess()
  })
})
