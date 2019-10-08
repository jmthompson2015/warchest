import Resolver from "../artifact/Resolver.js";

import CoinState from "../state/CoinState.js";

import CardsUI from "./CardsUI.js";
import CoinsUI from "./CoinsUI.js";
import Endpoint from "./Endpoint.js";
import MoveOptionDialog from "./MoveOptionDialog.js";

const { CollapsiblePane, ReactUtilities: RU, TitledElement } = ReactComponent;

const titleClass = "b bg-wc-dark f6 tc wc-light";

const createCoinStates = coinKeys => {
  const reduceFunction = (accum, coinKey) => {
    const coinState0 = accum[coinKey];
    const count = coinState0 ? coinState0.count : 0;
    const coinState = CoinState.create({ coinKey, count: count + 1 });
    return R.assoc(coinKey, coinState, accum);
  };
  const coinStateMap = R.reduce(reduceFunction, {}, coinKeys);

  return Object.values(coinStateMap);
};

const createDiscardUI = (player, discardFacedown, discardFaceup, resourceBase) => {
  const coinStates1 =
    discardFacedown.length > 0
      ? [
          CoinState.create({
            coinKey: player.teamKey,
            count: discardFacedown.length,
            isFaceup: false
          })
        ]
      : [];
  const coinStates2 = createCoinStates(discardFaceup);
  const coinStates = R.concat(coinStates1, coinStates2);
  const customKey = "discard";
  const element = React.createElement(CoinsUI, { coinStates, customKey, resourceBase });

  return React.createElement(TitledElement, {
    key: "discard",
    element,
    title: "Discard",
    titleClass
  });
};

const createHandUI = (hand, paymentCoin, resourceBase, onClick) => {
  const reduceFunction = (accum, coinKey) => {
    const isHighlighted = !R.isNil(paymentCoin) && coinKey === paymentCoin.key;
    const coinState = CoinState.create({ coinKey, isHighlighted });
    return R.append(coinState, accum);
  };
  const coinStates = R.reduce(reduceFunction, [], hand);
  const customKey = "hand";
  const eventSource = "hand";
  const element = React.createElement(CoinsUI, {
    coinStates,
    customKey,
    eventSource,
    onClick,
    resourceBase
  });

  return React.createElement(TitledElement, { key: "hand", element, title: "Hand", titleClass });
};

const createInitiativeUI = (initiativeTeamKey, resourceBase) => {
  const coinStates = [CoinState.create({ coinKey: initiativeTeamKey })];
  const customKey = "initiative";
  const element = React.createElement(CoinsUI, { coinStates, customKey, resourceBase });

  return React.createElement(TitledElement, {
    key: "initiative",
    element,
    title: "Initiative",
    titleClass
  });
};

const createInputArea = (callback, moveStates, paymentCoin, player) => {
  const customKey = `inputArea${player.id}`;
  let element;

  if (!R.isEmpty(moveStates)) {
    element = React.createElement(MoveOptionDialog, {
      callback,
      moveStates,
      paymentCoin,
      player,
      customKey: "move"
    });
  }

  return ReactDOMFactories.div({ key: customKey, id: customKey }, element);
};

const createMorgueUI = (morgue, resourceBase) => {
  const coinStates = createCoinStates(morgue);
  const customKey = "morgue";
  const element = React.createElement(CoinsUI, { coinStates, customKey, resourceBase });

  return React.createElement(TitledElement, {
    key: "morgue",
    element,
    title: "Morgue",
    titleClass
  });
};

const createSupplyUI = (supply, resourceBase) => {
  const coinStates = createCoinStates(supply);
  const customKey = "supply";
  const element = React.createElement(CoinsUI, { coinStates, customKey, resourceBase });

  return React.createElement(TitledElement, {
    key: "supply",
    element,
    title: "Supply",
    titleClass
  });
};

const createTableauUI = (tableau, resourceBase) => {
  const cards = Resolver.cards(tableau);
  const customKey = "tableau";
  const element = React.createElement(CardsUI, { cards, customKey, resourceBase, width: 125 });

  return React.createElement(CollapsiblePane, {
    key: "tableau",
    element,
    className: "bg-wc-medium ma1",
    header: "Tableau",
    headerClass: titleClass
  });
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
class PlayerPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handOnClick = this.handOnClickFunction.bind(this);
  }

  handOnClickFunction(props) {
    const { handOnClick, player } = this.props;

    handOnClick(R.merge(props, { playerId: player.id }));
  }

  render() {
    const {
      player,

      discardFacedown,
      discardFaceup,
      hand,
      morgue,
      supply,
      tableau,

      className,
      customKey,
      inputCallback,
      isInitiativePlayer,
      moveStates,
      paymentCoin,
      resourceBase
    } = this.props;

    let cells = [];

    if (isInitiativePlayer) {
      const initiativeUI = createInitiativeUI(player.teamKey, resourceBase);
      cells = R.append(initiativeUI, cells);
    }

    if (!R.isEmpty(discardFacedown) || !R.isEmpty(discardFaceup)) {
      const discardUI = createDiscardUI(player, discardFacedown, discardFaceup, resourceBase);
      cells = R.append(discardUI, cells);
    }

    if (!R.isEmpty(hand)) {
      const handUI = createHandUI(hand, paymentCoin, resourceBase, this.handOnClick);
      cells = R.append(handUI, cells);
    }

    if (!R.isEmpty(morgue)) {
      const morgueUI = createMorgueUI(morgue, resourceBase);
      cells = R.append(morgueUI, cells);
    }

    if (!R.isEmpty(supply)) {
      const supplyUI = createSupplyUI(supply, resourceBase);
      cells = R.append(supplyUI, cells);
    }

    const tableauUI = createTableauUI(tableau, resourceBase);
    cells = R.append(tableauUI, cells);

    if (!R.isNil(paymentCoin)) {
      const inputArea = createInputArea(inputCallback, moveStates, paymentCoin, player);
      cells = R.append(inputArea, cells);
    }

    const element = RU.createFlexboxWrap(cells, customKey, className);
    const title = `Player ${player.name}`;

    return React.createElement(TitledElement, {
      element,
      title,
      className: "bg-wc-light",
      titleClass: `b bg-wc-medium f4 tc`
    });
  }
}

PlayerPanel.propTypes = {
  player: PropTypes.shape().isRequired,

  discardFaceup: PropTypes.arrayOf(PropTypes.string).isRequired,
  discardFacedown: PropTypes.arrayOf(PropTypes.string).isRequired,
  hand: PropTypes.arrayOf(PropTypes.string).isRequired,
  morgue: PropTypes.arrayOf(PropTypes.string).isRequired,
  supply: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableau: PropTypes.arrayOf(PropTypes.string).isRequired,

  className: PropTypes.string,
  customKey: PropTypes.string,
  handOnClick: PropTypes.func,
  inputCallback: PropTypes.func,
  isInitiativePlayer: PropTypes.bool,
  moveStates: PropTypes.arrayOf(PropTypes.shape()),
  paymentCoin: PropTypes.shape(),
  resourceBase: PropTypes.string
};

PlayerPanel.defaultProps = {
  className: undefined,
  customKey: "playerPanel",
  handOnClick: () => {},
  inputCallback: () => {},
  isInitiativePlayer: false,
  moveStates: undefined,
  paymentCoin: undefined,
  resourceBase: Endpoint.NETWORK_RESOURCE
};

export default PlayerPanel;
