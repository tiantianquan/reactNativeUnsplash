'use strict'

import React from 'react-native'
import {createStore, applyMiddleware,combineReducers} from 'redux'
import {Provider} from 'react-redux/native'
// import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';

import MainView from './mainView'
import rootReducer from '../reducers'
//
let createStoreWithMiddleware = applyMiddleware(thunk,createLogger())(createStore)
// let reducer = combineReducers(rootReducer)
let store = createStoreWithMiddleware(rootReducer)

const App = React.createClass({
  render() {
    return (
      <Provider store={store}>
        {()=><MainView/>}
      </Provider>
    )
  }
})

export default App
