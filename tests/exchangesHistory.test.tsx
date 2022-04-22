import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExchangesHistory from "../src/pages/components/exchangesHistory/ExchangesHistory";

import { i18n } from "../src/translate/i18n";
import React from "react";
const { t } = i18n;

const testindId = "exchangesHistory";

describe("Exchanges history component testing", () => {
  it("should render the exchanges component", () => {
    const { getByTestId } = render(<ExchangesHistory />);
    const title = getByTestId(testindId);

    expect(title).toBeVisible();
  });

  it("should match the snapshot", () => {
    const { getByTestId } = render(<ExchangesHistory />);
    const title = getByTestId(testindId);

    expect(title).toMatchSnapshot();
  });

  // it("should delete an exchange when clicking on the button", async () => {
  //   const { findByTestId, debug } = render(<ExchangesHistory />);
  //   const deleteButton = (await findByTestId(
  //     "deleteButton"
  //   )) as HTMLDivElement | null;

  //   debug();

  //   fireEvent.click(deleteButton);
  // });
});
