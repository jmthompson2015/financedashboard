define(["process/Performance"], function(Performance)
{
   "use strict";
   QUnit.module("Performance");

   QUnit.test("oneYearTotalReturn", function(assert)
   {
      // Setup.
      var symbol = "AAPL";
      var callback = function(symbol, data)
      {
         // Verify.
         assert.ok(data);
         assert.equal(data.oneYearTotalReturn, 52.68);
      };
      var perf = new Performance(symbol, callback);
      var htmlDocument = load();
      assert.ok(htmlDocument);

      // Run.
      perf.receiveData(htmlDocument);
      //  var result = store.getState().performance[symbol].oneYearTotalReturn;

      // Verify.
      //  assert.ok(result);
      //  assert.equal(result, 52.68);
   });

   QUnit.test("threeYearTotalReturn", function(assert)
   {
      // Setup.
      var symbol = "AAPL";
      var callback = function(symbol, data)
      {
         // Verify.
         assert.ok(data);
         assert.equal(data.threeYearTotalReturn, 18.34);
      };
      var perf = new Performance(symbol, callback);
      var htmlDocument = load();

      // Run.
      perf.receiveData(htmlDocument);
   });

   QUnit.test("fiveYearTotalReturn", function(assert)
   {
      // Setup.
      var symbol = "AAPL";
      var callback = function(symbol, data)
      {
         // Verify.
         assert.ok(data);
         assert.equal(data.fiveYearTotalReturn, 13.04);
      };
      var perf = new Performance(symbol, callback);
      var htmlDocument = load();

      // Run.
      perf.receiveData(htmlDocument);
   });

   QUnit.test("tenYearTotalReturn", function(assert)
   {
      // Setup.
      var symbol = "AAPL";
      var callback = function(symbol, data)
      {
         // Verify.
         assert.ok(data);
         assert.equal(data.tenYearTotalReturn, 23.27);
      };
      var perf = new Performance(symbol, callback);
      var htmlDocument = load();

      // Run.
      perf.receiveData(htmlDocument);
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
