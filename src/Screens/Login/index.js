import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import Spinner from '../../Components/Spinner';
import {UserState} from '../../Context/UserStore';
import ErrorMessage from '../../Components/ErrorMessage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
  const [spin, setSpin] = useState(false);
  const {auth, setRem, rem} = useContext(UserState);
  const [number, setNumber] = useState(null); //88564757,99887788,99115544
  const [password, setPassword] = useState(null); //12345678
  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={spin} />
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.logo}
          source={require('../../Images/noWordLogo/logoTom.png')}
        />
        <Text style={styles.title}>ГИШҮҮД ДЭМЖИГЧДИЙН</Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: windowHeight * 0.065 * 3.5,
        }}>
        <ErrorMessage />
        <Input
          value={number}
          onChange={(e) => setNumber(e)}
          title="Бүртгэлтэй утасны дугаар"
          placeHolder=""
          type="number"
        />
        <Input
          onChange={(e) => setPassword(e)}
          value={password}
          title="Нууц үг"
          placeHolder=""
          type="password"
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignSelf: 'center',
            paddingLeft: '10%',
          }}>
          <TouchableOpacity
            onPress={() => setRem((Prev) => (Prev === 'had' ? 'hud' : 'had'))}
            style={styles.remember}>
            <Icon
              name="checkcircle"
              color={rem === 'had' ? '#EC1A21' : '#8F8F8F'}
              size={25}
            />
            <Text style={{marginLeft: 5}}>Сануулах</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent: 'center'}}>
            <Text>Нууц үг мартсан</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Button
          title="НЭВТРЭХ"
          onClick={() => auth.login(number, password, setSpin, rem)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  remember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '25%',
    alignItems: 'center',
  },
});
