import React from 'react';
import ReactDOM from 'react-dom';
import Anno1800Helper from '../Anno1800Helper.react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Anno1800Helper/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
