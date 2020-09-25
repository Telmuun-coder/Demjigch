import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserState} from '../../Context/UserStore';

const Error = () => {
  const {state} = useContext(UserState);
  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <Text style={{color: 'red'}}>{state.error}</Text>
    </View>
  );
};

export default Error;
