import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import PercentCircle from 'react-native-percent-circle';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Dewshigch = (navigation) => {
  return (
    <View style={styles.container}>
      <View style={styles.toptab}>
        <Text style={styles.underlineTextContainer}>1-Р ТОЙРОГТ НЭР ДЭВШИГЧИД</Text>
      </View>
      <ScrollView style={styles.Scroll}>
          <View  style={styles.cube}>
            <View style={styles.first}>
                <Image style={styles.img} source={require('../../Images/Face.png')} />
                <View style={styles.About}>
                    <Text style={styles.font1}>ДАВААЖАРГАЛ</Text>
                    <Text style={styles.font2}>НИТХ-д нэр дэвшигч</Text>
                    <Text style={styles.font3}>88982212</Text>
                </View>
            </View>
            <View style={styles.first}>
                <Image style={styles.img} source={require('../../Images/Face.png')} />
                <View style={styles.About}>
                    <Text style={styles.font1}>ДАВААЖАРГАЛ</Text>
                    <Text style={styles.font2}>НИТХ-д нэр дэвшигч</Text>
                    <Text style={styles.font3}>88982212</Text>
                </View>
            </View>
            <View style={styles.first}>
                <Image style={styles.img} source={require('../../Images/Face.png')} />
                <View style={styles.About}>
                    <Text style={styles.font1}>ДАВААЖАРГАЛ</Text>
                    <Text style={styles.font2}>НИТХ-д нэр дэвшигч</Text>
                    <Text style={styles.font3}>88982212</Text>
                </View>
            </View>
          </View>
      </ScrollView>
    </View>
  );
};
export default Dewshigch;

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
    Scroll:{
        alignSelf:'center',
        // justifyContent:'center'
    },
    cube:{
        borderWidth:1,
        // height:windowHeight*0.5,
        width:windowWidth*0.9,
        flexDirection:'column'
    },
    img:{
        height:110,
        width: 90,
        marginRight: windowHeight * 0.02
    },
    first:{
        flexDirection:'row',
        margin: windowHeight * 0.01,
    },
    font1:{
        fontSize: windowHeight * 0.019
    },
    font2: {
        fontSize: windowHeight * 0.017,
        color:'#00000087'
    },
    font3:{
        fontSize: windowHeight * 0.018,
    },
    About:{
        flexDirection:'column'
    }
})
