import { ObservationDAO } from "@/infrastructure/observation-dao";
import test, { expect } from "@playwright/test";
import { deleteDives } from "../test-utils/data-access/delete-dives";
import { insertDiveDAO } from "../test-utils/data-access/insert-dive-dao";
import { insertObservationDAO } from "../test-utils/data-access/insert-observation-dao";
import { randomDive } from "../test-utils/random-dive";

const dive = randomDive();
const observation: ObservationDAO = {
  amount: 2,
  dive_id: dive.id,
  specie_id: 623966, // oceanic manta
};

test.beforeEach(async ({ request }) => {
  await deleteDives();
  await insertDiveDAO(dive);
  await insertObservationDAO(observation);
  await request.post("/api/revalidate");
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

  // assert amount on dive page
  await expect(page.getByTestId("amount")).toHaveText("10");
});

test("delete observation", async ({ page }) => {
  await page.goto(`/dives/${dive.id}/observations`);

  await expect(page.getByTestId("observation-list-item")).toHaveCount(1);

  await page.getByTestId("delete-observation-button").click();

  await expect(page.getByTestId("observation-list-item")).toHaveCount(0);

  await page.getByTestId("submit-button").click();

  // wait for dive page
  await page.waitForURL(`**/dives/${dive.id}`);
  await expect(page.getByTestId("dive-fallback")).not.toBeVisible();

  // assert observations on dive page
  await expect(page.getByTestId("observation-list-item")).toHaveCount(0);

  // assert observations on home page
  await page.goto("/");
  await expect(page.getByTestId("last-observation")).not.toBeVisible();
});
