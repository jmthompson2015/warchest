import ArrayUtils from "../util/ArrayUtilities.js";

const RandomPlayerStrategy = {};

const DELAY = 1000;

RandomPlayerStrategy.chooseDamageTarget = (damageTargets, store, delay = DELAY) =>
  new Promise(resolve => {
    const damageTarget = ArrayUtils.randomElement(damageTargets);
    setTimeout(() => {
      resolve(damageTarget);
    }, delay);
  });

RandomPlayerStrategy.chooseMove = (moveStates, store, delay = DELAY) =>
  new Promise(resolve => {
    const moveState = ArrayUtils.randomElement(moveStates);
    setTimeout(() => {
      resolve(moveState);
    }, delay);
  });

RandomPlayerStrategy.choosePaymentCoin = (coinIds, store, delay = DELAY) =>
  new Promise(resolve => {
    const coinId = ArrayUtils.randomElement(coinIds);
    setTimeout(() => {
      resolve(coinId);
    }, delay);
  });

Object.freeze(RandomPlayerStrategy);

export default RandomPlayerStrategy;