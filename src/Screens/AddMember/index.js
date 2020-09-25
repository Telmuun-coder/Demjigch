import React, {useState, useContext, useEffect} from 'react';
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
import Picker from '../../Components/Picker';
import {UserState} from '../../Context/UserStore';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import ErrorMessage from '../../Components/ErrorMessage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const tohirgoo = {
  title: 'Зураг оруулах',
  takePhotoButtonTitle: 'Зураг авч оруулах...',
  chooseFromLibraryButtonTitle: 'Зургийн цомгоос сонгох...',
  quality: 0.1,
};
const falser = {
  firstName: false,
  lastName: false,
  phone: false,
  email: false,
  imgPath: false,
  facebookName: false,
  phone2: false,
  register: false,
  address: false,
};
const roles = require('../../Data/Sukhbaatar');

const AddMember = () => {
  const [uri, setUri] = useState('a');
  const [path, setPath] = useState('');
  const [duureg, setDuureg] = useState(roles.elArea[0]);
  const [horoo, setHoroo] = useState(roles.elCommittee[0]);
  const [tolow, setTolow] = useState(roles.elRole[0]);
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [ovog, setOvog] = useState('');
  const [ner, setNer] = useState('');
  const [email, setEmail] = useState('');
  const [fb, setFb] = useState('');
  const [hayg, setHayg] = useState('');
  const [spin, setSpin] = useState(false);
  const [register, setRegister] = useState('');
  const {state, setStater} = useContext(UserState);
  const [candidate, setCandidate] = useState(state.candidates[0]);
  const [detect, setDetect] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    imgPath: false,
    facebookName: false,
    phone2: false,
    register: false,
    address: false,
  });

  const upload = async (image) => {
    setSpin(true);
    let uploadImage = new FormData();
    uploadImage.append('file', {
      type: image.type,
      uri: image.uri,
      name: image.fileName,
    });
    axios.defaults.headers.common = {
      Authorization: `Bearer ${state.token}`,
      'content-type': 'multipart/form-data',
    };
    await axios
      .post('http://api.minu.mn/election/elUser/upload', uploadImage)
      .then((response) => {
        // console.log(response.data);
        if (response.data.message === 'Амжилттай') {
          setUri(image.uri);
          setPath(response.data.entity);
          // console.log('ene shude', response.data.entity);
        } else alert('Зураг оруулж чадсангүй');
      })
      .catch((e) => console.log('Зураг upload хийх үед алдаа гарав ' + e))
      .finally(() => setSpin(false));
  };

  const getAvatar = () => {
    ImagePicker.showImagePicker(tohirgoo, (res) => {
      if (res.didCancel);
      else if (res.error) console.warn(res.error);
      else {
        upload(res);
      }
    });
  };
  const Save = () => {
    const data = {
      candidateId: candidate.candidateId,
      userId: state.userId,
      elPromoter: {
        firstName: ovog,
        lastName: ner,
        phone: phone1,
        email: email,
        imgPath: path,
        facebookName: fb,
        phone2: phone2,
        register: register,
        address: hayg,
        committeeId: state.committeeId,
      },
    };

    let ok = true;
    let tmp = detect;

    for (const property in data.elPromoter) {
      if (
        data.elPromoter[property] === '' &&
        property != 'phone2' &&
        property != 'imgPath'
      ) {
        tmp[property] = true;
        ok = false;
      }
    }
    setDetect({...tmp});

    if (ok) {
      setDetect({...falser});
      setSpin(true);
      axios.defaults.headers.common = {
        Authorization: `Bearer ${state.token}`,
      };
      axios
        .post('http://api.minu.mn/election/elPromoter/create', data)
        .then((res) => {
          if (res.data.message === 'Амжилттай') {
            setStater('error', null);
            alert(res.data.message);
          } else {
            setStater('error', res.data.message);
            alert(res.data.message);
          }
        })
        .catch((e) => console.log('demjigch nemeh aldaaa', e))
        .finally(() => setSpin(false));
    } else {
      alert('Та бүх талбарыг бөгөлнө үү.');
    }
  };

  const Save1 = () => {
    // console.log(state.token);
    const data = {
      firstName: ovog,
      lastName: ner,
      email: email,
      phone: phone1,
      // phone2: phone2,
      imgPath: path,
      register: register,
      facebookName: fb,
      committeeId: horoo.committeeId,
      address: hayg,
      roleId: tolow.roleId,
    };
    let ok = true;
    let tmp = detect;

    for (const property in data) {
      if (
        data[property] === '' &&
        property != 'phone2' &&
        property != 'imgPath'
      ) {
        tmp[property] = true;
        ok = false;
      }
    }
    setDetect({...tmp});

    if (ok) {
      setSpin(true);
      setDetect({...falser});
      axios.defaults.headers.common = {
        Authorization: `Bearer ${state.token}`,
      };
      axios
        .post('http://api.minu.mn/election/elUser/create', data)
        .then((res) => {
          if (res.data.message === 'Амжилттай') {
            alert(res.data.message);
            setStater('error', null);
          } else {
            setStater('error', res.data.message);
            alert(res.data.message);
          }
        })
        .catch((e) => {
          console.log('tolowtei nemeh aldaaa', e);
          alert('Алдаа гарлаа');
        })
        .finally(() => setSpin(false));
    } else alert('Та бүх талбарыг бөгөлнө үү.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={spin} />
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
          )}
        </TouchableOpacity>
        <ErrorMessage />
        <View style={styles.item}>
          {state.userRole === 'Admin' || state.userRole === 'Super admin' ? (
            <Picker
              title="Төлөв сонгох"
              type="tolow"
              selectedValue={tolow}
              onValueChange={(e) => {
                setTolow(e);
              }}
            />
          ) : (
            <Picker
              title="Нэр дэвшигч сонгох"
              type="candidates"
              candidates={state.candidates}
              selectedValue={candidate}
              onValueChange={(e) => {
                setCandidate(e);
              }}
            />
          )}
        </View>
        <View style={[styles.item, detect.phone && styles.danger]}>
          <Input
            onChange={(val) => setPhone1(val)}
            title="Утасны дугаар 1"
            type="number"
          />
        </View>
        <View style={styles.item}>
          <Input
            onChange={(val) => setPhone2(val)}
            title="Утасны дугаар 2"
            type="number"
          />
        </View>
        <View style={[styles.item, detect.register && styles.danger]}>
          <Input
            register={true}
            onChange={(val) => setRegister(val)}
            title="Регистерийн дугаар"
            type=""
          />
        </View>
        <View style={[styles.item, detect.firstName && styles.danger]}>
          <Input onChange={(val) => setOvog(val)} title="Овог" type="" />
        </View>
        <View style={[styles.item, detect.lastName && styles.danger]}>
          <Input onChange={(val) => setNer(val)} title="Нэр" type="" />
        </View>
        <View style={[styles.item, detect.email && styles.danger]}>
          <Input
            onChange={(val) => setEmail(val)}
            title="Мэйл хаяг"
            type="email"
          />
        </View>
        {/* {state.userRole === 'Admin' ||
          (state.userRole === 'Super admin' && (
            <View style={styles.item}>
              <Input
                onChange={(val) => setPassword(val)}
                title="Нууц үг"
                // type="password"
                type=""
              />
            </View>
          ))} */}
        <View style={[styles.item, detect.facebookName && styles.danger]}>
          <Input onChange={(val) => setFb(val)} title="Фэйсбүүк хаяг" type="" />
        </View>
        {(state.userRole === 'Admin' || state.userRole === 'Super admin') && (
          <>
            <View style={styles.item}>
              <Picker
                title="Бүс нутаг сонгох"
                selectedValue={duureg}
                type="duureg"
                onValueChange={(e) => {
                  setDuureg(e);
                  // console.log(e.areaName);
                }}
              />
            </View>
            <View style={styles.item}>
              <Picker
                title="Хороо"
                type="horoo"
                selectedValue={horoo}
                onValueChange={(e) => setHoroo(e)}
                areaId={duureg.areaId}
              />
            </View>
          </>
        )}
        <View style={[styles.item, detect.address && styles.danger]}>
          <Input
            onChange={(val) => setHayg(val)}
            title="Гэрийн хаяг"
            type=""
            multiline={true}
          />
        </View>
        <View style={styles.item}>
          <Button
            title="ХАДГАЛАХ"
            onClick={
              state.userRole === 'Admin' || state.userRole === 'Super admin'
                ? Save1
                : Save
            }
          />
        </View>
        <View style={{height: windowHeight * 0.11}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
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
    width: 140,
    height: 135,
    borderRadius: 30,
    // backgroundColor: 'yellow',
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
    top: '38%',
    left: '38%',
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
  danger: {borderWidth: 0.5, borderColor: 'red', borderRadius: 50},
});
export default AddMember;
