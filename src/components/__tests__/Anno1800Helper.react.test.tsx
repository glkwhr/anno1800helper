import React from 'react';
import ReactDOM from 'react-dom';
import {params} from '../../data/params_2019-04-17_full'
import Anno1800Helper from '../Anno1800Helper.react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Anno1800Helper data={params}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
