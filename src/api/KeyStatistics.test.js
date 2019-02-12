import KeyStatistics from "./KeyStatistics.js";

QUnit.module("KeyStatistics");

const assertInRange = (assert, value, low, high, label) => {
  assert.equal(low < value && value < high, true, `${label} = ${value}`);
};

const assertUndefined = (assert, value, label) => {
  assert.equal(value, undefined, `${label} = ${value}`);
};

QUnit.test("fetchData() AAPL", function(assert) {
  // Setup.
  const symbol = "AAPL";

  // Run.
  const done = assert.async();
  KeyStatistics.fetchData(symbol).then(data => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(symbol);
    assert.equal(symbol, "AAPL");
    assert.ok(data);
    assert.equal(data.symbol, "AAPL");
    assertInRange(assert, data.fiftyTwoWeekPricePercent, 20, 100, "fiftyTwoWeekPricePercent");
    assertInRange(assert, data.freeCashFlow, 40, 50, "freeCashFlow");
    assertInRange(assert, data.forwardPE, 10, 20, "forwardPE");
    assertInRange(assert, data.forwardAnnualDividendYield, 0, 10, "forwardAnnualDividendYield");
    done();
  });
});

QUnit.test("fetchData() AMZN", function(assert) {
  // Setup.
  const symbol = "AMZN";

  // Run.
  const done = assert.async();
  KeyStatistics.fetchData(symbol).then(data => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(symbol);
    assert.equal(symbol, "AMZN");
    assert.ok(data);
    assert.equal(data.symbol, "AMZN");
    assertInRange(assert, data.fiftyTwoWeekPricePercent, 20, 100, "fiftyTwoWeekPricePercent");
    assertInRange(assert, data.freeCashFlow, 10, 20, "freeCashFlow");
    assertInRange(assert, data.forwardPE, 30, 50, "forwardPE");
    assertUndefined(assert, data.forwardAnnualDividendYield, "forwardAnnualDividendYield");
    done();
  });
});

QUnit.test("fetchData() VSMGX", function(assert) {
  // Setup.
  const symbol = "VSMGX";

  // Run.
  const done = assert.async();
  KeyStatistics.fetchData(symbol).then(data => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(symbol);
    assert.equal(symbol, "VSMGX");
    assert.ok(data);
    console.log(`data = ${JSON.stringify(data)}`);
    assert.equal(data.symbol, "VSMGX");
    assertUndefined(assert, data.fiftyTwoWeekPricePercent, "fiftyTwoWeekPricePercent");
    assertUndefined(assert, data.freeCashFlow, "freeCashFlow");
    assertUndefined(assert, data.forwardPE, "forwardPE");
    assertUndefined(assert, data.forwardAnnualDividendYield, "forwardAnnualDividendYield");
    done();
  });
});

const KeyStatisticsTest = {};
export default KeyStatisticsTest;
