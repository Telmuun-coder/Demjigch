import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Liner = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.range}>
        <View
          style={[
            styles.range,
            {backgroundColor: '#E51F1D', width: `${(125 / 500) * 100}%`},
          ]}
        />
      </View>
      <View style={styles.numContainer}>
        <Text style={[styles.num, {color: '#E51F1D'}]}>125</Text>
        <Text style={styles.num}>/</Text>
        <Text style={styles.num}>500</Text>
      </View>
    </View>
  );
};

export default Liner;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    // backgroundColor: 'green',
  },
  range: {
    width: '100%',
    height: 3,
    borderRadius: 3,
    backgroundColor: '#CCCCCC',
  },
  line: {},
  numContainer: {
    flexDirection: 'row',
  },
  num: {
    fontSize: 10,
    color: '#B7B7B7',
  },
});
