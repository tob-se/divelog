import { faker } from "@faker-js/faker";
import { randomDive } from "./utils";
import { createUTCDate } from "@/lib/utils";
import { deleteDives } from "./data-access/delete-dives";
import { insertDiveDAO } from "./data-access/insert-dive-dao";
import test, { expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.afterEach(async () => {
  deleteDives();
});

const comment = faker.lorem.lines();

test("create new dive", async ({ page }) => {
  await page.goto("/new-dive");

  await page.getByTestId("highlight-switch").click();
  await page.getByTestId("auto-complete-input").fill("Raja Ampat");
  await page.getByTestId("auto-complete-item").nth(0).click();
  await page.getByTestId("dive-site-input").fill("Barracuda Point");
  await page.getByTestId("comment").fill(comment);
  await page.getByTestId("submit-button").click();

  await page.waitForURL("**/observations");
  await page.getByTestId("back-button").click();

  await expect(page.getByTestId("highlight")).toHaveCSS(
    "fill",
    "rgb(255, 215, 0)",
  );
  await expect(page.getByTestId("dive-title")).toHaveText("Dive #1");
  await expect(page.getByTestId("dive-site")).toHaveText("Barracuda Point");
  await expect(page.getByTestId("comment")).toHaveText(comment);
  await expect(page.getByTestId("location")).toContainText("Raja Ampat");
  await expect(page.getByTestId("date-and-time")).toHaveText(
    new Date().toLocaleDateString(),
  );
  await expect(page.getByTestId("sunrise-icon")).toBeVisible();
});

test("new dive with previous dive in the morning", async ({ page }) => {
  const todayMorning = createUTCDate(new Date(), 6);
  const morningDive = randomDive(todayMorning);
  await insertDiveDAO(morningDive);

  await page.goto("/new-dive");

  await expect(page.getByTestId("auto-complete-input")).toHaveValue(
    morningDive.place_main_text,
  );
  await expect(page.getByTestId("noon-toggle")).toBeChecked();
});

test("new dive with previous dive at noon", async ({ page }) => {
  const todayNoon = createUTCDate(new Date(), 10);
  const noonDive = randomDive(todayNoon);
  await insertDiveDAO(noonDive);

  await page.goto("/new-dive");

  await expect(page.getByTestId("auto-complete-input")).toHaveValue(
    noonDive.place_main_text,
  );
  await expect(page.getByTestId("afternoon-toggle")).toBeChecked();
});

test("new dive with previous dive in the afternoon", async ({ page }) => {
  const todayAfternoon = createUTCDate(new Date(), 14);
  const afternoonDive = randomDive(todayAfternoon);
  await insertDiveDAO(afternoonDive);

  await page.goto("/new-dive");

  await expect(page.getByTestId("auto-complete-input")).toHaveValue(
    afternoonDive.place_main_text,
  );
  await expect(page.getByTestId("night-toggle")).toBeChecked();
});

test("new dive with previous dive yesterday", async ({ page }) => {
  const yesterdayAfternoon = createUTCDate(new Date(), 14);
  yesterdayAfternoon.setDate(yesterdayAfternoon.getDate() - 1);

  const afternoonDive = randomDive(yesterdayAfternoon);
  await insertDiveDAO(afternoonDive);

  await page.goto("/new-dive");

  await expect(page.getByTestId("auto-complete-input")).toHaveValue(
    afternoonDive.place_main_text,
  );
  await expect(page.getByTestId("morning-toggle")).toBeChecked();
});
