import FetchUtilities from "./FetchUtilities.js";

const KeyStatistics = {};

const createUrl = symbol => `https://finance.yahoo.com/quote/${symbol}/key-statistics?p=${symbol}`;

const get52WeekPricePercent = (price, _52WeekLow, _52WeekHigh) => {
  const myPrice = price ? price.number : undefined;
  const low = _52WeekLow ? _52WeekLow.number : undefined;
  const high = _52WeekHigh ? _52WeekHigh.number : undefined;
  let answer;

  if (myPrice !== undefined && low !== undefined && high !== undefined) {
    const range = high - low;
    answer = Math.round((100.0 * (myPrice - low)) / range);
  }

  return answer;
};

const parseRawFmt = (htmlDocument, name, label) => {
  let fmt;
  let raw;

  const index0 = htmlDocument.indexOf(name);

  if (index0 >= 0) {
    const index5 = htmlDocument.indexOf("},", index0);

    if (index5 > index0) {
      const string = htmlDocument.substring(index0 + name.length, index5 + 1);
      // console.log(`${name} string = :${string}:`);
      const data = JSON.parse(string);
      // console.log(`${name} parsed data = ${JSON.stringify(data)}`);
      raw = data.raw;
      fmt = data.fmt;
    }
  }

  return { label, value: fmt, number: raw };
};

const parse52WeekHigh = htmlDocument => {
  const index0 = htmlDocument.indexOf("52 Week High");
  const index2 = htmlDocument.indexOf("</td></tr>", index0);
  const index1 = htmlDocument.lastIndexOf(">", index2);
  const rawString0 = htmlDocument.substring(index1 + 1, index2);
  const rawString = rawString0.replace(/,/g, "");
  // console.log(`52 week high raw string = :${rawString}:`);
  const raw = parseFloat(rawString, 10);
  // console.log(`52 week high raw = ${raw}`);

  return { label: "_52WeekHigh", value: raw, number: raw };
};

const parse52WeekLow = htmlDocument => {
  const index0 = htmlDocument.indexOf("52 Week Low");
  const index2 = htmlDocument.indexOf("</td></tr>", index0);
  const index1 = htmlDocument.lastIndexOf(">", index2);
  const rawString0 = htmlDocument.substring(index1 + 1, index2);
  const rawString = rawString0.replace(/,/g, "");
  // console.log(`52 week low raw string = :${rawString}:`);
  const raw = parseFloat(rawString, 10);
  // console.log(`52 week low raw = ${raw}`);

  return { label: "_52WeekLow", value: raw, number: raw };
};

const parseDividendYield = htmlDocument => {
  const data = parseRawFmt(htmlDocument, '"dividendYield":', "dividendYield");
  data.number = data.number ? data.number * 100.0 : data.number;

  return data;
};

const parseFreeCashFlow = htmlDocument => {
  const data = parseRawFmt(htmlDocument, '"freeCashflow":', "freeCashFlow");
  data.number = data.number ? data.number / 1.0e9 : data.number;

  return data;
};

const parseRowData = (symbol, htmlDocument) => {
  const price = parseRawFmt(htmlDocument, '"currentPrice":', "price");
  const _52WeekLow = parse52WeekLow(htmlDocument);
  const _52WeekHigh = parse52WeekHigh(htmlDocument);
  const freeCashFlow = parseFreeCashFlow(htmlDocument);
  const forwardPE = parseRawFmt(htmlDocument, '"forwardPE":', "forwardPE");
  const dividendYield = parseDividendYield(htmlDocument);

  const fiftyTwoWeekPricePercent = get52WeekPricePercent(price, _52WeekLow, _52WeekHigh);

  return {
    symbol,
    fiftyTwoWeekPricePercent,
    freeCashFlow: freeCashFlow ? freeCashFlow.number : undefined,
    forwardPE: forwardPE ? forwardPE.number : undefined,
    forwardAnnualDividendYield:
      dividendYield && dividendYield.number ? dividendYield.number : undefined
  };
};

const receiveData = symbol => htmlDocument => {
  // console.log(`receiveData() start ${symbol}`);
  // console.log(`htmlDocument = ${htmlDocument}`);

  const data = parseRowData(symbol, htmlDocument);
  // console.log(`receiveData() end ${symbol}`);

  return data;
};

KeyStatistics.fetchData = symbol => {
  // console.log(`fetchData() start ${symbol}`);

  const url = createUrl(symbol);
  const options = { mode: "no-cors" };

  return FetchUtilities.fetchRetry(url, options, 3)
    .then(response => response.text())
    .then(receiveData(symbol));
};

export default KeyStatistics;
