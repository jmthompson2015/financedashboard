define(["InitialState", "process/Action", "process/Reducer"],
   function(InitialState, Action, Reducer)
   {
      "use strict";
      QUnit.module("Reducer");

      QUnit.test("setKeyStatistics()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var symbol = "AAPL";
         assert.equal(state.keyStatistics[symbol], undefined);
         var data = {
            fiftyTwoWeekPricePercent: 1.0,
            freeCashFlow: 2.0,
            forwardPE: 3.0,
            forwardAnnualDividendYield: 4.0,
         };
         var action = Action.setKeyStatistics(symbol, data);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(result.keyStatistics[symbol], data);
      });

      QUnit.test("setPerformance()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var symbol = "AAPL";
         assert.equal(state.performance[symbol], undefined);
         var data = {
            oneYearTotalReturn: 1.0,
            threeYearTotalReturn: 3.0,
            fiveYearTotalReturn: 5.0,
            tenYearTotalReturn: 10.0,
         };
         var action = Action.setPerformance(symbol, data);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(result.performance[symbol], data);
      });

      QUnit.test("setSymbols()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         assert.equal(state.symbols.length, 0);
         var symbols = ["AAPL", "GOOG", "MSFT"];
         var action = Action.setSymbols(symbols);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(result.symbols.length, symbols.length);
      });
   });
