import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import './App.css';
import AppLayout from './component/AppLayout';
import store from './store/Store';
import './styles/css/bootstrap.min.css';
import createHistory from './util/createHistory';

const history = createHistory;

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <AppLayout history={history} />
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
