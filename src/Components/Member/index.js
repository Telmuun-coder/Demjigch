import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProImg from '../ProImg';
import Liner from '../Liner';

const Member = (props) => {
  return (
    // <TouchableNativeFeedback
    //   useForeground={false}
    //   background={TouchableNativeFeedback.Ripple('#5F5F5F')}
    //   onPress={() => setShow(true)}>
    <View style={styles.container}>
      <ProImg mini={true} color="#F0F0F0" uri={null} />
      <Text style={styles.name}>Ц.Наранцэцэг</Text>
      <Liner />
    </View>
    // </TouchableNativeFeedback>
  );
};

export default Member;

const styles = StyleSheet.create({
  container: {
    width: 100,
    // backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {fontSize: 12, fontWeight: 'bold', color: '#000000'},
  mail: {
    fontSize: 8,
    color: '#000000',
    opacity: 0.87,
  },
  numm: {
    fontSize: 10,
    color: '#000000',
    opacity: 0.87,
  },
  check: {
    zIndex: 100,
    position: 'absolute',
    right: 10,
    top: 15,
  },
});
