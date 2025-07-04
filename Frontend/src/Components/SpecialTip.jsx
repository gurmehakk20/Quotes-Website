import React from 'react';
import '../Styles/SpecialTip.css';

const SpecialTip = ({ tip }) => {
  return (
    <div className="special-tip">
      <div className="tip-content">
        <div className="tip-icon">💡</div>
        <div>
          <h3 className="tip-title">Special About Today</h3>
          <p className="tip-text">{tip}</p>
        </div>
      </div>
    </div>
  );
};

export default SpecialTip;
