import { Locator, Page, expect } from "@playwright/test"

export default class RegisterPage {
  readonly page: Page
  readonly title: Locator
  readonly firstName: Locator
  readonly lastName: Locator
  readonly email: Locator
  readonly telephone: Locator
  readonly password: Locator
  readonly passwordConfirm: Locator
  readonly policyCheckbox: Locator
  readonly submitBtn: Locator
  readonly firstNameError: Locator
  readonly lastNameError: Locator
  readonly emailError: Locator
  readonly telephoneError: Locator
  readonly passwordError: Locator
  readonly passwordConfirmError: Locator
  readonly privacyError: Locator

  constructor(page: Page) {
    this.page = page
    this.title = this.page.locator(".page-title")
    this.firstName = this.page.locator("#input-firstname")
    this.lastName = this.page.locator("#input-lastname")
    this.email = this.page.locator("#input-email")
    this.telephone = this.page.locator("#input-telephone")
    this.password = this.page.locator("#input-password")
    this.passwordConfirm = this.page.locator("#input-confirm")
    this.policyCheckbox = this.page.getByText("I have read and agree to the ")
    this.submitBtn = this.page.getByRole("button", { name: "Continue" })
    this.firstNameError = this.page.getByText(
      "First Name must be between 1 and 32 characters!"
    )
    this.lastNameError = this.page.getByText(
      "Last Name must be between 1 and 32 characters!"
    )
    this.emailError = this.page.getByText(
      "E-Mail Address does not appear to be valid!"
    )
    this.telephoneError = this.page.getByText(
      "Telephone must be between 3 and 32 characters!"
    )
    this.passwordError = this.page.getByText(
      "Password must be between 4 and 20 characters!"
    )
    this.privacyError = this.page.getByText(
      " Warning: You must agree to the Privacy Policy!"
    )
    this.passwordConfirmError = this.page.getByText(
      "Password confirmation does not match password!"
    )
  }

  async goto() {
    await this.page.goto("index.php?route=account/register")
  }

  async enterFirstName(firstName: string) {
    await this.firstName.fill(firstName)
  }

  async enterLastName(lastName: string) {
    await this.lastName.fill(lastName)
  }

  async enterEmail(email: string) {
    await this.email.fill(email)
  }

  async enterTelephone(telephone: string) {
    await this.telephone.fill(telephone)
  }

  async enterPassword(password: string) {
    await this.password.fill(password)
  }

  async enterConfirmPassword(password: string) {
    await this.passwordConfirm.fill(password)
  }

  async agreeToPolicy() {
    await this.policyCheckbox.click()
  }

  async submitRegistrationForm() {
    await this.submitBtn.click()
  }

  async redirectToSuccessPage() {
    await expect(this.page).toHaveURL("index.php?route=account/success")
  }
}
