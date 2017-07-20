define(["process/Action"], function(Action)
{
   "use strict";
   QUnit.module("Action");

   QUnit.test("setKeyStatistics()", function(assert)
   {
      // Setup.
      var symbol = "AAPL";
      var data = {
         fiftyTwoWeekPricePercent: 1.0,
         freeCashFlow: 2.0,
         forwardPE: 3.0,
         forwardAnnualDividendYield: 4.0,
      };

      // Run.
      var result = Action.setKeyStatistics(symbol, data);

      // Verify.
      assert.ok(result);
      assert.equal(result.type, Action.SET_KEY_STATISTICS);
      assert.equal(result.symbol, symbol);
      assert.equal(result.data, data);
   });

   QUnit.test("setPerformance()", function(assert)
   {
      // Setup.
      var symbol = "AAPL";
      var data = {
         oneYearTotalReturn: 1.0,
         threeYearTotalReturn: 3.0,
         fiveYearTotalReturn: 5.0,
         tenYearTotalReturn: 10.0,
      };

      // Run.
      var result = Action.setPerformance(symbol, data);

      // Verify.
      assert.ok(result);
      assert.equal(result.type, Action.SET_PERFORMANCE);
      assert.equal(result.symbol, symbol);
      assert.equal(result.data, data);
   });

   QUnit.test("setSymbols()", function(assert)
   {
      // Setup.
      var symbols = ["AAPL", "GOOG", "MSFT"];

      // Run.
      var result = Action.setSymbols(symbols);

      // Verify.
      assert.ok(result);
      assert.equal(result.type, Action.SET_SYMBOLS);
      assert.equal(result.symbols, symbols);
   });
});
