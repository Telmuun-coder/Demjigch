import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {Grayscale} from 'react-native-color-matrix-image-filters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ProImg = (props) => {
  return (
    <View
      style={[
        styles.frame,
        props.mini && {
          width: 110,
          height: 90,
          backgroundColor: props.color,
        },
      ]}>
      <View style={[styles.topLeft, {backgroundColor: props.color}]} />
      <View style={[styles.topRight, {backgroundColor: props.color}]} />
      <View style={[styles.bottomLeft, {backgroundColor: props.color}]} />
      <View style={[styles.bottomRight, {backgroundColor: props.color}]} />
      <Grayscale amount={0.9}>
        <Image
          style={[
            styles.img,
            props.mini && {
              marginTop: 15,
              width: 95,
              height: 75,
            },
          ]}
          // source={require('../../Images/hurelee.jpg')}
          source={
            props.uri ? {uri: props.uri} : require('../../Images/hurelee.jpg')
          }
          // source={require('../../Images/Pure.png')}
          // source={{
          //   uri:
          //     'https://lh3.googleusercontent.com/proxy/Lge7eTOMGGCNofaXd0CGEWMX-e_p9dsu6uV1puPwMuSKc0n9yFz_cEPXcwVuvh3oFXXhQQqH5B4lVA6wbbqvzZ5xvDezsZP0pT9FWJ2yl2W8Xe5fxMzdHdUnYgLaKZsuDvEAUlSnUA',
          // }}
        />
      </Grayscale>
    </View>
  );
};

export default ProImg;

const styles = StyleSheet.create({
  img: {
    width: 150, //100,
    height: 150, //90,
  },
  frame: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 10,
    width: 150, //100,
    height: 150, //90,
    overflow: 'hidden',
  },
  topLeft: {
    zIndex: 10,
    position: 'absolute',
    top: -44,
    left: 0,
    transform: [{rotate: '54deg'}],
    width: 50,
    height: 100,
    backgroundColor: 'blue',
  },
  topRight: {
    zIndex: 10,
    position: 'absolute',
    top: -44,
    right: 0,
    transform: [{rotate: '-54deg'}],
    width: 50,
    height: 100,
    backgroundColor: 'blue',
  },
  bottomLeft: {
    zIndex: 10,
    position: 'absolute',
    bottom: 20,
    left: -85,
    transform: [{rotate: '-108deg'}],
    width: 150,
    height: 50,
    backgroundColor: 'blue',
  },
  bottomRight: {
    zIndex: 10,
    position: 'absolute',
    bottom: 20,
    right: -85,
    transform: [{rotate: '108deg'}],
    width: 150,
    height: 50,
    backgroundColor: 'blue',
  },
});
