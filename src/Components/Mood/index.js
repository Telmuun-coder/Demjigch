import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProImg from '../ProImg';
import ViewInput from '../ViewInput';
import Button from '../Button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Mood = ({show, setShow, data, putData, flag}) => {
  return (
    <Modal visible={show} transparent={true} onRequestClose={setShow}>
      <View style={styles.shadow} onStartShouldSetResponder={setShow} />
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.close}
          onPress={setShow}>
          <Icon name="ios-close" size={30} color="#7E7E7E" />
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            width: windowWidth,
          }}>
          <View style={{marginTop: 20}}>
            <ProImg color="#FFFFFF" uri={data.imgPath} />
          </View>
          <ViewInput title="Регистер" text={data.register} />
          <ViewInput title="Овог" text={data.firstName} />
          <ViewInput title="Нэр" text={data.lastName} />
          <ViewInput title="Мэйл хаяг" text={data.email} />
          <ViewInput title="Утасны дугаар 1" text={data.phone} />
          <ViewInput title="Утасны дугаар 2" text={data.phone2} />
          <ViewInput title="Твиттер хаяг" text={data.facebookName} />
          <ViewInput title="Фэйсбүүк хаяг" text={data.facebookName} />
          <ViewInput title="Гэрийн хаяг" text={data.address} />
          <View style={{marginBottom: 50}}>
            <Button
              title={flag ? 'Сонгууль өгөөгүй' : 'Сонгууль өгсөн'}
              onClick={putData}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default Mood;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 30,
    // paddingBottom: 30,
    overflow: 'hidden',
    zIndex: 100,
    marginTop: '5%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    width: '95%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    borderRadius: 20,
    marginRight: 10,
    // backgroundColor: 'red',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    position: 'absolute',
    top: 10,
    right: 0,
  },
  shadow: {
    //flex: 1,
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
  },
});
