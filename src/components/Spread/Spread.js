import React from 'react';
import "./Spread.scss";
import { formatNumber } from "../../utils";

const Spread = ({ bids, asks }) => {
  const getHighestBid = (bids) => {
    const prices = bids.map(bid => bid[0]);
    return Math.max.apply(Math, prices);
  };

  const getLowestAsk = (asks) => {
    const prices = asks.map(ask => ask[0]);
    return Math.min.apply(Math, prices);
  };

  const getSpreadAmount = (bids, asks) => Math.abs(getHighestBid(bids) - getLowestAsk(asks));

  const getSpreadPercentage = (spread, highestBid) => `(${((spread * 100) / highestBid).toFixed(2)}%)`;

  return (
    <div className='spread-container'>
      Spread: {formatNumber(getSpreadAmount(bids, asks))} {getSpreadPercentage(getSpreadAmount(bids, asks), getHighestBid(bids))}
    </div>
  );
};

export default Spread;
