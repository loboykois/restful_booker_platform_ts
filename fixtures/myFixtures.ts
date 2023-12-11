import { test as base } from "@playwright/test";
import { ReservationPage } from "../pageObjects/basePage/reservationPage";

type MyPages = {
  reservationPage: ReservationPage;
};

export const test = base.extend<MyPages>({
  reservationPage: async ({ page }, use) => {
    const reservationPage = new ReservationPage(page);
    await use(reservationPage);
  },
});
