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

let symbols = loadSymbols();
store.dispatch(Action.setSymbols(symbols));

const element = React.createElement(SymbolsUI,
{
   initialSymbolString: symbols.toString(),
   callback: setSymbols,
});
ReactDOM.render(element, document.getElementById("symbolsUI"));

const connector = ReactRedux.connect(BarChartContainer.mapStateToProps)(BarChartContainer);
renderChart("red", "chart0", "fiftyTwoWeekPricePercent", "chart0Container");
renderChart("green", "chart1", "freeCashFlow", "chart1Container");
renderChart("blue", "chart2", "forwardPE", "chart2Container");
renderChart("orange", "chart3", "forwardAnnualDividendYield", "chart3Container", 1);

const backgroundColors = ["Cyan", "DarkTurquoise", "LightSeaGreen", "DarkCyan"];
const propertyNames = ["oneYearTotalReturn", "threeYearTotalReturn", "fiveYearTotalReturn",
					"tenYearTotalReturn"
				];
renderMultiChart(backgroundColors, "chart4", propertyNames, "chart4Container", 20);

const connector4 = ReactRedux.connect(DataTableContainer.mapStateToProps)(DataTableContainer);
const element4 = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(connector4));
ReactDOM.render(element4, document.getElementById("table0"));

fetchData();

function fetchData()
{
   const state = store.getState();
   const symbols = state.symbols;
   const keyStatisticsCallback = function(symbol, data)
   {
      console.log("key statistics " + symbol + " " + JSON.stringify(data));
      store.dispatch(Action.setKeyStatistics(symbol, data));
   };
   const performanceCallback = function(symbol, data)
   {
      console.log("performance " + symbol + " " + JSON.stringify(data));
      store.dispatch(Action.setPerformance(symbol, data));
   };

   symbols.forEach(function(symbol)
   {
      const keyStats = new KeyStatistics(symbol, keyStatisticsCallback);
      const performance = new Performance(symbol, performanceCallback);

      keyStats.fetchData();
      performance.fetchData();
   });
}

function loadSymbols()
{
   LOGGER.debug("loadSymbols()");
   let answer = [];
   const fromStorage = localStorage.symbols;
   LOGGER.debug("fromStorage = " + fromStorage);

   if (fromStorage)
   {
      const content = JSON.parse(fromStorage);
      LOGGER.debug("content = " + content);

      if (content)
      {
         content.forEach(function(symbol)
         {
            if (symbol)
            {
               answer.push(symbol);
            }
         });
      }
   }

   if (answer.length === 0)
   {
      answer = ["AAPL", "AMZN", "INTC", "KO", "T", "TRV", "VSMGX"];
   }

   LOGGER.debug("answer = " + answer);

   return answer;
}

function renderChart(backgroundColor, chartCanvasId, propertyName, containerId, stepSize)
{
   const myStepSize = (stepSize ? stepSize : 10);
   const element = React.createElement(ReactRedux.Provider,
   {
      store: store,
   }, React.createElement(connector,
   {
      backgroundColor: backgroundColor,
      chartCanvasId: chartCanvasId,
      entityName: "keyStatistics",
      propertyName: propertyName,
      stepSize: myStepSize,
   }));
   ReactDOM.render(element, document.getElementById(containerId));
}

function renderMultiChart(backgroundColors, chartCanvasId, propertyNames, containerId, stepSize)
{
   const myStepSize = (stepSize ? stepSize : 10);
   const element = React.createElement(ReactRedux.Provider,
   {
      store: store,
   }, React.createElement(connector,
   {
      backgroundColors: backgroundColors,
      chartCanvasId: chartCanvasId,
      entityName: "performance",
      labels: ["1-Year", "3-Year", "5-Year", "10-Year"],
      propertyNames: propertyNames,
      stepSize: myStepSize,
      useLegend: true,
   }));
   ReactDOM.render(element, document.getElementById(containerId));
}

function saveSymbols(symbolString)
{
   LOGGER.debug("saveSymbols()");

   symbols = symbolString.split(",");
   LOGGER.debug("new symbols = " + symbols);
   localStorage.symbols = JSON.stringify(symbols);
   store.dispatch(Action.setSymbols(symbols));
}

function setSymbols(symbolString)
{
   LOGGER.debug("setSymbols()");

   saveSymbols(symbolString);
   fetchData();
}