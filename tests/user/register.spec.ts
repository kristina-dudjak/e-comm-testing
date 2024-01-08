import { expect } from "@playwright/test"
import { test } from "../../utils/fixtures"
import { faker } from "@faker-js/faker/locale/en"

test.beforeEach(async ({ registerPage }) => {
  await registerPage.goto()
})

test.describe("Register page tests", () => {
  test("Title equals 'Register Account'", async ({ registerPage }) => {
    expect(registerPage.title).toHaveText("Register Account")
  })

  test("Register a user with valid data", async ({ registerPage }) => {
    const password = faker.internet.password()
    await registerPage.enterFirstName(faker.person.firstName())
    await registerPage.enterLastName(faker.person.lastName())
    await registerPage.enterEmail(faker.internet.email())
    await registerPage.enterTelephone(faker.phone.number())
    await registerPage.enterPassword(password)
    await registerPage.enterConfirmPassword(password)
    await registerPage.agreeToPolicy()
    await registerPage.submitRegistrationForm()
    await registerPage.redirectToSuccessPage()
  })

  test("Display error message for empty first name field", async ({
    registerPage,
  }) => {
    await registerPage.submitRegistrationForm()
    expect(registerPage.firstNameError).toBeVisible()
  })

  test("Display error message for empty last name field", async ({
    registerPage,
  }) => {
    await registerPage.submitRegistrationForm()
    expect(registerPage.lastNameError).toBeVisible()
  })

  test("Display error message for empty email field", async ({
    registerPage,
  }) => {
    await registerPage.submitRegistrationForm()
    expect(registerPage.emailError).toBeVisible()
  })

  test("Display error message for empty telephone field", async ({
    registerPage,
  }) => {
    await registerPage.submitRegistrationForm()
    expect(registerPage.telephoneError).toBeVisible()
  })

  test("Display error message for empty password field", async ({
    registerPage,
  }) => {
    await registerPage.submitRegistrationForm()
    expect(registerPage.passwordError).toBeVisible()
  })

  test("Display error message for unchecked privacy checkbox", async ({
    registerPage,
  }) => {
    await registerPage.submitRegistrationForm()
    expect(registerPage.privacyError).toBeVisible()
  })

  test("Display error message for when password confirm does not match password", async ({
    registerPage,
  }) => {
    const password = faker.internet.password()
    await registerPage.enterPassword(password)
    await registerPage.submitRegistrationForm()
    expect(registerPage.passwordConfirmError).toBeVisible()
  })
})
