import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {Switch} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = require('../../Data/Sukhbaatar');

const Pick = (props) => {
  switch (props.type) {
    case 'tolow':
      return (
        <Picker
          style={[styles.picker, {width: '64%'}]}
          selectedValue={props.selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            props.onValueChange(itemValue);
            // console.log('PickerVal', itemValue);
          }}
          mode="dialog">
          {data.elRole.map((e, i) => (
            <Picker.Item key={i} label={e.roleName} value={e} />
          ))}
        </Picker>
      );
    case 'candidates':
      return (
        <Picker
          style={[styles.picker, {width: '65%'}]}
          selectedValue={props.selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            props.onValueChange(itemValue);
          }}
          mode="dialog">
          {props.candidates.map((e, i) => (
            <Picker.Item
              key={i}
              label={e.firstName[0] + '. ' + e.lastName}
              value={e}
            />
          ))}
        </Picker>
      );
    case 'duureg':
      return (
        <Picker
          style={styles.picker}
          selectedValue={props.selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            props.onValueChange(itemValue);
          }}
          mode="dialog">
          {data.elArea.map((e, i) => (
            <Picker.Item key={i} label={e.areaName} value={e} />
          ))}
        </Picker>
      );
    case 'horoo':
      return (
        <Picker
          style={[styles.picker, {width: '67%'}]}
          selectedValue={props.selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            props.onValueChange(itemValue);
          }}
          mode="dialog">
          {data.elCommittee.map((e, i) => {
            // if (props.areaId === null) return;
            // else if (e.areaId === props.areaId)
            return <Picker.Item key={i} label={e.committeeName} value={e} />;
          })}
        </Picker>
      );
    default:
      break;
  }
};

const ViewInput = (props) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.type}>{props.title}</Text>
      <View style={styles.icon}>
        <Icon name="up" color="#787878" size={10} />
        <Icon name="down" color="#787878" size={10} />
      </View>
      <Pick {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#FAFAFA',
    // backgroundColor: 'blue',
    width: windowWidth * 0.7,
    minHeight: windowHeight * 0.065,
    paddingTop: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    textAlign: 'center',
    // marginVertical: 5,
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
  icon: {
    // backgroundColor: 'yellow',
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'column',
    width: 10,
    height: 30,
    justifyContent: 'space-between',
  },
  picker: {
    height: windowHeight * 0.065 * 0.6,
    width: '75%',
    backgroundColor: 'transparent',
    // backgroundColor: 'red',
    textAlign: 'center',
    alignSelf: 'flex-end',
    overflow: 'hidden',
  },
});

export default ViewInput;
