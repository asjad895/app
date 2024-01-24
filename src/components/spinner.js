import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = ({ message }) => {
  return (
    <div className="spinner-container">
      <FontAwesomeIcon icon={faSpinner} className="fa-spin" size="3x" />
      {message && <div className="spinner-message">{message}</div>}
    </div>
  );
};

export default Spinner;
