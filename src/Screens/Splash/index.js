import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Button from '../../Components/Button';
import Input from '../../Components/Input';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../../Images/logoTom.png')} />
      <Input title="Овог" />
      <Button title="Сонгууль өгсөн" />
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
