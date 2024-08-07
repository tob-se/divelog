import test, { expect } from "@playwright/test";
import { deleteDives } from "../test-utils/data-access/delete-dives";
import { insertDiveDAO } from "../test-utils/data-access/insert-dive-dao";
import { randomDive } from "../test-utils/random-dive";

test.beforeEach(async ({ request }) => {
  await deleteDives();
  await request.post("/api/revalidate");
});

test("new observations", async ({ page }) => {
  const dive = randomDive();
  await insertDiveDAO(dive);

  await page.goto(`/dives/${dive.id}/observations`);

  // add Hammerhead observation via dialog
  await page.getByTestId("search-input").fill("Scalloped Hammerhead");
  await page.getByTestId("specie-list-item").click();
  await page.getByTestId("amount-input").fill("2");
  await page.getByTestId("submit-observation-button").click();
  await page.getByTestId("clear-search-button").click();

  await expect(page.getByTestId("observation-list-item").first()).toContainText(
    "Hammerhead",
  );
  await expect(page.getByTestId("edit-observation-button").first()).toHaveText(
    "2",
  );

  // add Pikachu observation via button
  await page.getByTestId("search-input").fill("Pikachu");
  await page.getByTestId("add-observation-button").click();
  await page.getByTestId("clear-search-button").click();

  await expect(page.getByTestId("observation-list-item").last()).toContainText(
    "Pikachu",
  );
  await expect(page.getByTestId("edit-observation-button").last()).toHaveText(
    "1",
  );

  await page.getByTestId("submit-button").click();

  // assert observations on dive page
  await expect(page.getByTestId("observation-list-item").first()).toContainText(
    "Hammerhead",
  );
  await expect(page.getByTestId("amount").first()).toHaveText("2");
  await expect(page.getByTestId("observation-list-item").last()).toContainText(
    "Pikachu",
  );
  await expect(page.getByTestId("amount").last()).toHaveText("1");

  // assert observations on home page
  await page.goto("/");
  await expect(page.getByTestId("last-observation")).toContainText(
    "Hammerhead",
  );
});
