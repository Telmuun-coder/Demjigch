import React from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Button = (props) => {
  return (
    <TouchableHighlight
      disabled={props.disabled}
      style={[
        {borderRadius: 50, overflow: 'hidden'},
        props.disabled && styles.dis,
      ]}
      onPress={() => props.onClick()}>
      <View style={styles.buttonView}>
        <Text style={styles.title}>{props.title.toUpperCase()}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.065,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E11E1C',
  },
  dis: {
    opacity: 0.5,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;
