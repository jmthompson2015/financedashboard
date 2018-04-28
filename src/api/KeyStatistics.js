import InputValidator from "../util/InputValidator.js";

function KeyStatistics(symbol, callback)
{
   InputValidator.validateNotEmpty("symbol", symbol);
   InputValidator.validateNotNull("callback", callback);

   this.fetchData = function()
   {
      LOGGER.trace("fetchData() start");

      var url = "https://finance.yahoo.com/quote/" + symbol + "/key-statistics?p=" + symbol;
      $.get(url, this.receiveData);

      LOGGER.trace("fetchData() end");
   };

   this.receiveData = function(xmlDocument)
   {
      LOGGER.trace("receiveData() start");

      const data = parseRowData(xmlDocument);
      callback(symbol, data);

      LOGGER.trace("receiveData() end");
   };

   function get52WeekPricePercent(price, _52WeekLow, _52WeekHigh)
   {
      const myPrice = (price ? price.number : undefined);
      const low = (_52WeekLow ? _52WeekLow.number : undefined);
      const high = (_52WeekHigh ? _52WeekHigh.number : undefined);
      let answer;

      if (myPrice !== undefined && low !== undefined && high !== undefined)
      {
         LOGGER.trace("myPrice = " + myPrice);
         LOGGER.trace("low = " + low);
         LOGGER.trace("high = " + high);

         const range = high - low;
         LOGGER.trace("range = " + range);

         answer = Math.round(100.0 * (myPrice - low) / range);
         LOGGER.debug("pricePercent = " + answer);
      }

      return answer;
   }

   function parseRowData(xmlDocument)
   {
      let _52WeekHigh, _52WeekLow, dividendYield, fiftyTwoWeekPricePercent, forwardPE, freeCashFlow, price;
      let myDocument = xmlDocument;

      const key1 = "root.App.main = ";
      const index1 = myDocument.indexOf(key1);

      if (index1 >= 0)
      {
         const index2 = myDocument.indexOf("\n", index1);
         myDocument = myDocument.substring(index1 + key1.length, index2);
         const data1 = JSON.parse(myDocument);
         const summaryDetail = data1.context.dispatcher.stores.QuoteSummaryStore.summaryDetail;
         const financialData = data1.context.dispatcher.stores.QuoteSummaryStore.financialData;
         const labels = ["price", "forwardPE", "_52WeekLow", "_52WeekHigh"];
         const keys = ["currentPrice", "forwardPE", "fiftyTwoWeekLow", "fiftyTwoWeekHigh"];

         labels.forEach(function(label, i)
         {
            const key = keys[i];
            let rawData = summaryDetail[key];

            if (rawData === undefined && financialData !== undefined)
            {
               rawData = financialData[key];
            }

            var newData;

            if (rawData !== undefined)
            {
               newData = {
                  label: label,
                  value: rawData.fmt,
                  number: rawData.raw,
               };
            }

            switch (label)
            {
               case "price":
                  price = newData;
                  break;
               case "_52WeekLow":
                  _52WeekLow = newData;
                  break;
               case "_52WeekHigh":
                  _52WeekHigh = newData;
                  break;
               case "forwardPE":
                  forwardPE = newData;
                  break;
            }
         });

         dividendYield = {
            label: "dividendYield",
            value: summaryDetail.dividendYield.fmt,
            number: summaryDetail.dividendYield.raw * 100.0,
         };

         if (financialData !== undefined && financialData.freeCashflow !== undefined)
         {
            freeCashFlow = {
               label: "freeCashFlow",
               value: financialData.freeCashflow.fmt,
               number: financialData.freeCashflow.raw * 1.0e-09,
            };
         }

         fiftyTwoWeekPricePercent = get52WeekPricePercent(price, _52WeekLow, _52WeekHigh);
         LOGGER.trace("fiftyTwoWeekPricePercent = " + fiftyTwoWeekPricePercent);
      }

      return (
      {
         symbol: symbol,
         fiftyTwoWeekPricePercent: fiftyTwoWeekPricePercent,
         freeCashFlow: (freeCashFlow ? freeCashFlow.number : undefined),
         forwardPE: (forwardPE ? forwardPE.number : undefined),
         forwardAnnualDividendYield: (dividendYield ? dividendYield.number : undefined),
      });
   }
}

export default KeyStatistics;