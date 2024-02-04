import React from 'react';
import { MOBILE_WIDTH } from "../constants";
import { OrderType } from '../OrderBook/main';
// import './DepthVisualizer.scss';

// const DepthVisualizerColors = {
//   BIDS: "#113534",
//   ASKS: "#3d1e28"
// };


// const DepthVisualizer = ({ windowWidth, depth, orderType }) => {
//   return <div className={`depth-visualizer ${orderType.toLowerCase()}`} data-testid="depth-visualizer" style={{
//     width: `${depth}%`,
//     left: `${orderType === 'bids' && windowWidth > MOBILE_WIDTH ? `${100 - depth}%` : 0}`,
//   }} />;
// };


const DepthVisualizerColors = {
  BIDS: "#113534",
  ASKS: "#3d1e28"
};

const DepthVisualizer = ({ windowWidth, depth, orderType }) => {
  return (
    <div
      data-testid="depth-visualizer"
      style={{
        backgroundColor: `${orderType === OrderType.BIDS ? DepthVisualizerColors.BIDS : DepthVisualizerColors.ASKS}`,
        height: "1.250em",
        width: `${depth}%`,
        position: "relative",
        top: 21,
        left: `${orderType === OrderType.BIDS && windowWidth > MOBILE_WIDTH ? `${100 - depth}%` : 0}`,
        marginTop: -24,
        zIndex: 1,
      }}
    />
  );
};

export default DepthVisualizer;
