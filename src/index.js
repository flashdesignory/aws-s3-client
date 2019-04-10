import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import './index.scss';

function renderDisplay() {
  return (
    <div className="app-container">
      <App />
    </div>
  );
}

ReactDOM.render(
  renderDisplay(),
  document.getElementById('root'),
);
