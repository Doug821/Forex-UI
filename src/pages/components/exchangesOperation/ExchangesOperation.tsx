import { useEffect, useState } from "react";
import { socket } from "../../index";
import { i18n } from "../../../translate/i18n";
import useDebounce from "../../../../services/useDebounce";
import styles from "./exchangesOperation.module.css";

export default function ExchangesOperation() {
  const [firstCurrency, setFirstCurrency] = useState("GBP");
  const [lastCurrency, setLastCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [receive, setReceive] = useState(0);
  const [currencyRate, setCurrencyRate] = useState(0);

  const debouncedTerm = useDebounce(amount, 500);

  const { t } = i18n;

  useEffect(() => {
    if (debouncedTerm === 0) {
      setReceive(0);
    }

    if (debouncedTerm) {
      const currencyData = {
        amount: debouncedTerm,
        operation: `${firstCurrency}_${lastCurrency}`,
      };
      socket.emit("convert", currencyData);
    }

    socket.on("receive", (currencyData) => {
      setReceive(currencyData.exchange);
      setCurrencyRate(currencyData.baseRate);
    });
  }, [debouncedTerm, firstCurrency, lastCurrency]);

  useEffect(() => {
    if (firstCurrency === "GBP") {
      setLastCurrency("USD");
    } else if (firstCurrency === "USD") {
      setLastCurrency("GBP");
    }
  }, [firstCurrency]);

  return (
    <div
      data-testid="exchangesOperation"
      className={styles.exchangesOperationContainer}
    >
      <h1 className={styles.exchangesOperationTitle}>
        {t<string>("titles.exchanges")}
      </h1>
      <div className={styles.exchangesField}>
        <p>{t<string>("messages.youSend")}</p>
        <div className={styles.inputContainer}>
          <input
            data-testid="amount"
            className={styles.exchangeInput}
            type="number"
            min="0"
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
          <select
            data-testid="firstCurrency"
            className={styles.exchangeSelect}
            name="operation"
            id="operationSelect1"
            value={firstCurrency}
            onChange={(e) => {
              setFirstCurrency(e.target.value);
            }}
          >
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      <div className={styles.exchangesField}>
        <p>{t<string>("messages.youReceive")}</p>
        <div className={styles.inputContainer}>
          <input
            className={styles.exchangeInput}
            type="number"
            min="0"
            readOnly
            value={receive.toFixed(2)}
          />
          <select
            data-testid="lastCurrency"
            className={styles.exchangeSelect}
            name="operation"
            id="operationSelect2"
            value={lastCurrency}
            onChange={(e) => {
              setLastCurrency(e.target.value);
            }}
          >
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <p className={styles.currencyRate}>
          {`1.00 ${firstCurrency} = ${currencyRate.toFixed(2)} ${lastCurrency}`}
        </p>
      </div>
      <button
        className={styles.exchangeButton}
        type="button"
        onClick={() => handleExchanges(amount, firstCurrency, lastCurrency)}
      >
        {t<string>("buttons.exchange")}
      </button>
    </div>
  );
}

export function handleExchanges(
  amount: number,
  firstCurrency: string,
  lastCurrency: string
) {
  if (amount > 0) {
    const currencyData = {
      amount,
      operation: `${firstCurrency}_${lastCurrency}`,
    };
    socket.emit("exchange", currencyData);
  }
}
