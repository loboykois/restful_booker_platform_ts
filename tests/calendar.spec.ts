import { test } from "../fixtures/myFixtures"
import { expect } from "@playwright/test";
import { fakeData } from "../tests/tools/fakeData";
// import { AdminPanelPage } from "../pageObjects/adminPage/adminPanelPage";

test.describe("Calendar tests", () => {
  test.beforeEach(async ({ reservationPage }) => {
    await reservationPage.navigate();
  });

  // test("login to admin panel", async ({ adminPanelPage }): Promise<void> => {
  //   await adminPanelPage.openAdminPanel();
  //   await adminPanelPage.loginAsAdmin();
  //   await adminPanelPage.deleteRooms()
  // });

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

    await expect(page.getByRole("dialog")).toBeVisible();
  });
});