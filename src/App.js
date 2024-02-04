import React, { useEffect, useState } from 'react';
// import GlobalStyle from "./components/globalStyles/styles.scss";
import "./components/globalStyles/styles.scss"
import Header from "./components/Header/Header"
import OrderBook from './components/OrderBook/main';
import Footer from "./components/Footer/Footer";
import StatusMessage from "./components/StatusMsg/StatusMsg";
import { clearOrdersState } from "./components/OrderBook/OrderbkSlice" 
import { useAppDispatch } from './hooks';

export const ProductIds = {
  XBTUSD: 'PI_XBTUSD',
  ETHUSD: 'PI_ETHUSD'
};

const options = {
  PI_XBTUSD: [0.5, 1, 2.5],
  PI_ETHUSD: [0.05, 0.1, 0.25]
};

export const ProductsMap = {
  "PI_XBTUSD": "PI_ETHUSD",
  "PI_ETHUSD": "PI_XBTUSD",
};

function App() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [productId, setProductId] = useState(ProductIds.XBTUSD);
  const [isFeedKilled, setIsFeedKilled] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const dispatch = useAppDispatch();

  // Window width detection
  useEffect(() => {
    console.log('Window width:', windowWidth);
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowWidth(() => window.innerWidth);
    console.log('Window width:', windowWidth);
  }, []);

  // Page Visibility detection
  useEffect(() => {
    let hidden = '';
    let visibilityChange = '';

    console.log('Page visibility:', isPageVisible);
    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else {
      if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
      } else {
        if (typeof document.webkitHidden !== 'undefined') {
          hidden = 'webkitHidden';
          visibilityChange = 'webkitvisibilitychange';
        }
      }
    }

    const handleVisibilityChange = () => {
      const isHidden = document['hidden'];
      if (isHidden) {
        document.title = 'Orderbook Paused';
        setIsPageVisible(false);
      } else {
        document.title = 'Orderbook';
        setIsPageVisible(true);
      }
    };

    if (typeof document.addEventListener === 'undefined' || hidden === '') {
      console.log('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.');
    } else {
      document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
    console.log('Page visibility:', isPageVisible);
  }, []);

  const toggleProductId = () => {
    dispatch(clearOrdersState());
    setProductId(ProductsMap[productId]);
  };

  const toggleFeed = () => {
    setIsFeedKilled(!isFeedKilled);
  };

  return (
    <>
      {isPageVisible ? (
        <>
          {/* <GlobalStyle /> */}
          
          <Header options={options[productId]} />
          <OrderBook windowWidth={windowWidth} productId={productId} isFeedKilled={isFeedKilled} />
          <Footer toggleFeedCallback={toggleProductId} killFeedCallback={toggleFeed} isFeedKilled={isFeedKilled} />
          {/* <StatusMessage isFeedKilled={isFeedKilled} selectedMarket={productId} /> */}
        </>
      ) : (
        'HIDDEN PAGE.'
      )}
    </>
  );
}

export default App;
