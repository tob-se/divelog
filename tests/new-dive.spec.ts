import { faker } from "@faker-js/faker";
import test, { expect } from "@playwright/test";
import { deleteDives } from "./data-access/delete-dives";

test.beforeEach(async ({ request }) => {
  await deleteDives();
  await request.post("/api/revalidate");
});

const comment = faker.lorem.lines();
const location = "Raja Ampat";
const diveSite = "Barracuda Point";

test("create new dive", async ({ page }) => {
  await page.goto("/new-dive");

  await page.getByTestId("highlight-switch").click();
  await page.getByTestId("auto-complete-input").fill(location);
  await page.getByTestId("auto-complete-item").nth(0).click();
  await page.getByTestId("dive-site-input").fill(diveSite);
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
  await expect(page.getByTestId("dive-site")).toHaveText(diveSite);
  await expect(page.getByTestId("comment")).toHaveText(comment);
  await expect(page.getByTestId("location")).toContainText(location);
  await expect(page.getByTestId("date-and-time")).toHaveText(
    new Date().toLocaleDateString(),
  );
  await expect(page.getByTestId("sunrise-icon")).toBeVisible();

  // assert dive on home page
  await page.goto("/");
  await expect(page.getByTestId("last-dive-date")).toHaveText(
    new Date().toLocaleDateString(),
  );
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
  await expect(page.getByTestId("noon-toggle")).toBeChecked();
});
