define(["InitialState"], function(InitialState)
{
   "use strict";
   QUnit.module("InitialState");

   QUnit.test("InitialState()", function(assert)
   {
      // Run.
      var result = new InitialState();

      // Verify.
      assert.ok(result.symbols);
      assert.equal(result.symbols.length, 0);

      assert.ok(result.keyStatistics);
      assert.equal(Object.keys(result.keyStatistics).length, 0);

      assert.ok(result.performance);
      assert.equal(Object.keys(result.performance).length, 0);
   });
});
