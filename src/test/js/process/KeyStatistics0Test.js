define(["process/KeyStatistics"], function(KeyStatistics)
{
   "use strict";
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
         done();
      };
      var keyStats = new KeyStatistics(symbol, callback);

      // Run.
      var done = assert.async();
      keyStats.fetchData();
   });
});
