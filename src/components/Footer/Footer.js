import React from 'react';
import './Footer.scss';
import Button from '../button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ toggleFeedCallback, killFeedCallback, isFeedKilled }) => {
  return (
    <div className="footer-container">
      
      
      <Button title={'FULL BOOK |'} backgroundColor='transparent'/>
      <div className="online-status-icon">
        <FontAwesomeIcon icon={faCircle} />
      </div>
      <Button title={'REAL TIME'} backgroundColor='transparent'/>

    </div>
  );
};

export default Footer;
