import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import ProInmg from '../../Components/ProImg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const tohirgoo = {
  title: 'Зураг оруулах',
  takePhotoButtonTitle: 'Зураг авч оруулах...',
  chooseFromLibraryButtonTitle: 'Зургийн цомгоос сонгох...',
};

const AddMember = () => {
  const [uri, setUri] = useState('a');

  const getAvatar = () => {
    ImagePicker.showImagePicker(tohirgoo, (res) => {
      if (res.didCancel);
      else if (res.error) console.warn(res.error);
      else {
        // this.uploadCardFront(res);
        setUri(res.uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContaner}>
        <Text style={styles.title}>{'Дэмжигч нэмэх'.toUpperCase()}</Text>
        <View style={styles.underLine} />
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.cameraStyle}
          onPress={() => getAvatar()}>
          {uri === 'a' ? (
            <>
              <Image
                style={styles.pent}
                source={require('../../Images/ImagePick.png')}
              />
              <Icon style={styles.icon} name="camera" color="white" size={30} />
            </>
          ) : (
            <ProInmg uri={uri} color="#F0F0F0" />
            // <Image
            //   style={{width: 40, height: 30, borderRadius: 5}}
            //   source={{uri}}
            // />
          )}
        </TouchableOpacity>
        <View style={styles.item}>
          <Input title="Утасны дугаар 1" type="number" />
        </View>
        <View style={styles.item}>
          <Input title="Утасны дугаар 2" type="number" />
        </View>
        <View style={styles.item}>
          <Input title="Овог" type="" />
        </View>
        <View style={styles.item}>
          <Input title="Нэр" type="" />
        </View>
        <View style={styles.item}>
          <Input title="Мэйл хаяг" type="" />
        </View>
        <View style={styles.item}>
          <Input title="Твиттер хаяг" type="" />
        </View>
        <View style={styles.item}>
          <Input title="Фэйсбүүк хаяг" type="" />
        </View>
        <View style={styles.item}>
          <Input title="Гэрийн хаяг" type="" multiline={true} />
        </View>
        <View style={styles.item}>
          <Button title="ХАДГАЛАХ" />
        </View>
        <View style={{height: windowHeight * 0.065}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 1.2,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingTop: 48,
    // paddingBottom: 25,
    flex: 1,
  },
  scroll: {
    // height: windowHeight * 0,
    // flex: 1,
    // backgroundColor: 'green',
    // paddingTop: 48,
    width: '100%',
    // paddingBottom: 50,
  },
  cameraStyle: {
    marginVertical: 50,
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pent: {
    width: 140,
    height: 135,
  },
  icon: {
    zIndex: 10,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  titleContaner: {
    position: 'absolute',
    top: 0,
    paddingTop: 15,
    zIndex: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    // backgroundColor: 'transparent',
    // backgroundColor: 'pink',
    width: windowWidth * 1.1,
    // elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  underLine: {
    borderRadius: 4,
    height: 4,
    width: 72,
    backgroundColor: '#000000',
  },
  item: {
    marginVertical: 5,
  },
});
export default AddMember;
