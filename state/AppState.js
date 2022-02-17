const AppState = {};

AppState.create = ({
  anToCoinKey = {},
  anToControl = {},
  anToTokens = {},
  appName = "Vizzini App",
  delay = 1000,
  gameRecords = [],
  initiativeChangedThisRound = false,
  initiativePlayerId,
  isGameOver = false,
  isTwoPlayer = true,
  isVerbose = true,
  mctsRoot = null,
  userMessage = null,

  currentDamageCallback = null,
  currentDamageTargetKey = null,
  currentPlayerOrder = null,
  currentPhaseKey = null,
  currentPlayerId = null,
  currentPaymentCoinId = null,
  currentHandCallback = null,
  currentMoves = [],
  currentMove = null,
  currentRound = 0,
  inputCallbackStack = [],

  playerToBag = {},
  playerToDiscardFacedown = {},
  playerToDiscardFaceup = {},
  playerToHand = {},
  playerToMorgue = {},
  playerToStrategy = {},
  playerToSupply = {},
  playerToTableau = {},

  coinInstances = {},
  playerInstances = {},
} = {}) =>
  Immutable({
    anToCoinKey,
    anToControl,
    anToTokens,
    appName,
    delay,
    gameRecords,
    initiativeChangedThisRound,
    initiativePlayerId,
    isGameOver,
    isTwoPlayer,
    isVerbose,
    mctsRoot,
    userMessage,

    currentDamageCallback,
    currentDamageTargetKey,
    currentPlayerOrder,
    currentPhaseKey,
    currentPlayerId,
    currentPaymentCoinId,
    currentHandCallback,
    currentMoves,
    currentMove,
    currentRound,
    inputCallbackStack,

    playerToBag,
    playerToDiscardFacedown,
    playerToDiscardFaceup,
    playerToHand,
    playerToMorgue,
    playerToStrategy,
    playerToSupply,
    playerToTableau,

    coinInstances,
    playerInstances,
  });

Object.freeze(AppState);

export default AppState;
