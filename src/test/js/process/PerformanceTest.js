define(["process/Performance", "process/Reducer"],
   function(Performance, Reducer)
   {
      "use strict";
      QUnit.module("Performance");

      QUnit.test("oneYearTotalReturn", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var symbol = "AAPL";
         var callback = function() {};
         var perf = new Performance(store, symbol, callback);
         var htmlDocument = load();
         assert.ok(htmlDocument);
         perf.receiveData(htmlDocument);

         // Run.
         var result = store.getState().performance[symbol].oneYearTotalReturn;

         // Verify.
         assert.ok(result);
         assert.equal(result, 52.68);
      });

      QUnit.test("threeYearTotalReturn", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var symbol = "AAPL";
         var callback = function() {};
         var perf = new Performance(store, symbol, callback);
         var htmlDocument = load();
         perf.receiveData(htmlDocument);

         // Run.
         var result = store.getState().performance[symbol].threeYearTotalReturn;

         // Verify.
         assert.ok(result);
         assert.equal(result, 18.34);
      });

      QUnit.test("fiveYearTotalReturn", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var symbol = "AAPL";
         var callback = function() {};
         var perf = new Performance(store, symbol, callback);
         var htmlDocument = load();
         perf.receiveData(htmlDocument);

         // Run.
         var result = store.getState().performance[symbol].fiveYearTotalReturn;

         // Verify.
         assert.ok(result);
         assert.equal(result, 13.04);
      });

      QUnit.test("tenYearTotalReturn", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var symbol = "AAPL";
         var callback = function() {};
         var perf = new Performance(store, symbol, callback);
         var htmlDocument = load();
         perf.receiveData(htmlDocument);

         // Run.
         var result = store.getState().performance[symbol].tenYearTotalReturn;

         // Verify.
         assert.ok(result);
         assert.equal(result, 23.27);
      });

      function load()
      {
         var request = new XMLHttpRequest();
         var url = "../resources/Performance_AAPL.xml";
         var isAsync = false;
         request.open("GET", url, isAsync);
         request.send();

         return request.responseText;
      }
   });
