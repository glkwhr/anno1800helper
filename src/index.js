import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Anno1800Helper from './Anno1800Helper';
import * as serviceWorker from './serviceWorker';
import { params } from './data/params_2019-04-17_full'

ReactDOM.render(<Anno1800Helper data={params}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
