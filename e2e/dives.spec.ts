import test, { expect } from "@playwright/test";
import { deleteDives } from "../test-utils/data-access/delete-dives";
import { insertDivesDAO } from "../test-utils/data-access/insert-dives-dao";
import { randomDive } from "../test-utils/random-dive";

const dives = Array.from({ length: 25 }, randomDive)
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .map((dive, i) => {
    if (i < 10) {
      dive.dive_site = "Barracuda Point";
      dive.place_main_text = "Raja Ampat";
    } else {
      dive.dive_site = "Manta Point";
      dive.place_main_text = "Komodo";
    }

    return dive;
  });

test.beforeEach(async ({ request }) => {
  await deleteDives();
  await insertDivesDAO(dives);
  await request.post("/api/revalidate");
});

test("dive pagination and filtering", async ({ page }) => {
  await page.goto("/dives");

  await expect(page.getByTestId("dive-item")).toHaveCount(15);

  // assert next page
  await page.getByLabel("Go to next page").click();
  await expect(page.getByTestId("dive-item")).toHaveCount(10);

  // search for barracuda
  await page.getByTestId("search-input").fill("Barracuda");
  await expect(page.getByTestId("dive-item")).toHaveCount(10);

  // search for Manta
  await page.getByTestId("search-input").fill("Manta");
  await expect(page.getByTestId("dive-item")).toHaveCount(15);

  // search for Raja Ampat
  await page.getByTestId("search-input").fill("Raja Ampat");
  await expect(page.getByTestId("dive-item")).toHaveCount(10);

  // search for Komodo
  await page.getByTestId("search-input").fill("Komodo");
  await expect(page.getByTestId("dive-item")).toHaveCount(15);

  // search for non existent
  await page.getByTestId("search-input").fill("Alor");
  await expect(page.getByTestId("empty-list")).toBeVisible();
});
