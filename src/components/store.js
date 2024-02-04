import { configureStore } from '@reduxjs/toolkit';
import orderbookReducer from '../components/OrderBook/OrderbkSlice';

export const store = configureStore({
  reducer: {
    orderbook: orderbookReducer,
  },
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState;
