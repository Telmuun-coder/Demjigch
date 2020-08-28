import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ViewInput = (props) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.type}>{props.title}</Text>
      <Text style={styles.input}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#FAFAFA',
    width: windowWidth * 0.7,
    minHeight: windowHeight * 0.065,
    paddingTop: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    textAlign: 'center',
    marginVertical: 5,
  },
  type: {
    color: '#BFBFBF',
    fontSize: 10,
    textAlign: 'center',
  },
  input: {
    minHeight: 30,
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ViewInput;
