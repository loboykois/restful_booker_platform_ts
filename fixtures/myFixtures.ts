import { test as base } from "@playwright/test";
import { ReservationPage } from "../pageObjects/basePage/reservationPage";
// import { AdminPanelPage } from "../pageObjects/adminPage/adminPanelPage";

// type MyPages = {
//   reservationPage: ReservationPage;
//   adminPanelPage: AdminPanelPage;
// }

// export const test = base.extend<MyPages>({
//   reservationPage: async ({page}, use) => {
//     const reservationPage = new ReservationPage(page);
//     await use (reservationPage);
//   },
//   adminPanelPage: async ({page}, use) => {
//     const adminPanelPage = new AdminPanelPage(page);
//     await use (adminPanelPage);
//   }
// })

export const test = base.extend({
  reservationPage: async ({ page }, use) => {
    const reservationPage = new ReservationPage(page);
    await use(reservationPage);
  },
});

function foo() {
  return null;
}
