import React from 'react';
import ReactDOM from 'react-dom';
import Pokemon from './Pokemon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pokemon />, div);
});
