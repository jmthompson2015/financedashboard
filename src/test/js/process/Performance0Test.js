define(["process/Performance", "process/Reducer"],
   function(Performance, Reducer)
   {
      "use strict";
      QUnit.module("Performance0");

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
         var perf = new Performance(store, symbol, callback);

         // Run.
         var done = assert.async();
         perf.fetchData();
      });
   });
