import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import ProImg from '../../Components/ProImg';
import {UserState} from '../../Context/UserStore';
import Button from '../../Components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const roleNames = [
  {
    roleId: 1,
    roleName: 'Super admin',
  },
  {
    roleId: 2,
    roleName: 'Admin',
  },
  {
    roleId: 3,
    roleName: 'Гишүүн',
  },
  {
    roleId: 4,
    roleName: 'Ухуулагч',
  },
  {
    roleId: 5,
    roleName: 'Нэр дэвшигч',
  },
];

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
  const [data, setData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const {auth, state, setStater} = useContext(UserState);
  const [cnt, setCnt] = useState([0, 0]);

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('data');
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     // error reading value
  //   }
  // };
  const set = () => {
    if (data.elCandidate === null || data.elCandidate === undefined) {
      setCnt([data.promoterCnt, data.checkedCnt]);
    } else {
      setCnt([data.elCandidate.promoterCnt, data.elCandidate.checkedCnt]);
    }
  };

  useEffect(() => {
    onRefresh();
    // setData(state.data);
  }, []);

  useEffect(() => {
    set();
  }, [data]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // console.log('userId: ', state.userId);
    axios.defaults.headers.common = {
      Authorization: `Bearer ${state.token}`,
    };
    axios
      .get(`http://api.minu.mn/election/elUser/${state.userId}`)
      .then((res) => {
        // console.log('userRefresh: ', res.data);
        if (res.data.message === 'Амжилттай') {
          setData(res.data.entity);
          // setStater('data', res.data.entity);
          if (data.elCandidate === null || data.elCandidate === undefined) {
            setCnt([data.promoterCnt, data.checkedCnt]);
          } else {
            setCnt([data.elCandidate.promoterCnt, data.elCandidate.checkedCnt]);
          }
        }
      })
      .catch((e) => console.log('userRefresh error: ', e.message))
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          flex: 1,
          // backgroundColor: 'red',
          paddingVertical: 80,
          justifyContent: 'flex-start',
        }}>
        <View style={styles.titleContaner}>
          <Text style={styles.title}>{'Хэрэглэгчийн булан'.toUpperCase()}</Text>
          <View style={styles.underLine} />
        </View>
        <View style={styles.userContainer}>
          <ProImg
            color="#F0F0F0"
            // uri={data.imgPath}
            uri={
              'http://api.minu.mn/election/elUser/download/171600323411474-6bd908e2-0696-4197-8332-b7441bf3cb44'
            }
          />
          <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 20}}>
            {data.lastName}
          </Text>
          <Text style={{fontSize: 10, color: '#707070'}}>
            {
              roleNames[data.roleId === undefined ? 3 : data.roleId - 1]
                .roleName
            }
          </Text>
          <Text style={{fontSize: 12, color: '#000000'}}>{data.phone}</Text>
        </View>
        {state.userRole != 'Admin' && state.userRole != 'Super admin' && (
          <View style={styles.Infos}>
            <View style={styles.InfoHeader}>
              <Text style={{fontSize: 10, color: '#707070'}}>
                НИЙТ ДЭМЖИГЧИД
              </Text>
              <Text style={{fontSize: 60, fontWeight: 'bold'}}>
                {formater(cnt[0] === undefined ? 0 : cnt[0])}
              </Text>
            </View>
            <View style={styles.headerLine} />
            <View style={styles.InfoBody}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 10, color: '#707070'}}>
                  СОНГУУЛЬ ӨГСӨН
                </Text>
                <Text style={{fontSize: 40, fontWeight: 'bold'}}>
                  {formater(cnt[1] === undefined ? 0 : cnt[1])}
                </Text>
              </View>
              <View style={styles.Line} />
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 10, color: '#707070'}}>
                  СОНГУУЛЬ ӨГӨӨГҮЙ
                </Text>

                <Text
                  style={{fontSize: 40, fontWeight: 'bold', color: '#EC1A21'}}>
                  {formater(cnt[0] === undefined ? 0 : cnt[0] - cnt[1])}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View
          style={{
            alignSelf: 'center',
            marginTop: 20,
            // marginBottom: 100,
          }}>
          <Button title="Гарах" onClick={auth.logout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    // backgroundColor: 'blue',
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
    marginBottom: 30,
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
