import { randomUUID } from "crypto";
import test, { expect } from "@playwright/test";

test("dive not found", async ({ page }) => {
  await page.goto(`/dives/${randomUUID()}`);

  await expect(page.getByTestId("not-found")).toBeVisible();
});
