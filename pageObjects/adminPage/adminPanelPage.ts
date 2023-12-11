import { Locator, Page } from "@playwright/test";

export class AdminPanelPage {
  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;

  public constructor(private readonly page: Page) {
    this.userName = page.locator("#username");
    this.password = page.locator("#password");
    this.loginButton = page.locator("button:text('Login')");
  }

  public async openAdminPanel(): Promise<void> {
    await this.page.goto("/");
    await this.page.locator(".text-muted > a:has-text('Admin panel')").click();
  }

  public async loginAsAdmin(): Promise<void> {
    await this.userName.fill("admin");
    await this.password.fill("password");
    await this.loginButton.click();
  }

  public async deleteRooms(): Promise<void> {
    const room = await this.page.locator("[data-type='room']").all();

    room.map((i) => i.locator(".col-sm-1 .roomDelete ::before").click());
  }
}
