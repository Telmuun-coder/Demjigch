import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import Member from '../../Components/Member';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Members = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E51F1D" />
      <ScrollView style={{paddingHorizontal: 10}}>
        <View style={styles.row}>
          <Member checked={true} />
          <Member checked={true} />
          <Member checked={true} />
        </View>
        <View style={styles.row}>
          <Member checked={true} />
          <Member checked={true} />
          <Member checked={true} />
        </View>
        <View style={styles.row}>
          <Member checked={true} />
          <Member />
          <Member />
        </View>
        <View style={styles.row}>
          <Member />
          <Member />
          <Member />
        </View>
        <View style={styles.row}>
          <Member />
          <Member />
          <Member />
        </View>
        <View style={styles.row}>
          <Member />
          <Member />
          <Member />
        </View>
        <View style={styles.row}>
          <Member />
          <Member />
          <Member />
        </View>

        <View style={styles.row}>
          <Member />
          <Member />
          <Member />
        </View>
        <View style={styles.row}>
          <Member />
          <Member />
          <Member />
        </View>
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Members;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  footer: {
    width: '100%',
    height: 30,
    backgroundColor: 'transparent',
  },
});
