import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Grid } from "./Grid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "../../mocks/server";
import { mswServerErrorResponse } from "../../mocks/handlers";
import { HttpResponse, http } from "msw";
import { FINANCIAL_INSTRUMENTS_URL } from "../../utilities/constants";

describe("grid", () => {
  const client = new QueryClient();

  const Wrapper = () => {
    return (
      <QueryClientProvider client={client}>
        <Grid />
      </QueryClientProvider>
    );
  };

  afterEach(() => {
    client.clear();
  });

  const fetchNewInstruments = vi.spyOn(client, "invalidateQueries");

  it("displays a grid and refreshes data", async () => {
    render(<Wrapper />);
    expect(await screen.findByTestId("grid-wrapper")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Refresh Data" }));
    expect(fetchNewInstruments).toHaveBeenCalled();
  });

  it("displays error messages from server", async () => {
    server.use(
      http.get(FINANCIAL_INSTRUMENTS_URL, () => mswServerErrorResponse)
    );
    render(<Wrapper />);

    expect(await screen.findByTestId("grid-wrapper")).toBeInTheDocument();
    expect(await screen.findByTestId("error")).toBeInTheDocument();
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Someone unplugged the back end"
    );
  });

  it("catches error if the endpoint is down", async () => {
    server.use(http.get(FINANCIAL_INSTRUMENTS_URL, () => HttpResponse.error()));
    render(<Wrapper />);

    expect(await screen.findByTestId("grid-wrapper")).toBeInTheDocument();
    expect(await screen.findByTestId("error")).toBeInTheDocument();
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Failed to fetch"
    );
  });
});
