import { test } from "../fixtures/myFixtures";
import { expect } from "@playwright/test";
import { fakeData } from "./tools/fakeData";

test.describe("Room booking form tests", () => {
  test.beforeEach(async ({ reservationPage }) => {
    await reservationPage.navigate();
  });

  test("should display Booking Successful modal window when user has entered correct data", async ({ reservationPage }) => {
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

  test("shouldn't display confirmation window when no booking date is selected", async ({ reservationPage }) => {
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
