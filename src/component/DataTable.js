import InputValidator from "../util/InputValidator.js";

class DataTable extends React.Component
{
   createEmptyCell(key, column)
   {
      return React.createElement(Reactable.Td,
      {
         key: key,
         column: column
      }, "");
   }

   createNumberCell(key, column, value, digits)
   {
      let myValue = "";

      if (value)
      {
         myValue = value.toFixed(digits);
      }

      return React.createElement(Reactable.Td,
      {
         key: key,
         column: column,
         className: "numberCell",
         value: value,
      }, myValue);
   }

   createRow(symbol, key)
   {
      const cells = [];

      cells.push(React.createElement(Reactable.Td,
      {
         key: cells.length,
         column: "symbol",
         value: symbol,
      }, ReactDOMFactories.a(
      {
         href: "http://finance.yahoo.com/q?s=" + symbol,
         target: "_blank",
      }, symbol)));

      const myData0 = this.props.keyStatistics[symbol];
      const myData1 = this.props.performance[symbol];
      let digits;

      for (let j = 1; j < DataTable.columns.length; j++)
      {
         const column = DataTable.columns[j];

         if (j < 5 && myData0)
         {
            digits = (j === 1 ? 0 : (j === 2 ? 3 : 2));
            cells.push(this.createNumberCell(cells.length, column.key, myData0[column.key], digits));
         }
         else if (j >= 5 && myData1)
         {
            digits = 2;
            cells.push(this.createNumberCell(cells.length, column.key, myData1[column.key], digits));
         }
         else
         {
            cells.push(this.createEmptyCell(cells.length, column.key));
         }
      }

      return React.createElement(Reactable.Tr,
      {
         key: key,
      }, cells);
   }

   render()
   {
      InputValidator.validateNotNull("symbols", this.props.symbols);
      InputValidator.validateNotNull("keyStatistics", this.props.keyStatistics);
      InputValidator.validateNotNull("performance", this.props.performance);

      const symbols = this.props.symbols;
      const rows = [];

      symbols.forEach(function(symbol, i)
      {
         rows.push(this.createRow(symbol, i));
      }.bind(this));

      return React.createElement(Reactable.Table,
      {
         className: "dataTable",
         columns: DataTable.columns,
         sortable: true
      }, rows);
   }
}

DataTable.columns = [
   {
      key: "symbol",
      label: "Symbol"
   },
   {
      key: "fiftyTwoWeekPricePercent",
      label: "Price % of 52 Week Range"
   },
   {
      key: "freeCashFlow",
      label: "Free Cash Flow ($B)"
   },
   {
      key: "forwardPE",
      label: "Forward P/E"
   },
   {
      key: "forwardAnnualDividendYield",
      label: "Forward Annual Dividend Yield (%)"
   },
   {
      key: "oneYearTotalReturn",
      label: "1-Year Total Return (%)"
   },
   {
      key: "threeYearTotalReturn",
      label: "3-Year Total Return (%)"
   },
   {
      key: "fiveYearTotalReturn",
      label: "5-Year Total Return (%)"
   },
   {
      key: "tenYearTotalReturn",
      label: "10-Year Total Return (%)"
   }
];

export default DataTable;