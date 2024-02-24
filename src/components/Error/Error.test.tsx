import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Error } from "./Error";

describe("Error", () => {
  it("renders an error message passed to it", () => {
    const message = "test error message";
    render(<Error message={message} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "An Error has been caught"
    );
    expect(screen.getByTestId("error")).toHaveTextContent(message);
  });
});
