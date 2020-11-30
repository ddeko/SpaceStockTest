import { Provider } from 'react-redux';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './src/redux/rootReducer';

import AppView from "./src/modules/AppViewContainer";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const App = () => {
    return (
        <Provider store={store}>  
            <AppView/>
        </Provider>
    );
};

export default App;

