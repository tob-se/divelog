import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";
import { deleteDives } from "../test-utils/data-access/delete-dives";
import { randomDive } from "@/test-utils/random-dive";
import { insertDiveDAO } from "@/test-utils/data-access/insert-dive-dao";
import { formatDate } from "@/lib/utils";
import { placesMock } from "@/test-utils/places-mock";

const dive = randomDive({ highlight: false });

test.beforeEach(async ({ request }) => {
  await deleteDives();
  await insertDiveDAO(dive);
  await request.post("/api/revalidate");
});

const comment = faker.lorem.lines();
const location = "Komodo";
const diveSite = "Barracuda Point";
const date = "2000-01-01";

test("edit dive", async ({ page }) => {
  await page.route("/api/autocomplete?input=*", async (route) => {
    await route.fulfill({ json: { data: placesMock } });
  });

  await page.goto(`/dives/${dive.id}/edit`);

  await page.getByTestId("highlight-switch").click();
  await page.getByTestId("date-input").fill(date);
  await page.getByTestId("auto-complete-input").clear();
  await page.getByTestId("auto-complete-input").fill(location);
  await page.getByTestId("auto-complete-item").nth(0).click();
  await page.getByTestId("dive-site-input").fill(diveSite);
  await page.getByTestId("comment").fill(comment);
  await page.getByTestId("afternoon-radio-item").click();
  await page.getByTestId("submit-button").click();

  // assert dive on dive page
  await expect(page.getByTestId("highlight")).toHaveCSS(
    "fill",
    "rgb(255, 215, 0)",
  );
  await expect(page.getByTestId("dive-title")).toHaveText("Dive #1");
  await expect(page.getByTestId("dive-site")).toHaveText(diveSite);
  await expect(page.getByTestId("comment")).toHaveText(comment);
  await expect(page.getByTestId("location")).toContainText(location);
  await expect(page.getByTestId("date-and-time")).toHaveText(formatDate(date));
  await expect(page.getByTestId("sunset-icon")).toBeVisible();

  // assert dive on home page
  await page.goto("/");
  await expect(page.getByTestId("last-dive-date")).toHaveText(formatDate(date));
  await expect(page.getByTestId("total-dives")).toHaveText("1");

  // assert dive on dives page
  await page.goto("/dives");
  await expect(page.getByTestId("dive-item-site")).toHaveText(
    "Barracuda Point",
  );
  await expect(page.getByTestId("dive-item-place")).toHaveText(location);
  await expect(page.getByTestId("dive-item-number")).toHaveText("#1");

  // assert dive on new-dive page
  await page.goto("/new-dive");
  await expect(page.getByTestId("auto-complete-input")).toHaveValue(location);
  await expect(page.getByTestId("dive-title")).toHaveText("Dive #2");
  await expect(page.getByTestId("morning-radio-item")).toBeChecked();
});
