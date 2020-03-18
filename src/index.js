import 'unfetch/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import App from './components/App/App';
import './setup-icons';
import './index.css';
import { LearningProvider } from './contexts/LearningContext';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( <BrowserRouter>
    <UserProvider>
        <LearningProvider>
            <App></App>
        </LearningProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();