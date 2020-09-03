import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import List from '../../Components/Region'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Region = (navigation ) => {
    return (
      <View  style={styles.container}>
        <View style={styles.toptab}>
          <Text style={styles.underlineTextContainer}>ТОЙРГУУД</Text>
        </View>
        <ScrollView contentContainerStyle={styles.Scrol}>
           <List/>
           <List/>
           <List/>
           <List/>
           <List/>
           <List/>
           <List/>
        </ScrollView>
      </View>
    );
  }
export default Region;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F4F4F4'
    },
    toptab: {
      height:windowHeight * 0.08,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F4F4F4',
    },
    underlineTextContainer: {
      fontWeight: 'bold',
      fontSize: windowHeight * 0.02,
      padding: windowHeight * 0.006,
      alignItems:'center',
      borderBottomWidth: windowHeight * 0.004,
      borderColor: '#000',
    },
    Scrol:{
      // alignItems:'stretch',
        alignItems:'center',
        backgroundColor:'#F4F4F4'
    }
})