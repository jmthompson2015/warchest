const ActionType = {};

ActionType.ADD_TO_PLAYER_ARRAY = "addToPlayerArray";
ActionType.BOARD_TO_MORGUE = "boardToMorgue"; // Attacked.
ActionType.HAND_TO_BOARD = "handToBoard"; // Deploy or bolster.
ActionType.MOVE_A_UNIT = "moveAUnit";
ActionType.REMOVE_FROM_PLAYER_ARRAY = "removeFromPlayerArray";
ActionType.SET_CONTROL = "setControl";
ActionType.SET_INITIATIVE_CHANGED_THIS_ROUND = "setInitiativeChangedThisRound";
ActionType.SET_INITIATIVE_PLAYER = "setInitiativePlayer";
ActionType.SET_PLAYERS = "setPlayers";
ActionType.SET_UNIT = "setUnit";
ActionType.TRANSFER_BETWEEN_PLAYER_ARRAYS = "transferBetweenPlayerArrays";

Object.freeze(ActionType);

export default ActionType;