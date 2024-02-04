import React from 'react'
import './PriceRow.scss'
import { MOBILE_WIDTH } from "../../constants";

const PriceRow = ({ total, size, price, reversedFieldsOrder = false, windowWidth }) => {
  return (
    <div className={`price-level-row ${reversedFieldsOrder || windowWidth < 800 ? 'reversed' : ''}`}>
      {reversedFieldsOrder || windowWidth < 800 ? (
        <>
          <span className='price'>{price}</span>
          <span>{size}</span>
          <span>{total}</span>
        </>
      ) : (
        <>
          <span>{total}</span>
          <span>{size}</span>
          <span className='price'>{price}</span>
        </>
      )}
    </div>
  );
};
export default PriceRow;
