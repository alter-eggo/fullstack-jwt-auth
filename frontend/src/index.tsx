import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './store/store'

interface IStore {
  store: Store
}

const store = new Store()

export const Context = createContext<IStore>({
  store
})

ReactDOM.render(
  <Context.Provider value={{ store }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>,

  document.getElementById('root')
);

