import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'

const store = createStore(() => null)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') // eslint-disable-line no-undef
)
