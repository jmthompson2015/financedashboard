define(["process/KeyStatistics", "process/Reducer"],
   function(KeyStatistics, Reducer)
   {
      "use strict";
      QUnit.module("KeyStatistics0");

      QUnit.test("fetchData()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
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
         var keyStats = new KeyStatistics(store, symbol, callback);

         // Run.
         var done = assert.async();
         keyStats.fetchData();
      });
   });
