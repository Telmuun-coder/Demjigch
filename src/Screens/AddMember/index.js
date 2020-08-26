import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const tohirgoo = {
  title: 'Үнэмлэхний зураг оруулах',
  takePhotoButtonTitle: 'Зураг авч оруулах...',
  chooseFromLibraryButtonTitle: 'Зургийн цомгоос сонгох...',
};

const AddMember = () => {
  const [uri, setUri] = useState('a');
  const getAvatar = () => {
    ImagePicker.showImagePicker(tohirgoo, (res) => {
      if (res.didCancel) console.warn('really');
      else if (res.error) console.warn(res.error);
      else {
        // this.uploadCardFront(res);
        setUri(res.uri);
      }
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cameraStyle} onPress={() => getAvatar()}>
        {uri === 'a' ? (
          <Icon name="home" color="white" size={30} />
        ) : (
          <Image
            style={{width: 40, height: 30, borderRadius: 5}}
            source={{uri}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  cameraStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AddMember;
