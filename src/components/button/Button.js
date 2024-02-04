import React from 'react';
import './button.scss';

const Button = ({ title, backgroundColor = '#5741d9', callback }) => {
  return (
    <button className="button-container" style={{ backgroundColor }} onClick={callback}>
      {title}
    </button>
  );
};

export default Button;
