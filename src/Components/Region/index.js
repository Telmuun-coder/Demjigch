import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {formater} from '../../Screens/User';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Region = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        props.navigation.navigate('Delgerenguis', {
          data: props.data,
        })
      }>
      <View style={styles.Toirog}>
        <Text
          style={[
            styles.font1,
            props.data.committeeName == 'Нийслэл' && {
              fontSize: windowHeight * 0.02,
            },
          ]}>
          {props.data.committeeName !== 'Нийслэл'
            ? props.data.committeeName.slice(
                0,
                props.data.committeeName.length - 8,
              )
            : 'Нийслэл'}
        </Text>

        {props.data.committeeName != 'Нийслэл' && (
          <Text style={styles.font2}> ХОРОО</Text>
        )}
      </View>
      <View>
        <Text style={styles.font3}>Нэр дэвшигчид:</Text>
        <Text style={styles.font2}>
          {props.data.candidates.length > 2
            ? props.data.candidates.length
            : props.data.candidates.map(
                (e, i) => e.firstName[0] + '. ' + e.lastName,
              )}
        </Text>
        <Text style={styles.font3}>Сонгуулийн насны иргэд:</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.font4}>{formater(props.data.maxPromoter)}/</Text>
          <Text style={styles.font5}>
            {formater(props.data.signedPromoter)}
          </Text>
        </View>
      </View>
      <Entypo
        name="chevron-right"
        color="grey"
        size={windowHeight * 0.04}
        // alignItems='stretch'
      />
    </TouchableOpacity>
  );
};
export default Region;
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    width: windowWidth * 0.9,
    // height:120,
    flexDirection: 'row',
    borderRadius: windowHeight * 0.013,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  Toirog: {
    backgroundColor: '#F0F0F0',
    height: windowHeight * 0.12,
    width: windowHeight * 0.12,
    borderRadius: windowHeight * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    margin: windowHeight * 0.019,
  },
  font1: {
    fontWeight: 'bold',
    // fontSize:35
    fontSize: windowHeight * 0.05,
  },
  font2: {
    fontWeight: 'bold',
    // fontSize:15
    fontSize: windowHeight * 0.019,
  },
  font3: {
    // fontSize:13,
    fontSize: windowHeight * 0.017,
    color: 'grey',
  },
  font4: {
    fontWeight: 'bold',
    // fontSize:15,
    fontSize: windowHeight * 0.019,
    color: '#787878',
  },
  font5: {
    fontWeight: 'bold',
    // fontSize:15,
    fontSize: windowHeight * 0.019,
    color: 'red',
  },
});
