import { useEffect, useState } from "react";
import { socket } from "../../index";
import { i18n } from "../../../translate/i18n";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import moment from "moment";
import "moment/locale/pt-br";
import styles from "./currencyHistory.module.css";

export default function CurrencyHistory() {
  const [currencyDate, setCurrencyDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [currencyOperation, setCurrencyOperation] = useState("GBP to USD");
  const [currencyHistory, setCurrencyHistory] = useState<any>();

  const { t } = i18n;

  const lang = i18n.language.toLowerCase() === "en-us" ? "en" : "pt-br";

  moment.locale(lang);

  useEffect(() => {
    if (currencyDate) {
      socket.emit("history", {
        operation: currencyOperation,
        date: currencyDate,
      });
    }

    socket.on("currencyHistory", (history) => {
      const index = Object.keys(history)[0];
      const dataBaseChart = Object.entries(history[index]);

      const objectData = dataBaseChart.reduce(
        (acc, cur) => ({ ...acc, [cur[0]]: cur[1] }),
        {}
      );
      const dates = Object.keys(objectData);
      const amounts = Object.values(objectData);
      const currencies = dates.map((date, i) => ({
        date: moment(date).format("ddd, L"),
        currency: amounts[i],
      }));

      setCurrencyHistory(currencies);
    });
  }, [currencyOperation, currencyDate]);

  function CustomTooltip({ active, payload }: any) {
    if (active && payload && payload.length) {
      return (
        <div data-testid="tooltip" className={styles.tooltip}>
          <p className={styles.tooltipLabel}>
            {`1 ${currencyOperation.substring(0,
              4
            )} = ${payload[0].value.toFixed(3)} ${currencyOperation.substring(
              7
            )}`}
          </p>
        </div>
      );
    }

    return null;
  }

  return (
    <div data-testid="currencyHistory" className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <select
          data-testid="operationOrder"
          name="Graphic type"
          id="currencyHistory"
          value={currencyOperation}
          onChange={(e) => {
            setCurrencyOperation(e.target.value);
          }}
        >
          <option value="GBP to USD">{t<string>("messages.GBPtoUSD")}</option>
          <option value="USD to GBP">{t<string>("messages.USDtoGBP")}</option>
        </select>
        <input
          data-testid="historyDate"
          type="date"
          name="currencyDate"
          id="currencyDate"
          value={currencyDate}
          onChange={(e) => {
            setCurrencyDate(e.target.value);
          }}
        />
      </div>
      <ResponsiveContainer data-testid="chartContainer">
        <AreaChart
          data-testid="chartArea"
          data={currencyHistory}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          height={300}
          width={800}
        >
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#422f8a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#422f8a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis type="number" domain={["auto", "auto"]} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            data-testid="chartAreaToHover"
            type="monotone"
            dataKey="currency"
            stroke="#422f8a"
            fill="url(#chartColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
