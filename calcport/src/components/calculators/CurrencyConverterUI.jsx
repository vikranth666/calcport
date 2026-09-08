import { useEffect, useMemo, useState } from "react";

import CalculatorContainer from "../CalculatorContainer";
import ResultBox from "../ResultBox";
import ResultGrid from "../ResultGrid";
import ResetButton from "../ResetButton";


const API_URL =
  "https://api.frankfurter.dev/v2";


const fallbackCurrencies = {
  USD: "US Dollar",
  INR: "Indian Rupee",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  SGD: "Singapore Dollar",
};


export default function CurrencyConverterUI() {

  const [currencies, setCurrencies] =
    useState(fallbackCurrencies);

  const [fromCurrency, setFromCurrency] =
    useState("USD");

  const [toCurrency, setToCurrency] =
    useState("INR");

  const [amount, setAmount] =
    useState("");

  const [rate, setRate] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const loadCurrencies = async () => {

      try {

        const response =
          await fetch(
            `${API_URL}/currencies`
          );

        if (!response.ok) {
          throw new Error();
        }

        const data =
          await response.json();


        const currencyMap = {};

        data.forEach((currency) => {

          currencyMap[currency.iso_code] =
            currency.name;

        });


        setCurrencies(currencyMap);

      } catch {

        // Keep fallback currencies
        // if the API is temporarily unavailable.

      }

    };


    loadCurrencies();

  }, []);


  useEffect(() => {

    const loadRate = async () => {

      if (
        !fromCurrency ||
        !toCurrency
      ) {
        return;
      }


      if (
        fromCurrency === toCurrency
      ) {

        setRate(1);
        setError("");

        return;
      }


      setLoading(true);
      setError("");


      try {

        const response =
          await fetch(
            `${API_URL}/rate/${fromCurrency}/${toCurrency}`
          );


        if (!response.ok) {
          throw new Error();
        }


        const data =
          await response.json();


        setRate(data.rate);

      } catch {

        setRate(null);

        setError(
          "Unable to fetch the current exchange rate. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


    loadRate();

  }, [
    fromCurrency,
    toCurrency,
  ]);


  const convertedAmount = useMemo(() => {

    if (
      amount === "" ||
      rate === null
    ) {
      return null;
    }


    const numericAmount =
      Number(amount);


    if (
      !Number.isFinite(numericAmount)
    ) {
      return null;
    }


    return numericAmount * rate;

  }, [
    amount,
    rate,
  ]);


  const formatNumber = (value) => {

    if (!Number.isFinite(value)) {
      return "—";
    }


    return value.toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 6,
      }
    );

  };


  const swapCurrencies = () => {

    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

  };


  const resetCalculator = () => {

    setFromCurrency("USD");
    setToCurrency("INR");
    setAmount("");
    setRate(null);
    setError("");

  };


  return (
    <CalculatorContainer>

      <div className="input-group">

        <label htmlFor="currency-amount">
          Amount
        </label>

        <input
          id="currency-amount"
          type="number"
          min="0"
          step="any"
          value={amount}
          placeholder="e.g. 100"
          onChange={(event) =>
            setAmount(
              event.target.value
            )
          }
        />

      </div>


      <div className="input-group">

        <label htmlFor="from-currency">
          From
        </label>

        <select
          id="from-currency"
          value={fromCurrency}
          onChange={(event) =>
            setFromCurrency(
              event.target.value
            )
          }
        >

          {Object.entries(
            currencies
          ).map(
            ([code, name]) => (

              <option
                key={code}
                value={code}
              >
                {code} — {name}
              </option>

            )
          )}

        </select>

      </div>


      <button
        type="button"
        className="currency-swap"
        onClick={swapCurrencies}
      >
        ⇅ Swap Currencies
      </button>


      <div className="input-group">

        <label htmlFor="to-currency">
          To
        </label>

        <select
          id="to-currency"
          value={toCurrency}
          onChange={(event) =>
            setToCurrency(
              event.target.value
            )
          }
        >

          {Object.entries(
            currencies
          ).map(
            ([code, name]) => (

              <option
                key={code}
                value={code}
              >
                {code} — {name}
              </option>

            )
          )}

        </select>

      </div>


      {error && (
        <p className="currency-error">
          {error}
        </p>
      )}


      <ResultGrid>

        <ResultBox
          label={
            `Converted Amount (${toCurrency})`
          }
          value={
            loading
              ? "Loading..."
              : convertedAmount !== null
              ? formatNumber(
                  convertedAmount
                )
              : "—"
          }
          copyValue={
            convertedAmount !== null
              ? String(convertedAmount)
              : ""
          }
        />


        <ResultBox
          label="Exchange Rate"
          value={
            loading
              ? "Loading..."
              : rate !== null
              ? `1 ${fromCurrency} = ${formatNumber(rate)} ${toCurrency}`
              : "—"
          }
          copyValue={
            rate !== null
              ? String(rate)
              : ""
          }
        />

      </ResultGrid>


      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>
  );
}