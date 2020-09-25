/**
 * @format
 */
import React from 'react';
import UserStore from './src/Context/UserStore';
import {AppRegistry} from 'react-native';
import App from './App';
import AddMember from './src/Screens/AddMember';
import {name as appName} from './app.json';
const Container = () => (
  <UserStore>
    {/* <AddMember /> */}
    <App />
  </UserStore>
);

AppRegistry.registerComponent(appName, () => Container);
