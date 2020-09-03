/**
 * @format
 */
import React from 'react';
import UserStore from './src/Context/UserStore';
import {AppRegistry} from 'react-native';
import App from './App';
import Region from './src/Screens/Toirguud/Regions';
import Dewshigch from './src/Screens/Toirguud/Dewshigch';
import {name as appName} from './app.json';
import Search from './src/Screens/Search';
const Container = () => (
  <UserStore>
    <App />
  </UserStore>
);

AppRegistry.registerComponent(appName, () => Container);
