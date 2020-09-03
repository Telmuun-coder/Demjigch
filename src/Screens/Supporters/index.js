import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Human from '../../Components/Human';
import axios from 'axios';
import Ficon from 'react-native-vector-icons/Feather';
import {UserState} from '../../Context/UserStore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Supporters = (props) => {
  const [data, setData] = useState([]);
  const {state} = useContext(UserState);
  const loadData = () => {
    let config = {
      headers: {
        headers: {'Content-Type': 'application/json'},
      },
    };
    axios
      .get('http://192.168.137.1:8081/election/elPromoter/promoters/17')
      .then((res) => {
        // console.log('whyyy not mee', res.data);
        setData(res.data.entity);
      })
      .catch((e) => console.log('aash', e.message));
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E51F1D" />

      <ScrollView style={{paddingHorizontal: 10}}>
        <TouchableOpacity
          style={styles.search}
          onPress={() => props.navigation.push('Search')}>
          <Ficon name="search" size={windowWidth * 0.06} color="#9E9898" />
          <Text style={{color: '#9E9898'}}>Хайх ...</Text>
        </TouchableOpacity>
        <View style={styles.mapContainer}>
          {data.map((e, i) => {
            return <Human data={e} key={i} />;
          })}
        </View>
        {/* <View style={styles.row}>
          <Human checked={true} />
          <Human checked={true} />
          <Human checked={true} />
        </View> */}
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Supporters;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  mapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  search: {
    marginTop: '1%',
    // position: 'absolute',
    // right: 10,
    // top: 0,
    // zIndex: 10,
    // backgroundColor: 'yellow',
    alignSelf: 'center',
    flexDirection: 'row',
    marginRight: 10,
    borderRadius: 20,
    width: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    width: '100%',
    height: windowHeight * 0.11,
    backgroundColor: 'transparent',
  },
});
