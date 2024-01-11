import { Locator, Page, expect } from "@playwright/test"

export default class ForgotPasswordPage {
  readonly page: Page
  readonly title: Locator
  readonly email: Locator
  readonly error: Locator
  readonly success: Locator
  readonly backBtn: Locator
  readonly submitFormBtn: Locator
  constructor(page: Page) {
    this.page = page
    this.title = this.page.locator(".page-title")
    this.email = this.page.locator("#input-email")
    this.error = this.page.locator(".alert-danger")
    this.success = this.page.locator(".alert-success")
    this.backBtn = this.page.getByRole("link", { name: " Back" })
    this.submitFormBtn = this.page.getByRole("button", { name: "Continue" })
  }

  async goto() {
    await this.page.goto("index.php?route=account/forgotten")
  }

  async enterEmail(email: string) {
    await this.email.fill(email)
  }

  async isSuccess() {
    await expect(this.page).toHaveURL("index.php?route=account/login")
    await expect(this.success).toHaveText(
      " An email with a confirmation link has been sent your email address."
    )
  }

  async getBackBtnHref() {
    return await this.backBtn.getAttribute("href")
  }

  async submitForm() {
    await this.submitFormBtn.click()
  }
}
