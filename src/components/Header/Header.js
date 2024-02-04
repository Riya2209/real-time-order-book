import React from 'react';
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCog, faBell, faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';


const Header = ({ options }) => {
  
  const iconStyle = {
    padding: '6px'
  };

  return (
    <div className="header-container">
      <div className='sub-container'>
        <h3>ORDER BOOK BTC/USD</h3>
      </div>
      <div className='sub-container'>
        <FontAwesomeIcon icon={faMinus} style={iconStyle}/>
        <FontAwesomeIcon icon={faPlus} style={iconStyle}/>
        <FontAwesomeIcon icon={faBell} style={iconStyle}/>
        <FontAwesomeIcon icon={faCog} style={iconStyle}/>
        <FontAwesomeIcon icon={faSearchPlus} style={iconStyle}/>
        <FontAwesomeIcon icon={faSearchMinus} style={iconStyle}/>
      </div>
    </div>
  );
};

export default Header;
