import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Delgerengui from '../../Components/Delgerengui';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Delgerenguis = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.toptab}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', top: 10, left: 10, zIndex: 100}}>
          <Icon name="arrowleft" color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.underlineTextContainer}>
          {data.committeeName !== 'Нийслэл'
            ? data.committeeName.slice(0, data.committeeName.length - 8) +
              '-Р ХОРООНД '
            : 'НИЙСЛЭЛД '}
          НЭР ДЭВШИГЧИД
        </Text>
        <View style={styles.underLine} />
      </View>
      <ScrollView
        style={styles.Scroll}
        contentContainerStyle={styles.scrollExtra}>
        {data.candidates.map((e, i) => (
          <Delgerengui data={e} key={i} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};
export default Delgerenguis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 50,
  },
  toptab: {
    elevation: 5,
    position: 'absolute',
    top: 0,
    zIndex: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 15,
    width: windowWidth * 1,
    backgroundColor: '#F0F0F0',
  },
  underlineTextContainer: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  underLine: {
    borderRadius: 4,
    height: 4,
    width: 72,
    backgroundColor: '#000000',
  },
  Scroll: {
    alignSelf: 'center',
    backgroundColor: '#F4F4F4',
    width: windowWidth,
  },
  scrollExtra: {
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 10,
  },
});
