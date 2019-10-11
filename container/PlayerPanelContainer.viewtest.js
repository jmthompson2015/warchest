/* eslint no-console: ["error", { allow: ["log"] }] */

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import MoveGenerator from "../model/MoveGenerator.js";
import TestData from "../model/TestData.js";

import Endpoint from "../view/Endpoint.js";

import PlayerPanelContainer from "./PlayerPanelContainer.js";

const myHandOnClick = coinId => {
  console.log(`myHandOnClick() coinId = ${coinId}`);
};

const myInputCallback = moveState => {
  console.log(`myInputCallback() moveState = ${JSON.stringify(moveState)}`);
};

const store = TestData.createStore();
store.dispatch(ActionCreator.setUnit("e2", 2)); // swordsman
store.dispatch(ActionCreator.setUnit("d7", 22)); // archer
store.dispatch(ActionCreator.setUnit("d7", 23)); // archer
store.dispatch(ActionCreator.setCurrentPlayer(1));
store.dispatch(ActionCreator.setCurrentHandCallback(myHandOnClick));
store.dispatch(ActionCreator.setCurrentInputCallback(myInputCallback));
const state = store.getState();

const playerId = 1;
const player = Selector.player(playerId, state);
const hand = Selector.coins(Selector.hand(player.id, state), state);
const paymentCoin = hand[1];
store.dispatch(ActionCreator.setCurrentPaymentCoin(paymentCoin.id));
const moveStates = MoveGenerator.generateForCoin(player, paymentCoin, state);
store.dispatch(ActionCreator.setCurrentMoves(moveStates));

const container = React.createElement(PlayerPanelContainer, {
  playerId,
  resourceBase: Endpoint.LOCAL_RESOURCE
});
const element = React.createElement(ReactRedux.Provider, { store }, container);
ReactDOM.render(element, document.getElementById("panel"));