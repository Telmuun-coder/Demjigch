import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Members from '../Members';
import Supporters from '../Supporters';
import Search from '../Search';

const Tab = createMaterialTopTabNavigator();
const MembersWithSearch = createStackNavigator();
const SupportersWithSearch = createStackNavigator();
const MwS = () => (
  <MembersWithSearch.Navigator>
    <MembersWithSearch.Screen
      name="Members"
      component={Members}
      options={{headerShown: false}}
    />
    <MembersWithSearch.Screen
      name="Search"
      component={Search}
      options={{headerShown: false}}
    />
  </MembersWithSearch.Navigator>
);
const SwS = () => (
  <SupportersWithSearch.Navigator>
    <SupportersWithSearch.Screen
      name="Supporters"
      component={Supporters}
      options={{headerShown: false}}
    />
    <SupportersWithSearch.Screen
      name="Search"
      component={Search}
      options={{headerShown: false}}
    />
  </SupportersWithSearch.Navigator>
);
const TopTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {fontWeight: 'bold', fontSize: 15},
        indicatorStyle: {
          backgroundColor: '#000000',
          height: 4,
          width: 72,
          alignSelf: 'center',
          borderRadius: 5,
          marginHorizontal: '10%',
        },
        indicatorContainerStyle: {
          backgroundColor: '#F0F0F0',
          elevation: 0,
          shadowColor: 'transparent',
          shadowOffset: {width: 0, height: 0}, // change this for more shadow
          shadowOpacity: 0,
          shadowRadius: 0,
        },
      }}>
      <Tab.Screen
        name="MwS"
        component={MwS}
        options={{
          tabBarLabel: 'ГИШҮҮД',
        }}
      />
      <Tab.Screen
        name="SwS"
        component={SwS}
        options={{
          tabBarLabel: 'ДЭМЖИГЧИД',
        }}
      />
      {/* <Tab.Screen
        name="Regions"
        component={Members}
        options={{
          tabBarLabel: 'ТОЙРГУУД',
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default TopTabs;
