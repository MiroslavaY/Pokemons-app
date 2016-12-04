import React from 'react';
import ReactDOM from 'react-dom';
import PokeTable from './PokeTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PokeTable />, div);
});
