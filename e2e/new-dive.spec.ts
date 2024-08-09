import { formatDate, todayWithoutTimezone } from "@/lib/utils";
import { mockData } from "@/test-utils/mock-data";
import test, { expect } from "@playwright/test";
import { deleteDives } from "../test-utils/data-access/delete-dives";

test.beforeEach(async ({ request }) => {
  await deleteDives();
  await request.post("/api/revalidate");
});

const location = "Komodo";
const diveSite = "Barracuda Point";

test("create dive with default values", async ({ page }) => {
  await page.route("/api/autocomplete?input=*", async (route) => {
    await route.fulfill({ json: { data: mockData.places } });
  });

  await page.goto("/new-dive");

  await page.getByTestId("auto-complete-input").fill(location);
  await page.getByTestId("auto-complete-item").nth(0).click();
  await page.getByTestId("dive-site-input").fill(diveSite);
  await page.getByTestId("submit-button").click();

  await page.waitForURL("**/observations");
  await page.getByTestId("back-button").click();

  // assert dive on dive page
  await expect(page.getByTestId("highlight")).not.toHaveCSS(
    "fill",
    "rgb(255, 215, 0)",
  );
  await expect(page.getByTestId("dive-title")).toHaveText("Dive #1");
  await expect(page.getByTestId("dive-site")).toHaveText(diveSite);
  await expect(page.getByTestId("comment")).not.toBeVisible();
  await expect(page.getByTestId("location")).toContainText(location);
  await expect(page.getByTestId("date-and-time")).toHaveText(
    formatDate(todayWithoutTimezone()),
  );
  await expect(page.getByTestId("sunrise-icon")).toBeVisible();

  // assert dive on home page
  await page.goto("/");
  await expect(page.getByTestId("last-dive-date")).toHaveText(
    formatDate(todayWithoutTimezone()),
  );
  await expect(page.getByTestId("total-dives")).toHaveText("1");

  // assert dive on dives page
  await page.goto("/dives");
  await expect(page.getByTestId("dive-item-site")).toHaveText(diveSite);
  await expect(page.getByTestId("dive-item-place")).toHaveText(location);
  await expect(page.getByTestId("dive-item-number")).toHaveText("#1");

  // assert dive on new-dive page
  await page.goto("/new-dive");
  await expect(page.getByTestId("auto-complete-input")).toHaveValue(location);
  await expect(page.getByTestId("dive-title")).toHaveText("Dive #2");
  await expect(page.getByTestId("noon-radio-item")).toBeChecked();
});
