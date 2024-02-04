import React, { useEffect } from 'react';
import useWebSocket from "react-use-websocket";

import TitleRow from "./Title/Title";
import "./styles.scss"
import PriceLevelRow from "./PriceRow/PriceRow";
import Spread from "../Spread/Spread";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addAsks, addBids, addExistingState, selectAsks, selectBids } from './OrderbkSlice';
import { MOBILE_WIDTH, ORDERBOOK_LEVELS } from "../constants";
import Loader from '../Loader/Loader'
import DepthVisualizer from "../depthVisualizer/DepthVisualizer";
import "./PriceRow/PriceRow.scss";
import { ProductsMap } from "../../App";
import { formatNumber } from '../../utils';

const WSS_FEED_URL = 'wss://www.cryptofacilities.com/ws/v1';

export const OrderType = {
  BIDS: 'BIDS',
  ASKS: 'ASKS'
};

let currentBids = [];
let currentAsks = [];

const OrderBook = ({ windowWidth, productId, isFeedKilled }) => {
  const bids = useAppSelector(selectBids);
  const asks = useAppSelector(selectAsks);
  const dispatch = useAppDispatch();
  const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => processMessages(event)
  });

  const processMessages = (event) => {
    const response = JSON.parse(event.data);

    if (response.numLevels) {
      dispatch(addExistingState(response));
    } else {
      process(response);
    }
  };

  useEffect(() => {
    function connect(product) {
      const unSubscribeMessage = {
        event: 'unsubscribe',
        feed: 'book_ui_1',
        product_ids: [ProductsMap[product]]
      };
      sendJsonMessage(unSubscribeMessage);

      const subscribeMessage = {
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: [product]
      };
      sendJsonMessage(subscribeMessage);
    }

    if (isFeedKilled) {
      getWebSocket()?.close();
    } else {
      connect(productId);
    }
  }, [isFeedKilled, productId, sendJsonMessage, getWebSocket]);

  const process = (data) => {
    if (data?.bids?.length > 0) {
      currentBids = [...currentBids, ...data.bids];

      if (currentBids.length > ORDERBOOK_LEVELS) {
        dispatch(addBids(currentBids));
        currentBids = [];
        currentBids.length = 0;
      }
    }
    if (data?.asks?.length >= 0) {
      currentAsks = [...currentAsks, ...data.asks];

      if (currentAsks.length > ORDERBOOK_LEVELS) {
        dispatch(addAsks(currentAsks));
        currentAsks = [];
        currentAsks.length = 0;
      }
    }
  };

  const formatPrice = (arg) => {
    return arg.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })
  };

  const buildPriceLevels = (levels, orderType = OrderType.BIDS) => {
    const sortedLevelsByPrice = [...levels].sort((currentLevel, nextLevel) => {
      let result = 0;
      if (orderType === OrderType.BIDS || windowWidth < MOBILE_WIDTH) {
        result = nextLevel[0] - currentLevel[0];
      } else {
        result = currentLevel[0] - nextLevel[0];
      }
      return result;
    });

    return sortedLevelsByPrice.map((level, idx) => {
      const calculatedTotal = level[2];
      const total = formatNumber(calculatedTotal);
      const depth = level[3];
      const size = formatNumber(level[1]);
      const price = formatPrice(level[0]);

      return (
        <div className='price-level-row-container' key={idx + depth}>
          <DepthVisualizer key={depth} windowWidth={windowWidth} depth={depth} orderType={orderType} />
          <PriceLevelRow key={size + total}
            total={total}
            size={size}
            price={price}
            reversedFieldsOrder={orderType === OrderType.ASKS}
            windowWidth={windowWidth} />
        </div>
      );
    });
  };

  // return (
  //   React.createElement(Container, null,
  //     bids.length && asks.length ?
  //       React.createElement(React.Fragment, null,
  //         React.createElement(TableContainer, null,
  //           windowWidth > MOBILE_WIDTH && React.createElement(TitleRow, { windowWidth: windowWidth, reversedFieldsOrder: false }),
  //           React.createElement("div", null, buildPriceLevels(bids, OrderType.BIDS))
  //         ),
  //         React.createElement(Spread, { bids: bids, asks: asks }),
  //         React.createElement(TableContainer, null,
  //           React.createElement(TitleRow, { windowWidth: windowWidth, reversedFieldsOrder: true }),
  //           React.createElement("div", null, buildPriceLevels(asks, OrderType.ASKS))
  //         )
  //       ) :
  //       React.createElement(Loader, null)
  //   )
  // );
  return (
    <div className="container">
    {bids.length && asks.length ? (
      <>
        <div className="table-container">
          {windowWidth > MOBILE_WIDTH && <TitleRow windowWidth={windowWidth} reversedFieldsOrder={false} />}
          <div>{buildPriceLevels(bids, OrderType.BIDS)}</div>
        </div>
        {/* <Spread bids={bids} asks={asks} /> */}
        <div className="table-container">
          <TitleRow windowWidth={windowWidth} reversedFieldsOrder={true} />
          <div>{buildPriceLevels(asks, OrderType.ASKS)}</div>
        </div>
      </>
    ) : (
      <Loader />
    )}
  </div>
  
  );
  
};

export default OrderBook;  