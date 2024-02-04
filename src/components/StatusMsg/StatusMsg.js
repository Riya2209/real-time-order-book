import React from 'react';
import "./StatusMsg.scss";

const StatusMessage = ({ selectedMarket = '', isFeedKilled }) => {
  return (
    <div className='container'>
      {/* {isFeedKilled ? 'Feed killed.' : `Selected market: ${selectedMarket}`} */}
    </div>
  );
};

export default StatusMessage;
