define(["process/Performance"], function(Performance)
{
   "use strict";
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
         done();
      };
      var perf = new Performance(symbol, callback);

      // Run.
      var done = assert.async();
      perf.fetchData();
   });
});
