/// <reference types="vitest/globals" />
import { insertDives } from "@/infrastructure/data-access/insert-dives";
import { DiveDAO } from "@/infrastructure/dive-dao";
import { initMockDb } from "@/test/mock-db";
import { randomDive } from "@/test/utils";
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import Home from "./page";

const dives: DiveDAO[] = [randomDive()];

beforeAll(async () => {
  await initMockDb();
  await insertDives(dives);
});

test("check date", async () => {
  render(
    <Suspense>
      <Home />
    </Suspense>,
  );

  await screen.findByText(dives[0].date.toLocaleDateString());
});
