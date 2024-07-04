import test, { expect } from "@playwright/test";
import { deleteDives } from "./data-access/delete-dives";
import { insertDiveDAO } from "./data-access/insert-dive-dao";
import { randomDive } from "./utils";

test.afterEach(async () => {
  deleteDives();
});

test("new observations", async ({ page }) => {
  const morningDive = randomDive();
  await insertDiveDAO(morningDive);

  await page.goto(`/dives/${morningDive.id}/observations`);

  await page.getByTestId("search-input").fill("Hammerhead");
  await page.getByTestId("specie-list-item").nth(1).click();
  await page.getByTestId("amount-input").fill("2");
  await page.getByTestId("submit-observation-button").click();

  await expect(page.getByTestId("observation-list-item").first()).toContainText(
    "Hammerhead",
  );
  await expect(page.getByTestId("edit-observation-button").first()).toHaveText(
    "2",
  );

  await page.getByTestId("search-input").fill("Pikachu");
  await page.getByTestId("specie-list-item").first().click();
  await page.getByTestId("submit-observation-button").click();

  await expect(page.getByTestId("observation-list-item").last()).toContainText(
    "Pikachu",
  );
  await expect(page.getByTestId("edit-observation-button").last()).toHaveText(
    "1",
  );

  await page.getByTestId("submit-button").click();

  await expect(page.getByTestId("observation-list-item").first()).toContainText(
    "Hammerhead",
  );
  await expect(page.getByTestId("amount").first()).toHaveText("2");
  await expect(page.getByTestId("observation-list-item").last()).toContainText(
    "Pikachu",
  );
  await expect(page.getByTestId("amount").last()).toHaveText("1");
});
