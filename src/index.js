import React from 'react'
import ReactDOM from 'react-dom'

import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

import database from './reducers.js'
import {DataTable} from './DataTable.js'

import logo from './logo.png'
import background from './pattern.png'
import './index.css'
import './favicon.ico';

const store = createStore(combineReducers({database}))

const Header = () =>
  <div className="header">
    <img src={logo} className="logo" alt="Logo"/>
  </div>

ReactDOM.render(
    <Provider store={store}>
        <div className="database-app">
          <img src={background} className="background" alt="Logo"/>
          <Header />
          <DataTable/>
        </div>
    </Provider>,
    document.getElementById('root')
)
