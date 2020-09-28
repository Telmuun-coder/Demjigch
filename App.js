import React, {useMemo, useState, useEffect, useContext} from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';
import AwIcon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Members from './src/Screens/Members';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/Screens/Splash';
import AddMember from './src/Screens/AddMember';
import TopTabs from './src/Screens/TopTabs';
import Login from './src/Screens/Login';
import User from './src/Screens/User';
import Spinner from './src/Components/Spinner';
import UserStore, {UserState} from './src/Context/UserStore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createBottomTabNavigator();

function MyTabs() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setHide(true);
  };

  const _keyboardDidHide = () => {
    setHide(false);
  };
  return (
    <Tab.Navigator
      // initialRouteName="Members"
      initialRouteName="AddMember"
      tabBarOptions={{
        style: hide && {
          position: 'absolute',
          top: windowHeight * 0.905,
          bottom: 0,
        },
        activeTintColor: '#E51F1D',
        showLabel: false,
      }}>
      <Tab.Screen
        name="Members"
        component={TopTabs}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FIcon name="user-check" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddMember"
        component={AddMember}
        // listeners={{
        //   tabPress: (e) => {
        //     // Prevent default action
        //     console.log('calledMe');
        //     //e.preventDefault();
        //   },
        // }}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                width: 80,
                height: 80,
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderRadius: 60,
                paddingTop: 10,
                marginBottom: 30,
              }}>
              <View
                style={{
                  backgroundColor: color,
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginBottom: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 5,
                }}>
                <Icon name="pluscircleo" color="#FFFFFF" size={40} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          // tabBarBadge: 3,
          tabBarIcon: ({color, size}) => (
            <AwIcon name="user-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const stack = createStackNavigator();
const App = () => {
  const {state, showSplash} = useContext(UserState);
  // useEffect(() => {
  //   setTimeout(() => setShowSplash(false), 1000);
  // }, []);
  return (
    <NavigationContainer>
      <stack.Navigator>
        {showSplash ? (
          <stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
        ) : state.token ? (
          <stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{headerShown: false}}
          />
        ) : (
          <stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
