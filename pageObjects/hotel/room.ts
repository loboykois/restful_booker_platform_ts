import { Calendar } from "./calendar";
import { BookingForm } from "./bookingForm";
import { Locator } from "@playwright/test";

export class Room {
  private readonly roomContainer: Locator;
  private readonly details: Locator;
  public readonly calendar: Calendar;
  public readonly form: BookingForm;

  public constructor(roomContainer: Locator) {
    this.roomContainer = roomContainer;
    this.details = this.roomContainer.locator(".hotel-room-info").first();
    const bookingContainer = this.roomContainer.locator(".hotel-room-info").last();
    this.calendar = new Calendar(bookingContainer);
    this.form = new BookingForm(bookingContainer);
  }

  public async book(): Promise<void> {
    await this.roomContainer.locator("button:text('Book this room')").click();
  }

  public async getRoomDetails(): Promise<Locator> {
    return this.roomContainer.locator(".hotel-room-info").last();
  }
}
