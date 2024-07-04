import test, { expect } from "@playwright/test";
import { deleteDives } from "./data-access/delete-dives";

test.afterEach(async () => {
  deleteDives();
});

test("required inputs", async ({ page }) => {
  await page.goto("/new-dive");

  await expect(page.getByTestId("dive-site-input")).toHaveAttribute("required");
  await expect(page.getByTestId("auto-complete-input")).toHaveAttribute(
    "required",
  );
});

test("reset location if nothing was selected", async ({ page }) => {
  await page.goto("/new-dive");

  await page.getByTestId("auto-complete-input").fill("Raja Ampat");

  await page.getByTestId("submit-button").click();

  await expect(page.getByTestId("auto-complete-input")).toHaveText("");
});
