import React, {useContext} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import ProImg from '../../Components/ProImg';
import {AuthContext} from '../../Context/Auth';
import Button from '../../Components/Button';

export const formater = (too) => {
  too = '' + too;
  const x = too.split('').reverse().join('');

  let y = '';
  let count = 1;

  for (let i = 0; i < x.length; i++) {
    y = y + x[i];

    if (count % 3 === 0) y = y + ',';
    count++;
  }

  let z = y.split('').reverse().join('');

  if (z[0] === ',') z = z.substr(1, z.length - 1);

  return z;
};

const User = () => {
  const {logout} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContaner}>
        <Text style={styles.title}>{'Хэрэглэгчийн булан'.toUpperCase()}</Text>
        <View style={styles.underLine} />
      </View>
      <View style={styles.userContainer}>
        <ProImg color="#F0F0F0" uri={null} />
        <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 20}}>
          Ц.Наранцэцэг
        </Text>
        <Text style={{fontSize: 10, color: '#707070'}}>Нэр дэвшигч</Text>
        <Text style={{fontSize: 12, color: '#000000'}}>99882753</Text>
      </View>
      <View style={styles.Infos}>
        <View style={styles.InfoHeader}>
          <Text style={{fontSize: 10, color: '#707070'}}>НИЙТ ДЭМЖИГЧИД</Text>
          <Text style={{fontSize: 60, fontWeight: 'bold'}}>
            {formater(5424)}
          </Text>
        </View>
        <View style={styles.headerLine} />
        <View style={styles.InfoBody}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 10, color: '#707070'}}>СОНГУУЛЬ ӨГСӨН</Text>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>
              {formater(5324)}
            </Text>
          </View>
          <View style={styles.Line} />
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 10, color: '#707070'}}>
              СОНГУУЛЬ ӨГӨӨГҮЙ
            </Text>

            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#EC1A21'}}>
              {formater(100)}
            </Text>
          </View>
        </View>
      </View>
      <View style={{alignSelf: 'center', marginTop: 20}}>
        <Button title="Гарах" onClick={logout} />
      </View>
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 100,
    justifyContent: 'flex-start',
  },
  titleContaner: {
    position: 'absolute',
    top: 13,
    zIndex: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 35,

    // backgroundColor: 'purple',
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
  userContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  Infos: {
    alignItems: 'center',
  },
  InfoHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  InfoBody: {
    flexDirection: 'row',
    width: '80%',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerLine: {
    width: '80%',
    height: 2,
    borderRadius: 2,
    backgroundColor: '#707070',
  },
  Line: {
    height: '80%',
    width: 2,
    // borderStyle: 'dotted',
    borderRadius: 6,
    backgroundColor: '#707070',
  },
});
