import { fireEvent, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CurrencyHistory from "../src/pages/components/currencyHistory/CurrencyHistory";

const testindId = "currencyHistory";

describe("Exchanges history component testing", () => {
  beforeAll(() => {
    jest
      .spyOn(HTMLElement.prototype, "clientHeight", "get")
      .mockReturnValue(100);
    jest
      .spyOn(HTMLElement.prototype, "clientWidth", "get")
      .mockReturnValue(100);
  });

  it("should render the exchanges component", () => {
    const { getByTestId } = render(<CurrencyHistory />);
    const title = getByTestId(testindId);

    expect(title).toBeVisible();
  });

  it("should match the snapshot", () => {
    const { getByTestId } = render(<CurrencyHistory />);
    const title = getByTestId(testindId);

    expect(title).toMatchSnapshot();
  });

  it("should change the convertion type for the graphic", async () => {
    const { getByTestId } = render(<CurrencyHistory />);
    const currencySelector = getByTestId(
      "operationOrder"
    ) as HTMLSelectElement | null;

    fireEvent.change(currencySelector, { target: { value: "GBP to USD" } });

    expect(currencySelector.value).toBe("GBP to USD");
  });

  it("should change the history date for the graphic", async () => {
    const { getByTestId } = render(<CurrencyHistory />);
    const dateSelector = getByTestId("historyDate") as HTMLInputElement | null;

    fireEvent.change(dateSelector, { target: { value: "2022-04-10" } });

    expect(dateSelector.value).toBe("2022-04-10");
  });
});
