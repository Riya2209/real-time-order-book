import React from 'react';
import  "./Title.scss";
import { MOBILE_WIDTH } from "../../constants";

const Title = ({ reversedFieldsOrder = false, windowWidth }) => {
  return (
    <div className={`title-row ${reversedFieldsOrder || windowWidth < 800 ? 'reversed' : ''}`} data-testid='title-row'>
      {reversedFieldsOrder || windowWidth < 800 ? (
        <>
          <span>PRICE</span>
          <span>SIZE</span>
          <span>TOTAL</span>
        </>
      ) : (
        <>
          <span>TOTAL</span>
          <span>SIZE</span>
          <span>PRICE</span>
        </>
      )}
    </div>
  );
};

export default Title;
