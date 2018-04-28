"use strict";

define(["process/KeyStatistics"], function(KeyStatistics)
{
   QUnit.module("KeyStatistics0");

   QUnit.test("fetchData()", function(assert)
   {
      // Setup.
      var symbol = "AAPL";
      var callback = function(symbol, data)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(symbol);
         assert.equal(symbol, "AAPL");
         assert.ok(data);
         assert.equal(data.symbol, "AAPL");
         assert.equal(40 < data.fiftyTwoWeekPricePercent && data.fiftyTwoWeekPricePercent < 100, true, "fiftyTwoWeekPricePercent = " + data.fiftyTwoWeekPricePercent);
         assert.equal(40 < data.freeCashFlow && data.freeCashFlow < 50, true, "freeCashFlow = " + data.freeCashFlow);
         assert.equal(10 < data.forwardPE && data.forwardPE < 20, true, "forwardPE = " + data.forwardPE);
         assert.equal(0 < data.forwardAnnualDividendYield && data.forwardAnnualDividendYield < 10, true, "forwardAnnualDividendYield = " + data.forwardAnnualDividendYield);
         done();
      };
      var keyStats = new KeyStatistics(symbol, callback);

      // Run.
      var done = assert.async();
      keyStats.fetchData();
   });
});