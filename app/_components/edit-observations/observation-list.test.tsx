import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import ObservationList from "./observation-list";
import ObservationProvider from "./observation-provider";

afterEach(() => {
  cleanup();
});

it("shows empty list when no observations are provided", async () => {
  render(
    <ObservationProvider>
      <ObservationList initialObservations={[]} />
    </ObservationProvider>,
  );

  expect(screen.getByTestId("empty-list")).toBeVisible();
});

it("shows initial observations", async () => {
  render(
    <ObservationProvider>
      <ObservationList
        initialObservations={[
          {
            amount: 1,
            specie: {
              id: 1,
              name: "Species 1",
              common_name: "Common Name 1",
              medium_url: "https://example.com/medium.jpg",
              square_url: "https://example.com/square.jpg",
              wikipedia_url: "https://example.com/wikipedia.html",
            },
          },
        ]}
      />
    </ObservationProvider>,
  );

  expect(screen.queryByTestId("empty-list")).not.toBeInTheDocument();
  expect(screen.getByTestId("observation-list-item")).toHaveTextContent(
    "Common Name 1Species 1",
  );
});
