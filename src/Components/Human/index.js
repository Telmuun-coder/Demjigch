import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import ProImg from '../ProImg';
import Icon from 'react-native-vector-icons/AntDesign';
import Mood from '../Mood';
import axios from 'axios';

const Human = (props) => {
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState(props.data.elPromoter.enableFlag);
  const putData = () => {
    const data = {
      candidateId: props.data.candidateId,
      promoterId: props.data.promoterId,
      userId: props.data.userId,
      electionId: props.data.electionId,
      enableFlag: !props.data.enableFlag,
    };
    console.log('dsa', data);
    let config = {
      headers: {
        headers: {'Content-Type': 'application/json'},
      },
    };
    axios
      .put('http://192.168.137.1:8081/election/elPromoter/update', data, config)
      .then((res) => {
        console.log('Flag: ', res.data);
        setFlag(!flag);
      })
      .catch((e) => console.log('FlafError', e.message))
      .finally(() => setShow(false));
  };
  return (
    <TouchableNativeFeedback
      useForeground={false}
      background={TouchableNativeFeedback.Ripple('#5F5F5F')}
      onPress={() => setShow(true)}>
      <View style={styles.container}>
        <Mood
          data={props.data.elPromoter}
          show={show}
          putData={putData}
          setShow={() => setShow(false)}
        />
        {flag && (
          <Icon
            style={styles.check}
            name="checkcircle"
            color={'#EC1A21'}
            size={24}
          />
        )}
        <ProImg
          mini={true}
          color="#F0F0F0"
          uri={props.data.elPromoter.imgPath}
        />
        <Text style={styles.name}>
          {props.data.elPromoter.firstName[0].toUpperCase() +
            '. ' +
            props.data.elPromoter.lastName.toUpperCase()}
        </Text>
        <Text style={styles.mail}>{props.data.elPromoter.email}</Text>
        <Text style={styles.num}>{props.data.elPromoter.phone}</Text>
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
