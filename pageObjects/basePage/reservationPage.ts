import { Page } from "@playwright/test";
import { Room } from "../hotel/room";
import { routes } from "../../tests/tools/routes";
import { ResponseParams } from "./reservationPage.model";

export class ReservationPage {
  public constructor(private readonly page: Page) {}

  public async navigate(): Promise<void> {
    await this.page.goto("/");
  }

  public async getRooms(): Promise<Room[]> {
    const rooms = await this.page.locator(".container-fluid > div:not([class])").all();

    return rooms.map((i) => new Room(i));
  }

  public async sendResponse(responseParams: ResponseParams): Promise<void> {
    await this.page.route(routes.rooms, (route) =>
      route.fulfill({
        status: responseParams.status ?? 200,
        contentType: "application/json",
        body: JSON.stringify(responseParams.body),
      }),
    );

    await this.page.goto("/");
  }

  public async abortResponse(): Promise<void> {
    await this.page.route(routes.rooms, (route) => route.abort());
  }

  public async fulfillAbortResponse(): Promise<void> {
    await this.page.route(routes.rooms, (route) => route.fulfill({ status: 500 }));
  }
}
