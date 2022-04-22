import { fireEvent, render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "../src/pages/index";

import { i18n } from "../src/translate/i18n";
import React from "react";
const { t } = i18n;

const testindId = "currencyHistory";

describe("Exchanges history component testing", () => {
  it("Should set value to state when input is changed", () => {
    const { getByTestId } = render(<Home />);
    const selector = getByTestId("langSelector");
    fireEvent.change(selector, {
      target: { value: "foo" },
    });
    expect(selector).toBeVisible();
  });
});
