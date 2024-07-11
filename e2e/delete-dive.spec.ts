import test, { expect } from "@playwright/test";
import { deleteDives } from "../test-utils/data-access/delete-dives";
import { insertDiveDAO } from "../test-utils/data-access/insert-dive-dao";
import { randomDive } from "../test-utils/random-dive";

const dive = randomDive();

test.beforeEach(async ({ request }) => {
  await deleteDives();
  await insertDiveDAO(dive);
  await request.post("/api/revalidate");
});

test("delete dive", async ({ page }) => {
  await page.goto(`/dives/${dive.id}`);
  await page.getByTestId("delete-button").click();

  // assert on dives page
  await page.waitForURL("**/dives");
  await expect(page.getByTestId("no-dives")).toBeVisible();

  // assert observations on home page
  await page.goto("/");
  await expect(page.getByTestId("last-dive-date")).not.toBeVisible();
});
