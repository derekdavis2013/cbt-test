import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { Route } from 'react-router-dom';
import rootReducer from './reducers';
import { Home } from './components/pages';
import { Person } from './components/pages';

// Only grid and table styles
import './style/bootstrap.css';
import './style/myStyles.css';

const history = createHistory();

const middleware = composeWithDevTools(
    applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware
    )
);

const store = createStore(
    rootReducer,
    middleware
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route path="/">
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/person/:id" component={Person} />
                    </div>
                </Route>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
