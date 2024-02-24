import "@testing-library/jest-dom/vitest";
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeEach(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
