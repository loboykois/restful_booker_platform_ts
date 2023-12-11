import { Locator } from "@playwright/test";
import { BookingFormFields } from "../hotel/hotel.model";

export class BookingForm {
  private readonly form: Locator;

  public constructor(roomContainer: Locator) {
    this.form = roomContainer.locator(".col-sm-4");
  }

  public async enterFirstName(value: string): Promise<void> {
    await this.form.locator(".room-firstname").fill(value);
  }
  public async enterLastName(value: string): Promise<void> {
    await this.form.locator(".room-lastname").fill(value);
  }
  public async enterEmail(value: string): Promise<void> {
    await this.form.locator(".room-email").fill(value);
  }
  public async enterPhone(value: string): Promise<void> {
    await this.form.locator(".room-phone").fill(value);
  }

  public async fillForm(formFields: BookingFormFields): Promise<void> {
    await this.form.locator(".room-firstname").fill(formFields.firstName ?? "");
    await this.form.locator(".room-lastname").fill(formFields.lastName ?? "");
    await this.form.locator(".room-email").fill(formFields.email ?? "");
    await this.form.locator(".room-phone").fill(formFields.phone ?? "");
  }

  public async confirmBooking(): Promise<void> {
    await this.form.locator("button:has-text('Book')").click();
  }

  public async cancelBooking(): Promise<void> {
    await this.form.locator("button:has-text('Cancel')").click();
  }

  public async getConfirmationWindow(): Promise<Locator> {
    return this.form.page().locator(".confirmation-modal");
  }

  public async getErrorMessageType(): Promise<Locator> {
    return this.form.locator(".alert-danger > p");
  }
}
