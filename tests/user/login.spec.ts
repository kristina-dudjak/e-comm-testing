import { expect, test } from "../../utils/fixtures"
const userData = JSON.parse(JSON.stringify(require("../../data/user.json")))

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto()
})

test.describe("Login page tests", () => {
  test("Log in with valid data", async ({ loginPage }) => {
    await loginPage.enterEmail(userData.user.email)
    await loginPage.enterPassword(userData.user.password)
    await loginPage.submitLoginForm()
    await loginPage.isNavigatedToAccountPage()
  })

  test("Continue button redirects to register page", async ({ loginPage }) => {
    expect(await loginPage.getRegisterLinkHref()).toEqual(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/register"
    )
  })

  test("Forgotten password button redirects to forgot password page", async ({
    loginPage,
  }) => {
    expect(await loginPage.getForgotPasswordLinkHref()).toEqual(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/forgotten"
    )
  })

  test("Display error message for empty email field", async ({ loginPage }) => {
    await loginPage.enterEmail("")
    await loginPage.submitLoginForm()
    expect(loginPage.invalidLoginError).toBeVisible()
  })

  test("Display error message for empty password field", async ({
    loginPage,
  }) => {
    await loginPage.enterPassword("")
    await loginPage.submitLoginForm()
    expect(loginPage.invalidLoginError).toBeVisible()
  })

  test("Display error message for too many login try-s", async ({
    loginPage,
  }) => {
    await loginPage.enterEmail("")
    await loginPage.submitLoginForm()
    expect(loginPage.invalidLoginError).toBeVisible()
  })
})
