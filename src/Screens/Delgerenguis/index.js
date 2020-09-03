import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import ProImg from '../../Components/ProImg';
import {formater} from '../User';
import Taniltsuulga from '../../Components/Delgerengui/index'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Dewshigch = (navigation) => {
  return (
    <View style={styles.container}>
      <View style={styles.toptab}>
        <Text style={styles.underlineTextContainer}>
          1-Р ТОЙРОГТ НЭР ДЭВШИГЧИД
        </Text>
      </View>
      <ScrollView style={styles.Scroll} contentContainerStyle={{alignItems:'center'}}>
        <Taniltsuulga/>
        <Taniltsuulga/>
        <Taniltsuulga/>
      </ScrollView>
    </View>
  );
};
export default Dewshigch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  toptab: {
    height: windowHeight * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  underlineTextContainer: {
    fontWeight: 'bold',
    fontSize: windowHeight * 0.02,
    padding: windowHeight * 0.006,
    alignItems: 'center',
    borderBottomWidth: windowHeight * 0.004,
    borderColor: '#000',
  },
  Scroll: {
    alignSelf: 'center',
    backgroundColor: '#F4F4F4',
    width: windowWidth,
  },
  
});
