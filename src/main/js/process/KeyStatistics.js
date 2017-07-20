define(["process/Action"], function(Action)
{
   "use strict";

   function KeyStatistics(symbol, callback)
   {
      InputValidator.validateNotEmpty("symbol", symbol);
      InputValidator.validateNotNull("callback", callback);

      var that = this;

      this.fetchData = function()
      {
         LOGGER.trace("fetchData() start");

         var url = createUrl();
         $.get(url, this.receiveData);

         LOGGER.trace("fetchData() end");
      };

      this.get52WeekPricePercent = function()
      {
         var myPrice = (price ? price.number : undefined);
         var low = (_52WeekLow ? _52WeekLow.number : undefined);
         var high = (_52WeekHigh ? _52WeekHigh.number : undefined);
         var range;
         if (low && high)
         {
            range = high - low;
         }
         LOGGER.trace("myPrice = " + myPrice);
         LOGGER.trace("low = " + low);
         LOGGER.trace("high = " + high);
         LOGGER.trace("range = " + range);
         var answer;
         if (myPrice && low && range)
         {
            answer = Math.round(100.0 * (myPrice - low) / range);
         }
         LOGGER.debug("pricePercent = " + answer);

         return answer;
      };

      this.receiveData = function(xmlDocument)
      {
         LOGGER.trace("receiveData() start");

         LOGGER.trace("xmlDocument = " + (new XMLSerializer()).serializeToString(xmlDocument));
         var content = xmlDocument.children[0].children[0].children[0];
         content = content.innerHTML;
         content = content.replace(/&lt;/g, "<");
         content = content.replace(/&gt;/g, ">");
         xmlDocument.children[0].children[0].children[0].innerHTML = content;
         parsePrice(xmlDocument);
         parseFreeCashFlow(xmlDocument);
         parseRowData(xmlDocument);

         var data = {
            fiftyTwoWeekPricePercent: fiftyTwoWeekPricePercent,
            freeCashFlow: (freeCashFlow ? freeCashFlow.number : undefined),
            forwardPE: (forwardPE ? forwardPE.number : undefined),
            forwardAnnualDividendYield: (dividendYield ? dividendYield.number : undefined),
         };
         callback(symbol, data);

         LOGGER.trace("receiveData() end");
      };

      var price;
      var forwardPE;
      var freeCashFlow;
      var _52WeekLow;
      var _52WeekHigh;
      var dividendYield;
      var fiftyTwoWeekPricePercent;

      function createUrl()
      {
         var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

         // https://finance.yahoo.com/quote/AAPL/key-statistics?p=AAPL
         var sourceUrl = "https://finance.yahoo.com/quote/" + symbol + "/key-statistics?p=" + symbol;

         var query = "select * from htmlstring where url=\"" + sourceUrl + "\"";
         var answer = baseUrl + encodeURIComponent(query) + "&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
         LOGGER.debug("url = " + answer);

         return answer;
      }

      function parsePrice(xmlDocument)
      {
         // This finds the price (real-time quote).
         var xpath = "//span[@class='Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)']";
         var nsResolver = null;
         var resultType = XPathResult.STRING_TYPE;
         var result = null;
         var row = xmlDocument.evaluate(xpath, xmlDocument, nsResolver, resultType, result);
         LOGGER.debug("row = " + row);
         LOGGER.debug("row.resultType = " + row.resultType);
         var rawPrice = row.stringValue;
         LOGGER.debug("rawPrice = " + rawPrice);
         var numberString = rawPrice.replace(/,/g, "");
         var number = Number(numberString);
         price = {
            label: "Price",
            value: rawPrice,
            number: number,
         };
         LOGGER.debug("price = " + price.label + " " + price.value);
      }

      function parseFreeCashFlow(xmlDocument)
      {
         // This finds the free cash flow.
         var xpath = "//span[text()='Levered Free Cash Flow']/../../td[@class='Fz(s) Fw(500) Ta(end)']";
         var nsResolver = null;
         var resultType = XPathResult.STRING_TYPE;
         var result = null;
         var row = xmlDocument.evaluate(xpath, xmlDocument, nsResolver, resultType, result);
         LOGGER.debug("row = " + row);
         LOGGER.debug("row.resultType = " + row.resultType);
         var rawFreeCashFlow = row.stringValue;
         LOGGER.debug("rawFreeCashFlow = " + rawFreeCashFlow);
         var numberString = rawFreeCashFlow.substring(0, rawFreeCashFlow.length - 1);
         LOGGER.debug("numberString = " + numberString);
         var multiplierString = rawFreeCashFlow.substring(rawFreeCashFlow.length - 1);
         LOGGER.debug("multiplierString = " + multiplierString);
         var number = Number(numberString) * (multiplierString === "M" ? 0.001 : 1.0);
         LOGGER.debug("number = " + number);
         freeCashFlow = {
            label: "freeCashFlow",
            value: rawFreeCashFlow,
            number: number,
         };
         LOGGER.debug("freeCashFlow = " + freeCashFlow.label + " " + freeCashFlow.value);
      }

      function parseRowData(xmlDocument)
      {
         var xml_serializer = new XMLSerializer();
         var myDocument = xml_serializer.serializeToString(xmlDocument);

         var key1 = "root.App.main = ";
         var index1 = myDocument.indexOf(key1);

         if (index1 >= 0)
         {
            var index2 = myDocument.indexOf("\n", index1);
            myDocument = myDocument.substring(index1 + key1.length, index2);
            var data1 = JSON.parse(myDocument);
            var summaryDetail = data1.context.dispatcher.stores.QuoteSummaryStore.summaryDetail;
            var labels = ["forwardPE", "_52WeekLow", "_52WeekHigh"];
            var keys = ["forwardPE", "fiftyTwoWeekLow", "fiftyTwoWeekHigh"];

            labels.forEach(function(label, i)
            {
               var newData;
               if (summaryDetail[keys[i]])
               {
                  newData = {
                     label: label,
                     value: summaryDetail[keys[i]].fmt,
                     number: summaryDetail[keys[i]].raw,
                  };

                  LOGGER.trace(label + " = " + newData.number);
               }

               switch (label)
               {
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

            fiftyTwoWeekPricePercent = that.get52WeekPricePercent();
            LOGGER.trace("fiftyTwoWeekPricePercent = " + fiftyTwoWeekPricePercent);
         }
      }
   }

   return KeyStatistics;
});
