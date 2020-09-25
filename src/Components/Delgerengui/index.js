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
import ProImg from '../ProImg';
import {formater} from '../../Screens/User';
import Icon from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Delgerengui = ({navigation, data}) => {
  return (
    <View style={styles.cube}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Supporters', {
            candidateId: data.candidateId,
          })
        }
        style={styles.jump}>
        <Icon name="right" color="#787878" size={25} />
      </TouchableOpacity>
      <View style={[styles.Dashed, {borderColor: '#Fff'}]}>
        <View style={styles.first}>
          <ProImg mini={true} uri={data.imgPath} color="#FFFFFF" />
          <View style={styles.About}>
            <View>
              <Text style={styles.font1}>{data.lastName}</Text>
            </View>
            <View>
              <Text style={styles.font2}>НИТХ-д нэр дэвшигч</Text>
              <Text style={styles.font3}>{data.phone}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* <View style={styles.Dashed}>
        <View style={styles.first}>
          <ProgressCircle
            //props oor orluulah
            percent={(3400 * 100) / 4600}
            radius={50}
            borderWidth={6}
            color="#EC1A21"
            shadowColor="#70707020"
            bgColor="#fff">
            <View style={styles.inCircle}>
              <Text style={styles.font7}>СОНГУУЛИЙН НАСНЫ ИРГЭД</Text>
              <Text style={styles.font8}>{formater(46000)}</Text>
            </View>
          </ProgressCircle>
          <View style={styles.twoColumn}>
            <View style={{marginLeft: 10}}>
              <Text style={styles.font4}>БҮРТГҮҮЛСЭН</Text>
              <Text style={styles.font5}>{formater(3400)}</Text>
            </View>
            <View>
              <Text style={styles.font4}>БҮРТГҮҮЛЭЭГҮЙ</Text>
              <Text style={styles.font6}>{formater(1200)}</Text>
            </View>
          </View>
        </View>
      </View> */}
      <View style={[styles.Dashed, {borderColor: '#Fff'}]}>
        <View style={styles.first}>
          <ProgressCircle
            //props oor orluulah
            percent={(data.checkedCnt * 100) / data.promoterCnt}
            radius={50}
            borderWidth={6}
            color="#EC1A21"
            shadowColor="#70707020"
            bgColor="#fff">
            <Text style={styles.font7}>НИЙТ ДЭМЖИГЧИД</Text>
            <Text style={styles.font8}>{formater(data.promoterCnt)}</Text>
          </ProgressCircle>
          <View style={styles.twoColumn}>
            <View style={{marginLeft: 10}}>
              <Text style={styles.font4}>СОНГУУЛЬ ӨГСӨН</Text>
              <Text style={styles.font5}>{formater(data.checkedCnt)}</Text>
            </View>
            <View>
              <Text style={styles.font4}>СОНГУУЛЬ ӨГӨӨГҮЙ</Text>
              <Text style={styles.font6}>
                {formater(data.promoterCnt - data.checkedCnt)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Delgerengui;
const styles = StyleSheet.create({
  cube: {
    width: windowWidth * 0.9,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 15,
    borderRadius: windowHeight * 0.013,
  },
  first: {
    flexDirection: 'row',
    marginLeft: windowHeight * 0.01,
    marginBottom: windowHeight * 0.01,
    marginVertical: 5,
  },
  Dashed: {
    borderColor: '#70707050',
    borderRadius: 4,
    borderWidth: 2,
    borderStyle: 'dashed',
    width: windowWidth * 1.1,
    alignSelf: 'center',
    paddingHorizontal: '10.7%',
  },
  font1: {
    fontSize: 14,
  },
  font2: {
    fontSize: 10,
    color: '#00000050',
  },
  font3: {
    fontSize: 12,
  },
  font4: {
    fontSize: 8,
    color: '#00000050',
    width: windowHeight * 0.15,
    justifyContent: 'space-evenly',
  },
  font5: {
    fontSize: windowHeight * 0.025,
    fontWeight: 'bold',
    color: '#EC1A21',
    marginTop: 5,
  },
  font6: {
    fontSize: windowHeight * 0.025,
    fontWeight: 'bold',
    color: '#00000030',
    marginTop: 5,
  },
  font7: {
    fontSize: 8,
    color: '#00000030',
    textAlign: 'center',
  },
  font8: {
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    // marginBottom: -12
    marginBottom: windowHeight * -0.01,
  },
  About: {
    flexDirection: 'column',
    marginTop: windowHeight * 0.02,
    justifyContent: 'space-between',
  },
  twoColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inCircle: {
    padding: 3,
  },
  jump: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 20,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
