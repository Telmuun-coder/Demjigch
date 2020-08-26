import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Input = (props) => {
  const [val, setVal] = useState(props.value ? props.value : 'Эрдэнэбат');
  return (
    <View style={[styles.inputContainer, props.danger && styles.danger]}>
      <Text style={styles.type}>{props.title}</Text>
      <TextInput
        // onFocus={() => {
        //   props.onChange(val);
        // }}
        onChangeText={(e) => {
          // props.onChange(e);
          setVal(e);
        }}
        placeholder={props.placeHolder ? props.placeHolder : null}
        style={styles.input}
        maxLength={props.type === 'number' ? 12 : 16}
        autoCorrect={false}
        autoFocus={props.focus}
        value={val}
        keyboardType={props.type === 'number' ? 'phone-pad' : 'default'}
        secureTextEntry={props.type === 'password' ? true : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#FAFAFA',
    width: windowWidth * 0.7,
    height: windowHeight * 0.065,
    paddingTop: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    textAlign: 'center',
  },
  type: {
    color: '#BFBFBF',
    fontSize: 10,
    textAlign: 'center',
  },
  input: {
    height: 30,
    fontSize: 16,
    padding: 0,
    paddingBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  danger: {borderWidth: 0.5, borderColor: 'red'},
});

export default Input;
