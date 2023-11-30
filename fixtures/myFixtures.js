import { test as base } from "@playwright/test";
import { ReservationPage } from "../pageObjects/basePage/reservationPage";

export const test = base.extend({
  reservationPage: async ({ page }, use) => {
    const reservationPage = new ReservationPage(page);
    await use(reservationPage);
  },
});
