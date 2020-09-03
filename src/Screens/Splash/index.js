import React from 'react';
import {StyleSheet, Image, View, StatusBar} from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F0F0F0" />
      <Image style={styles.img} source={require('../../Images/logoTom.png')} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignContent: 'center',
    // paddingHorizontal: 50,
  },
  img: {
    // marginTop: '20%',
    resizeMode: 'center',
  },
});
