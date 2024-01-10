import { Locator, Page, expect } from "@playwright/test"

export default class LoginPage {
  readonly page: Page
  readonly email: Locator
  readonly password: Locator
  readonly submitBtn: Locator
  readonly emailError: Locator
  readonly passwordError: Locator
  readonly registerLink: Locator
  readonly forgotPasswordLink: Locator
  readonly invalidLoginError: Locator

  constructor(page: Page) {
    this.page = page
    this.email = this.page.locator("#input-email")
    this.password = this.page.locator("#input-password")
    this.submitBtn = this.page.getByRole("button", { name: "Login" })
    this.emailError = this.page.getByText(
      "E-Mail Address does not appear to be valid!"
    )
    this.passwordError = this.page.getByText(
      "Password must be between 4 and 20 characters!"
    )
    this.registerLink = this.page.getByRole("link", { name: "Continue" })
    this.forgotPasswordLink = this.page.getByRole("link", {
      name: "Forgotten Password",
      exact: true,
    })
    this.invalidLoginError = this.page.locator(".alert-danger")
  }

  async goto() {
    await this.page.goto("index.php?route=account/login")
  }

  async enterEmail(email: string) {
    await this.email.fill(email)
  }

  async enterPassword(password: string) {
    await this.password.fill(password)
  }

  async submitLoginForm() {
    await this.submitBtn.click()
  }

  async isNavigatedToAccountPage() {
    await expect(this.page).toHaveURL("index.php?route=account/account")
  }

  async getRegisterLinkHref() {
    return await this.registerLink.getAttribute("href")
  }

  async getForgotPasswordLinkHref() {
    return await this.forgotPasswordLink.getAttribute("href")
  }
}
