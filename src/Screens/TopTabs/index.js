import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Members from '../Members';
import Supporters from '../Supporters';
import Search from '../Search';
import Regions from '../../Screens/Regions';
import Delgerenguis from '../../Screens/Delgerenguis';
import {UserState} from '../../Context/UserStore';

const Tab = createMaterialTopTabNavigator();
// const MembersWithSearch = createStackNavigator();
// const SupportersWithSearch = createStackNavigator();
const Toirog = createStackNavigator();

// const MwS = () => (
//   <MembersWithSearch.Navigator>
//     <MembersWithSearch.Screen
//       name="Members"
//       component={Members}
//       options={{headerShown: false}}
//     />
//     <MembersWithSearch.Screen
//       name="Search"
//       component={Search}
//       options={{headerShown: false}}
//     />
//   </MembersWithSearch.Navigator>
// );

// const SwS = () => (
//   <SupportersWithSearch.Navigator>
//     <SupportersWithSearch.Screen
//       name="Supporters"
//       component={Supporters}
//       options={{headerShown: false}}
//     />
//     <SupportersWithSearch.Screen
//       name="Search"
//       component={Search}
//       options={{headerShown: false}}
//     />
//   </SupportersWithSearch.Navigator>
// );

const TopTabs = () => {
  const {state} = useContext(UserState);
  const normalStyle = {
    width: '15%',
    alignSelf: 'center',
    marginHorizontal: '11%',
  };
  const adminStyle = {
    width: '20%',
    alignSelf: 'center',
    marginHorizontal: '40%',
  };
  const style =
    state.userRole === 'Admin' || state.userRole === 'Super admin'
      ? adminStyle
      : normalStyle;
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {fontWeight: 'bold', fontSize: 15},
        indicatorStyle: {
          backgroundColor: '#000000',
          borderRadius: 5,
          height: 4,

          ...style,
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
      {state.userRole === 'Admin' || state.userRole === 'Super admin' ? (
        <Tab.Screen
          name="Regions"
          component={Regions}
          options={{
            tabBarLabel: 'ТОЙРГУУД',
          }}
        />
      ) : (
        <>
          <Tab.Screen
            name="Members"
            component={Members}
            options={{
              tabBarLabel: 'ГИШҮҮД',
            }}
          />
          <Tab.Screen
            name="Supporters"
            component={Supporters}
            options={{
              tabBarLabel: 'ДЭМЖИГЧИД',
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

const RaD = () => (
  <Toirog.Navigator>
    <Toirog.Screen
      name="TopTabs"
      component={TopTabs}
      options={{headerShown: false}}
    />
    <Toirog.Screen
      name="Delgerenguis"
      component={Delgerenguis}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Supporters"
      component={Supporters}
      options={{headerShown: false}}
      // options={{
      //   tabBarLabel: 'ДЭМЖИГЧИД',
      // }}
    />
  </Toirog.Navigator>
);

export default RaD;
