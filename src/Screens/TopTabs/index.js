import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Members from '../Members';
import Supporters from '../Supporters';
const Tab = createMaterialTopTabNavigator();
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
        name="Members"
        component={Members}
        options={{
          tabBarLabel: 'ГИШҮҮД',
        }}
      />
      <Tab.Screen
        name="Supports"
        component={Supporters}
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
