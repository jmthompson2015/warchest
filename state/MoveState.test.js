import MoveState from "./MoveState.js";

QUnit.module("MoveState");

const PROPS = ["moveKey", "playerId", "paymentCoinKey", "an"];

const createTestData = () =>
  MoveState.create({ moveKey: 1, playerId: 2, paymentCoinKey: 3, an: 4 });

QUnit.test("create()", assert => {
  // Run.
  const player = createTestData();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(player[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const player = createTestData();

  // Run / Verify.
  try {
    player.playerId = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const PlayerStateTest = {};
export default PlayerStateTest;