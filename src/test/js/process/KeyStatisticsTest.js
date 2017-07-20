define(["process/KeyStatistics"], function(KeyStatistics)
{
   "use strict";
   QUnit.module("KeyStatistics");

   QUnit.test("fiftyTwoWeekPricePercent", function(assert)
   {
      // Setup.
      var symbol = "AAPL";
      var callback = function(symbol, data)
      {
         // Verify.
         assert.ok(data);
         assert.equal(data.fiftyTwoWeekPricePercent, 91);
      };
      var keyStats = new KeyStatistics(symbol, callback);
      var xmlDocument = load();

      // Run.
      keyStats.receiveData(xmlDocument);
   });

   QUnit.test("forwardAnnualDividendYield", function(assert)
   {
      // Setup.
      var symbol = "AAPL";
      var callback = function(symbol, data)
      {
         // Verify.
         assert.ok(data);
         assert.equal(data.forwardAnnualDividendYield, 1.68);
      };
      var keyStats = new KeyStatistics(symbol, callback);
      var xmlDocument = load();

      // Run.
      keyStats.receiveData(xmlDocument);
   });

   QUnit.test("forwardPE", function(assert)
   {
      // Setup.
      var symbol = "AAPL";
      var callback = function(symbol, data)
      {
         // Verify.
         assert.ok(data);
         assert.equal(data.forwardPE, 14.260623);
      };
      var keyStats = new KeyStatistics(symbol, callback);
      var xmlDocument = load();

      // Run.
      keyStats.receiveData(xmlDocument);
   });

   QUnit.test("freeCashFlow", function(assert)
   {
      // Setup.
      var symbol = "AAPL";
      var callback = function(symbol, data)
      {
         // Verify.
         assert.ok(data);
         assert.equal(data.freeCashFlow, 35.74);
      };
      var keyStats = new KeyStatistics(symbol, callback);
      var xmlDocument = load();

      // Run.
      keyStats.receiveData(xmlDocument);
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
