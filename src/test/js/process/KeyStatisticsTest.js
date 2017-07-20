define(["process/KeyStatistics", "process/Reducer"],
   function(KeyStatistics, Reducer)
   {
      "use strict";
      QUnit.module("KeyStatistics");

      QUnit.test("fiftyTwoWeekPricePercent", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var symbol = "AAPL";
         var callback = function() {};
         var keyStats = new KeyStatistics(store, symbol, callback);
         var xmlDocument = load();
         keyStats.receiveData(xmlDocument);

         // Run.
         var result = store.getState().keyStatistics[symbol].fiftyTwoWeekPricePercent;

         // Verify.
         assert.ok(result);
         assert.equal(result, 91);
      });

      QUnit.test("forwardAnnualDividendYield", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var symbol = "AAPL";
         var callback = function() {};
         var keyStats = new KeyStatistics(store, symbol, callback);
         var xmlDocument = load();
         keyStats.receiveData(xmlDocument);

         // Run.
         var result = store.getState().keyStatistics[symbol].forwardAnnualDividendYield;

         // Verify.
         assert.ok(result);
         assert.equal(result, 1.68);
      });

      QUnit.test("forwardPE", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var symbol = "AAPL";
         var callback = function() {};
         var keyStats = new KeyStatistics(store, symbol, callback);
         var xmlDocument = load();
         keyStats.receiveData(xmlDocument);

         // Run.
         var result = store.getState().keyStatistics[symbol].forwardPE;

         // Verify.
         assert.ok(result);
         assert.equal(result, 14.260623);
      });

      QUnit.test("freeCashFlow", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var symbol = "AAPL";
         var callback = function() {};
         var keyStats = new KeyStatistics(store, symbol, callback);
         var xmlDocument = load();
         keyStats.receiveData(xmlDocument);

         // Run.
         var result = store.getState().keyStatistics[symbol].freeCashFlow;

         // Verify.
         assert.ok(result);
         assert.equal(result, 35.74);
      });

      function load()
      {
         var request = new XMLHttpRequest();
         var url = "../resources/KeyStatistics_AAPL.xml";
         var isAsync = false;
         request.open("GET", url, isAsync);
         request.send();

         return request.responseXML;
      }
   });
