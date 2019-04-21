import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import Anno1800Helper from './components/Anno1800Helper.react';
import './css/index.css';
import store from './redux/store'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider store={store}><Anno1800Helper/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
