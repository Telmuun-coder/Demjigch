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
import {AuthContext} from '../../Context/Auth';
import {UserState} from '../../Context/UserStore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = (props) => {
  const [rem, setRem] = useState(true);
  // const {login} = useContext(AuthContext);
  const {auth} = useContext(UserState);
  const [number, setNumber] = useState('99882753');
  const [password, setPassword] = useState('pass');
  return (
    <SafeAreaView style={styles.container}>
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
        <Input title="Бүртгэлтэй утасны дугаар" placeHolder="" type="number" />
        <Input title="Нууц үг" placeHolder="" type="password" />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            alignSelf: 'center',
            paddingLeft: '10%',
          }}>
          <TouchableOpacity
            onPress={() => setRem(!rem)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '25%',
              alignItems: 'center',
            }}>
            <Icon
              name="checkcircle"
              color={rem ? '#EC1A21' : '#8F8F8F'}
              size={25}
            />
            <Text>Сануулах</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Нууц үг мартсан</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Button title="НЭВТРЭХ" onClick={() => auth.login(number, password)} />
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
});
