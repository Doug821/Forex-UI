import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExchangesOperation from "../src/pages/components/exchangesOperation/ExchangesOperation";

import { i18n } from "../src/translate/i18n";
import React from "react";
const { t } = i18n;
const testingId = "exchangesOperation";

describe("Mock trading exchanges testing", () => {
  it("should render the exchanges component", () => {
    const { getByTestId } = render(<ExchangesOperation />);

    const title = getByTestId(testingId);

    expect(title).toBeVisible();
  });

  it("should match the snapshot", () => {
    const { getByTestId } = render(<ExchangesOperation />);
    const title = getByTestId(testingId);

    expect(title).toMatchSnapshot();
  });

  it("should change the amount when the input value is changed", () => {
    const { getByTestId } = render(<ExchangesOperation />);
    const amount = getByTestId("amount") as HTMLInputElement | null;

    fireEvent.change(amount, { target: { value: 10 } });

    expect(amount.value).toBe("10");
  });

  it("should change the states on select the first currency", async () => {
    const { getByTestId } = render(<ExchangesOperation />);
    const firstCurrency =  getByTestId(
      "firstCurrency"
    ) as HTMLSelectElement | null;

    fireEvent.change(firstCurrency, { target: { value: "USD" } });

    expect(firstCurrency.value).toBe("USD");
  });

  it("should change the states on select the first currency", () => {
    const { getByTestId } = render(<ExchangesOperation />);
    const lastCurrency = getByTestId(
      "lastCurrency"
    ) as HTMLSelectElement | null;

    fireEvent.change(lastCurrency, { target: { value: "USD" } });

    expect(lastCurrency.value).toBe("USD");
  });

  it("should create a new exchange when clicking on the button", () => {
    const { getByRole } = render(<ExchangesOperation />);
    const lastCurrency = getByRole("button") as HTMLButtonElement | null;

    fireEvent.click(lastCurrency);
  });
});
