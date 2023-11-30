import { test } from "../fixtures/myFixtures";
import { expect } from "@playwright/test";
import { fakeResponses } from "./tools/fakeResponses";
import { fakeData } from "../tests/tools/fakeData";

test.describe("Booking rooms Api tests", () => {
  // requests & response interception

  test.describe("should catch all", () => {
    test("requests when page is loaded", async ({ page }) => {
      page.on("request", (request) => console.log(">>: " + request.method(), request.resourceType(), request.url()));
    });

    test("responses when page is loaded", async ({ page }) => {
      page.on("response", (response) => console.log("<<: ", response.status(), response.url()));
    });

    test.afterEach(async ({ page }) => {
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

test.describe("Calendar tests", () => {
  test.beforeEach(async ({ reservationPage }) => {
    await reservationPage.navigate();
  });

  test("should open room details when Book this room button was pressed", async ({ reservationPage }) => {
    const rooms = await reservationPage.getRooms();

    await rooms[0].book();

    await rooms[0].calendar.selectDateRange(13, 14);
  });

  test("should display the selected range when user selects dates to book", async ({ reservationPage }) => {
    const rooms = await reservationPage.getRooms();
    const targetRoom = await rooms[0];

    await targetRoom.book();
    await targetRoom.calendar.selectDateRange(5, 11);
    const reservedRange = await targetRoom.calendar.getReservedRange();

    await expect(reservedRange).toBeVisible();
  });

  test("should display confirmation window when user selects dates, fills form and press book", async ({
    reservationPage,
    page,
  }) => {
    const rooms = await reservationPage.getRooms();
    const targetRoom = await rooms[0];

    await targetRoom.book();
    await targetRoom.calendar.pressNext();
    await targetRoom.calendar.selectDateRange(27, 29);
    await targetRoom.form.enterFirstName(fakeData.firstName);
    await targetRoom.form.enterLastName(fakeData.lastName);
    await targetRoom.form.enterEmail(fakeData.email);
    await targetRoom.form.enterPhone(fakeData.phone);
    await targetRoom.form.confirmBooking();

    // const confirmationWindow = targetRoom.form.getConfirmationWindow();

    await expect(page.getByRole("dialog")).toBeVisible();
  });
});

test.describe("Room booking form tests", () => {
  test.beforeEach(async ({ reservationPage }) => {
    await reservationPage.navigate();
  });

  test("should display Booking Successful modal window when user has entered correct data", async ({
    reservationPage,
  }) => {
    const rooms = await reservationPage.getRooms();
    const targetRoom = await rooms[0];

    await targetRoom.book();
    await targetRoom.form.enterFirstName(fakeData.firstName);
    await targetRoom.form.enterLastName(fakeData.lastName);
    await targetRoom.form.enterEmail(fakeData.email);
    await targetRoom.form.enterPhone(fakeData.phone);
    await targetRoom.form.confirmBooking();

    const conformationWindow = await targetRoom.form.getConfirmationWindow();

    await expect(conformationWindow).toBeHidden();
  });

  test("test", async ({ reservationPage }) => {
    const rooms = await reservationPage.getRooms();
    const targetRoom = await rooms[0];

    await targetRoom.book();

    await targetRoom.form.fillForm({
      firstName: fakeData.firstName,
      lastName: fakeData.lastName,
      email: fakeData.email,
      phone: fakeData.phone,
    });
    await targetRoom.form.confirmBooking();

    const conformationWindow = await targetRoom.form.getConfirmationWindow();

    await expect(conformationWindow).toBeHidden();
  });
});
