import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import ProImg from '../ProImg';
import Icon from 'react-native-vector-icons/AntDesign';
import Mood from '../Mood';

const Human = (props) => {
  const [show, setShow] = useState(false);
  return (
    <TouchableNativeFeedback
      useForeground={false}
      background={TouchableNativeFeedback.Ripple('#5F5F5F')}
      onPress={() => setShow(true)}>
      <View style={styles.container}>
        <Mood show={show} setShow={() => setShow(false)} />
        {props.checked && (
          <Icon
            style={styles.check}
            name="checkcircle"
            color={'#EC1A21'}
            size={24}
          />
        )}
        <ProImg mini={true} color="#F0F0F0" uri={null} />
        <Text style={styles.name}>Ц.Наранцэцэг</Text>
        <Text style={styles.mail}>narantsetseg@gmail.com</Text>
        <Text style={styles.num}>88982212</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Human;

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
