import { useEffect, useState } from "react";
import { socket } from "../../index";
import { Exchange } from "../../../../services/interfaces";
import { i18n } from "../../../translate/i18n";
import "moment/locale/pt-br";
import moment from "moment";
import styles from "./exchangesHistory.module.css";

export default function ExchangesHistory() {
  const [exchangesHistory, setExchangesHistory] = useState<Exchange[]>([]);
  const { t } = i18n;
  const lang = i18n.language.toLowerCase() === "en-us" ? "en" : "pt-br";

  moment.locale(lang);

  useEffect(() => {
    socket.emit("sendExchanges", (exchangesList: Exchange[]) => {
      setExchangesHistory(exchangesList);
    });

    socket.on("newEchange", (newExchange) => {
      setExchangesHistory((exchanges) => [...exchanges, newExchange]);
    });
  }, []);

  function deleteExchange(id: string) {
    socket.emit("delete", id);
    setExchangesHistory(() => exchangesHistory.filter((e) => e.id !== id));
  }

  return (
    <div
      data-testid="exchangesHistory"
      className={styles.exchangesHistoryContainer}
    >
      <h1 className={styles.exchangesHistoryTitle}>Exchanges History</h1>
      <table className={styles.exchangesHistoryTable}>
        <tbody className={styles.tableBody}>
          {exchangesHistory ? (
            exchangesHistory.map((exchange: Exchange) => (
              <tr key={exchange.id} className={styles.tableItemsContainer}>
                <td className={styles.tableItem}>
                  {exchange.operation === "GBP_USD" ? (
                    <div className={styles.operation}>
                      <img src="/assets/GBP_USD.svg" alt="GBP to USD" />
                      <span>{t<string>("messages.GBPtoUSD")}</span>
                    </div>
                  ) : (
                    <div className={styles.operation}>
                      <img src="/assets/USD_GBP.svg" alt="USD to GBP" />
                      <span>{t<string>("messages.USDtoGBP")}</span>
                    </div>
                  )}
                  <div className={styles.operationAmount}>
                    <p>
                      {`${exchange.send.toFixed(3)} `}
                      <span>{exchange.operation.slice(0, 3)}</span>
                    </p>
                    <img src="/assets/arrow-right.svg" alt="arrow right" />
                    <p>
                      {`${exchange.receive.toFixed(3)} `}
                      <span>{exchange.operation.slice(4)}</span>
                    </p>
                    <div className={styles.operationDate}>
                      <p>{moment(exchange.createdat).format("LL")}</p>
                    </div>
                    <button
                      data-testid="deleteButton"
                      className={styles.deleteExchangeButton}
                      type="button"
                      onClick={() => deleteExchange(exchange.id)}
                    >
                      <img src="/assets/trash.svg" alt="Delete exchange" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <p>No exchanges made</p>
          )}
        </tbody>
      </table>
    </div>
  );
}
