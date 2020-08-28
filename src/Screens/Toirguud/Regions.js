import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dewshigch from './Dewshigch'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function List() {
    return (
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dewshigch')}
        // onPress={() => this.props.navigation.navigate('cameraScreen')}
        >
            <View style={styles.Toirog}>
                <Text style={styles.font1}>1</Text>
                <Text style={styles.font2}>ТОЙРОГ</Text>
            </View>
            <View>
                <Text style={styles.font3}>Нэр дэвшигчид:</Text>
                <Text style={styles.font2}>Ц.Наранцэцэг Ц.Даваажаргал</Text>
                <Text style={styles.font3}>Сонгуулийн насны иргэд:</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.font4}>20,000/</Text>
                    <Text style={styles.font5}>15,324</Text>
                </View>
            </View>
            <Entypo
            name='chevron-right'
            color='#787878'
            size={windowHeight * 0.04}
            marginRight={windowHeight * 0.04}
            />
       </TouchableOpacity>
    )
}

const Region = (navigation ) => {
    return (
      <View  style={styles.container}>
        <View style={styles.toptab}>
          <Text style={styles.underlineTextContainer}>ТОЙРГУУД</Text>
        </View>
        <View style={styles.ScrollView}>
           <List/>
        </View>
      </View>
    );
  }
export default Region;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toptab: {
    height:windowHeight * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  underlineTextContainer: {
    fontWeight: 'bold',
    fontSize: windowHeight * 0.02,
    padding: windowHeight * 0.006,
    alignItems:'center',
    borderBottomWidth: windowHeight * 0.004,
    borderColor: '#000',
  },
  ScrollView:{
      flex:1,
      alignItems:'center',
      backgroundColor:'#F0F0F0'
  },
  button:{
      backgroundColor:'#F4F4F4',
      width:windowWidth*0.9,
      // height:120,
      flexDirection:'row',
      borderRadius: windowHeight * 0.013,
      alignItems:'center',
  },
  Toirog:{
      backgroundColor:'#F0F0F0',
      height:windowHeight * 0.12,
      width:windowHeight * 0.12,
      borderRadius:windowHeight * 0.6,
      alignItems:'center',
      justifyContent:'center',
      margin:windowHeight * 0.019
  },
  font1:{
    fontWeight: 'bold',
    // fontSize:35
    fontSize:windowHeight * 0.05
  },
  font2:{
    fontWeight: 'bold',
    // fontSize:15
    fontSize: windowHeight * 0.019
  },
  font3:{
    // fontSize:13,
    fontSize: windowHeight * 0.017,
    color:'grey'
  },
  font4:{
      fontWeight:'bold',
      // fontSize:15,
      fontSize: windowHeight * 0.019,
      color:'#787878'
  },
  font5:{
    fontWeight:'bold',
    // fontSize:15,
    fontSize: windowHeight * 0.019,
    color:'red'
}
});
