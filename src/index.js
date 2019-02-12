/* eslint no-console: ["error", { allow: ["log"] }] */

import Logger from "./util/Logger.js";

import KeyStatistics from "./api/KeyStatistics.js";
import Performance from "./api/Performance.js";

import Action from "./redux/Action.js";
import Reducer from "./redux/Reducer.js";

import SymbolsUI from "./component/SymbolsUI.js";

import BarChartContainer from "./container/BarChartContainer.js";
import DataTableContainer from "./container/DataTableContainer.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

const store = Redux.createStore(Reducer.root);
let symbols;

const fetchData = () => {
  const state = store.getState();
  const mySymbols = state.symbols;
  const performanceCallback = (symbol, data) => {
    console.log(`performance ${symbol} ${JSON.stringify(data)}`);
    store.dispatch(Action.setPerformance(symbol, data));
  };

  mySymbols.forEach(symbol => {
    const performance = new Performance(symbol, performanceCallback);

    KeyStatistics.fetchData(symbol).then(data => {
      console.log(`key statistics ${symbol} ${JSON.stringify(data)}`);
      store.dispatch(Action.setKeyStatistics(symbol, data));
    });
    performance.fetchData();
  });
};

function loadSymbols() {
  LOGGER.debug("loadSymbols()");
  let answer = [];
  const fromStorage = localStorage.symbols;
  LOGGER.debug(`fromStorage = ${fromStorage}`);

  if (fromStorage) {
    const content = JSON.parse(fromStorage);
    LOGGER.debug(`content = ${content}`);

    if (content) {
      content.forEach(symbol => {
        if (symbol) {
          answer.push(symbol);
        }
      });
    }
  }

  if (answer.length === 0) {
    answer = ["AAPL", "AMZN", "INTC", "KO", "T", "TRV", "VSMGX"];
  }

  LOGGER.debug(`answer = ${answer}`);

  return answer;
}

function saveSymbols(symbolString) {
  LOGGER.debug("saveSymbols()");

  symbols = symbolString.split(",");
  LOGGER.debug(`new symbols = ${symbols}`);
  localStorage.symbols = JSON.stringify(symbols);
  store.dispatch(Action.setSymbols(symbols));
}

function setSymbols(symbolString) {
  LOGGER.debug("setSymbols()");

  saveSymbols(symbolString);
  fetchData();
}

// /////////////////////////////////////////////////////////////////////////////////////////////////
symbols = loadSymbols();
store.dispatch(Action.setSymbols(symbols));

const element = React.createElement(SymbolsUI, {
  initialSymbolString: symbols.toString(),
  callback: setSymbols
});
ReactDOM.render(element, document.getElementById("symbolsUI"));

const connector = ReactRedux.connect(BarChartContainer.mapStateToProps)(BarChartContainer);

const backgroundColors = ["Cyan", "DarkTurquoise", "LightSeaGreen", "DarkCyan"];
const propertyNames = [
  "oneYearTotalReturn",
  "threeYearTotalReturn",
  "fiveYearTotalReturn",
  "tenYearTotalReturn"
];

const connector4 = ReactRedux.connect(DataTableContainer.mapStateToProps)(DataTableContainer);
const element4 = React.createElement(
  ReactRedux.Provider,
  {
    store
  },
  React.createElement(connector4)
);
ReactDOM.render(element4, document.getElementById("table0"));

fetchData();

function renderChart(backgroundColor, chartCanvasId, propertyName, containerId, stepSize) {
  const myStepSize = stepSize || 10;
  const myElement = React.createElement(
    ReactRedux.Provider,
    {
      store
    },
    React.createElement(connector, {
      backgroundColor,
      chartCanvasId,
      entityName: "keyStatistics",
      propertyName,
      stepSize: myStepSize
    })
  );
  ReactDOM.render(myElement, document.getElementById(containerId));
}

renderChart("red", "chart0", "fiftyTwoWeekPricePercent", "chart0Container");
renderChart("green", "chart1", "freeCashFlow", "chart1Container");
renderChart("blue", "chart2", "forwardPE", "chart2Container");
renderChart("orange", "chart3", "forwardAnnualDividendYield", "chart3Container", 1);

function renderMultiChart(chartCanvasId, containerId, stepSize) {
  const myStepSize = stepSize || 10;
  const myElement = React.createElement(
    ReactRedux.Provider,
    {
      store
    },
    React.createElement(connector, {
      backgroundColors,
      chartCanvasId,
      entityName: "performance",
      labels: ["1-Year", "3-Year", "5-Year", "10-Year"],
      propertyNames,
      stepSize: myStepSize,
      useLegend: true
    })
  );
  ReactDOM.render(myElement, document.getElementById(containerId));
}

renderMultiChart("chart4", "chart4Container", 20);
