"use strict";

define(["process/Performance"], function(Performance)
{
   QUnit.module("Performance0");

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
         assert.equal(5 < data.oneYearTotalReturn && data.oneYearTotalReturn < 30, true, "oneYearTotalReturn = " + data.oneYearTotalReturn);
         assert.equal(5 < data.threeYearTotalReturn && data.threeYearTotalReturn < 30, true, "threeYearTotalReturn = " + data.threeYearTotalReturn);
         assert.equal(5 < data.fiveYearTotalReturn && data.fiveYearTotalReturn < 30, true, "fiveYearTotalReturn = " + data.fiveYearTotalReturn);
         assert.equal(5 < data.tenYearTotalReturn && data.tenYearTotalReturn < 30, true, "tenYearTotalReturn = " + data.tenYearTotalReturn);
         done();
      };
      var perf = new Performance(symbol, callback);

      // Run.
      var done = assert.async();
      perf.fetchData();
   });
});