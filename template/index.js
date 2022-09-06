import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { store } from './src/core/store/store'
import { Provider } from 'react-redux'
import { useAppDispatch,useAppSelector } from './src/core/store/hook';
import { fetchData } from './src/core/store/slide/fetchDataSlide';

// store.dispatch(fetchData("http://localhost:8000/homedb_v2.json"));
// console.log(store.getState().app_data);
const RNRedux = () => (
    <Provider store = { store }>
      <App />
    </Provider>
  )
AppRegistry.registerComponent(appName, () => RNRedux);