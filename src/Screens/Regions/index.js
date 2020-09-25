import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import {UserState} from '../../Context/UserStore';
import Spinner from '../../Components/Spinner';
import Region from '../../Components/Region';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Regions = (props) => {
  const [data, setData] = useState([]);
  const [spin, setSpin] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {state} = useContext(UserState);

  const loadData = async () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${state.token}`,
    };
    setSpin(true);
    await axios
      .get(`http://api.minu.mn/election/elUser/allCandidates`)
      .then((res) => {
        if (res.data.message === 'Амжилттай') {
          console.log(res.data.entity[0]);
          setData(res.data.entity);
        }
      })
      .catch((e) => console.log('Regions error', e))
      .finally(() => setSpin(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    axios.defaults.headers.common = {
      Authorization: `Bearer ${state.token}`,
    };
    axios
      .get(`http://api.minu.mn/election/elUser/allCandidates`)
      .then((res) => {
        // console.log('refresh', res.data.message, res.data);
        if (res.data.message === 'Амжилттай') {
          setData(res.data.entity);
        }
      })
      .catch((e) => console.log('Regions error: ', e.message))
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Spinner visible={spin} />
      <ScrollView
        contentContainerStyle={styles.Scrol}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {data.map((e, i) => (
          <Region key={i} data={e} navigation={props.navigation} />
        ))}
      </ScrollView>
    </View>
  );
};
export default Regions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    // paddingTop: 20,
  },
  toptab: {
    height: windowHeight * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  underlineTextContainer: {
    fontWeight: 'bold',
    fontSize: windowHeight * 0.02,
    padding: windowHeight * 0.006,
    alignItems: 'center',
    borderBottomWidth: windowHeight * 0.004,
    borderColor: '#000',
  },
  Scrol: {
    // alignItems:'stretch',
    paddingTop: 20,
    paddingBottom: 65,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
});
