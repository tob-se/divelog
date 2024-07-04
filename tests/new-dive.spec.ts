import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";
import { deleteDives } from "./data-access/delete-dives";

test.beforeEach(async ({ request }) => {
  await deleteDives();
  await request.post("/api/revalidate");
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

  // assert dive on dive page
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

  // assert dive on home
  await page.goto("/");
  await expect(page.getByTestId("last-dive-date")).toHaveText(
    new Date().toLocaleDateString(),
  );
  await expect(page.getByTestId("total-dives")).toHaveText("1");

  // assert dive on dives
  await page.goto("/dives");
  await expect(page.getByTestId("dive-item-site")).toHaveText(
    "Barracuda Point",
  );
  await expect(page.getByTestId("dive-item-place")).toHaveText("Raja Ampat");
  await expect(page.getByTestId("dive-item-number")).toHaveText("#1");
});
