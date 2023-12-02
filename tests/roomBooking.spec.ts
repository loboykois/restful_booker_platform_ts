import { test } from "../fixtures/myFixtures";
import { expect } from "@playwright/test";
import { fakeResponses } from "./tools/fakeResponses";

test.describe("Booking rooms Api tests", () => {

  test.describe("should catch all", () => {
    test("requests when page is loaded", async ({ page }) => {
      page.on("request", (request) => console.log(">>: " + request.method(), request.resourceType(), request.url()));
    });

    test("responses when page is loaded", async ({ page }) => {
      page.on("response", (response) => console.log("<<: ", response.status(), response.url()));
    });

    test.afterEach(async ({ page }): Promise<void> => {
      await page.goto("/");
    });
  });

  test.describe("should display", () => {
    test("empty Rooms field when an empty response is returned", async ({ reservationPage }) => {
      await reservationPage.sendResponse({ body: fakeResponses.noRooms });
      const rooms = await reservationPage.getRooms();

      expect(rooms.length).toBe(0);
    });

    test("error message when 500 status code is sended", async ({ reservationPage }) => {
      await reservationPage.abortResponse();
      const rooms = await reservationPage.getRooms();

      expect(rooms.length).toBe(0);
    });

    test("empty block with rooms when response has status code 500", async ({ reservationPage }) => {
      await reservationPage.sendResponse({
        status: 500,
        body: fakeResponses.doubleRoom,
      });
      const rooms = await reservationPage.getRooms();

      expect(rooms.length).toBe(0);
    });
  });
});