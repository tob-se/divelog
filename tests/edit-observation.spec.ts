import { ObservationDAO } from "@/infrastructure/observation-dao";
import test, { expect } from "@playwright/test";
import { deleteDives } from "./data-access/delete-dives";
import { insertDiveDAO } from "./data-access/insert-dive-dao";
import { insertObservationDAO } from "./data-access/insert-observation-dao";
import { randomDive } from "./utils";

const dive = randomDive();
const observation: ObservationDAO = {
  amount: 2,
  dive_id: dive.id,
  specie_id: 623965, // mobula ray
};

test.beforeEach(async () => {
  await insertDiveDAO(dive);
  await insertObservationDAO(observation);
});

test.afterEach(async () => {
  deleteDives();
});

test("edit amount", async ({ page }) => {
  await page.goto(`/dives/${dive.id}/observations`);

  await expect(page.getByTestId("edit-observation-button")).toHaveText(
    observation.amount.toString(),
  );

  await page.getByTestId("edit-observation-button").click();
  await page.getByTestId("amount-input").fill("10");
  await page.getByTestId("submit-observation-button").click();

  await expect(page.getByTestId("edit-observation-button")).toHaveText("10");

  await page.getByTestId("submit-button").click();

  await expect(page.getByTestId("amount")).toHaveText("10");
});

test("delete observation", async ({ page }) => {
  await page.goto(`/dives/${dive.id}/observations`);

  await expect(page.getByTestId("observation-list-item")).toHaveCount(1);

  await page.getByTestId("delete-observation-button").click();

  await expect(page.getByTestId("observation-list-item")).toHaveCount(0);
});
