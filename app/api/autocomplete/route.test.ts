import { placesMock } from "@/test-utils/places-mock";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { NextRequest } from "next/server";
import { afterAll, afterEach, beforeAll, expect, it, vi } from "vitest";
import { GET } from "./route";

const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

afterAll(() => server.close());

it("returns suggestions", async () => {
  vi.stubEnv("GOOGLE_PLACES_API_KEY", "secret");

  server.use(
    http.post("https://places.googleapis.com/v1/places:autocomplete", () => {
      return HttpResponse.json({ suggestions: placesMock });
    }),
  );

  const request = new NextRequest("http://localhost?input=test", {
    method: "GET",
  });

  const response = await GET(request);

  expect(response.ok).toBeTruthy();

  const json = await response.json();
  expect(json.data).toEqual(placesMock);
});

it("returns error when api key is missing", async () => {
  server.use(
    http.post("https://places.googleapis.com/v1/places:autocomplete", () => {
      return HttpResponse.json({ suggestions: placesMock });
    }),
  );

  const request = new NextRequest("http://localhost?input=test", {
    method: "GET",
  });

  const response = await GET(request);
  expect(response.status).toBe(500);

  const json = await response.json();
  expect(json.error).toBe("Missing Google API Key");
});

it("returns error when google response is not ok", async () => {
  vi.stubEnv("GOOGLE_PLACES_API_KEY", "secret");

  server.use(
    http.post("https://places.googleapis.com/v1/places:autocomplete", () => {
      return new HttpResponse(null, {
        status: 404,
      });
    }),
  );

  const request = new NextRequest("http://localhost?input=test", {
    method: "GET",
  });

  const response = await GET(request);
  expect(response.status).toBe(500);

  const json = await response.json();
  expect(json.error).toBe("Recieved status: 404 from Google");
});

it("returns error when a network error occurs", async () => {
  vi.stubEnv("GOOGLE_PLACES_API_KEY", "secret");
  vi.stubGlobal("console", {
    error: vi.fn(),
  });

  server.use(
    http.post("https://places.googleapis.com/v1/places:autocomplete", () => {
      return HttpResponse.error();
    }),
  );

  const request = new NextRequest("http://localhost?input=test", {
    method: "GET",
  });

  const response = await GET(request);
  expect(response.status).toBe(500);

  const json = await response.json();
  expect(json.error).toBe("Error fetching autocomplete suggestions");
});
