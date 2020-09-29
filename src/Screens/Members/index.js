import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  RefreshControl,
  FlatList,
} from 'react-native';
import Member from '../../Components/Member';
import axios from 'axios';
import Ficon from 'react-native-vector-icons/Feather';
import {UserState} from '../../Context/UserStore';
import Spinner from '../../Components/Spinner';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Members = (props) => {
  const isMountedRef = useRef(null);
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const {state} = useContext(UserState);
  const [keyWord, setKeyWord] = useState('');
  const [spin, setSpin] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSeartching] = useState(false);
  const [message, setMessage] = useState(null);

  const loadData = async (pageNum) => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${state.token}`,
    };
    // console.log('page', page);
    const data = {
      committeeId: state.committeeId, //neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
      page: pageNum,
      // areaId: null,
      // cityId: null,
    };
    pageNum === 1 && setSpin(true);
    axios
      .post('http://api.minu.mn/election/elUser/users', data)
      .then((res) => {
        if (res.data.message === 'Амжилттай') {
          if (res.data.entity.length > 0)
            setData((Prev) => [
              ...Prev.slice(0, Prev.length - 3),
              ...res.data.entity,
              {blank: true},
              {blank: true},
              {blank: true},
            ]);
        }
      })
      .catch((e) => console.log('Members error:', e.message))
      .finally(() => {
        // pageNum === 1 ? setSpin(false) : setRefreshing(false);
        setSpin(false);
      });
  };

  useEffect(() => {
    isMountedRef.current = true;
    loadData(1);
    return () => (isMountedRef.current = false);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setIsSeartching(false);
    setResult([]);
    axios.defaults.headers.common = {
      Authorization: `Bearer ${state.token}`,
    };
    const data = {
      committeeId: state.committeeId,
      page: 1,
    };
    axios
      .post('http://api.minu.mn/election/elUser/users', data)
      .then((res) => {
        // console.log('refreshing', res.data.entity.length);
        if (res.data.message === 'Амжилттай') {
          setData([]);
          setData([...res.data.entity]);
        }
      })
      .catch((e) => console.log('Members error:', e.message))
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  const onEnd = () => {
    // setRefreshing(true);
    loadData(page + 1);
    setPage((Prev) => Prev + 1);
    // console.log('Are u challenging mee?');
  };

  const renderMember = ({item}) => {
    return <Member data={item} />;
  };

  const doSearch = () => {
    setSpin(true);
    setIsSeartching(true);
    axios.defaults.headers.common = {
      Authorization: `Bearer ${state.token}`,
    };
    const data = {
      committeeId: state.committeeId,
      searchValue: keyWord,
    };
    axios
      .post('http://api.minu.mn/election/elUser/search', data)
      .then((res) => {
        if (res.data.message === 'Амжилттай') {
          setResult([]);
          setResult([...res.data.entity]);
        } else {
          if (res.data.entity.length === 0) {
            setMessage(res.data.message);
            setResult([]);
          }
        }
      })
      .catch((e) => console.log('Members error:', e.message))
      .finally(() => {
        setSpin(false);
      });
  };
  const clearSearch = () => {
    setKeyWord('');
    setIsSeartching(false);
    setResult([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#E51F1D" /> */}
      <Spinner visible={spin} />
      <View style={[styles.search, {backgroundColor: 'white'}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 5,
          }}>
          <Ficon name="search" size={20} color="#9E9898" />
          <TextInput
            style={styles.searchInput}
            placeholder="Хайх ..."
            value={keyWord}
            onChangeText={(e) => {
              setKeyWord(e);
              if (e === '' || e == null) {
                clearSearch();
              }
            }}
            onSubmitEditing={() => keyWord != '' && doSearch()}
          />
        </View>
        <TouchableOpacity onPress={() => clearSearch()}>
          <Ficon name="x" size={20} color="#9E9898" />
        </TouchableOpacity>
      </View>
      {isSearching ? (
        result.length > 0 ? (
          <FlatList
            style={{
              width: windowWidth * 0.95,
            }}
            onRefresh={onRefresh}
            refreshing={refreshing}
            columnWrapperStyle={{justifyContent: 'space-around'}}
            numColumns={3}
            data={result}
            renderItem={renderMember}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{
              height: '95%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -18,
            }}>
            <Text>{message}</Text>
          </View>
        )
      ) : (
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          style={{
            width: windowWidth * 0.95,
          }}
          columnWrapperStyle={{justifyContent: 'space-around'}}
          numColumns={3}
          data={data}
          renderItem={renderMember}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={onEnd}
          onEndReachedThreshold={1} //!
        />
      )}
    </SafeAreaView>
  );
};

export default Members;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    // backgroundColor: 'blue',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  mapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  row: {
    // flexDirection: 'row',
    width: '100%',
  },
  footer: {
    width: '100%',
    height: windowHeight * 0.11,
    backgroundColor: 'transparent',
  },
  search: {
    marginTop: '2%',
    alignSelf: 'center',
    flexDirection: 'row',
    // marginRight: 10,
    borderRadius: 20,
    // minWidth: 150,
    // maxWidth: Dimensions.get('screen').width,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  searchInput: {
    padding: 0,
    // backgroundColor: 'red',
    width: 150,
    height: 35,
    marginLeft: 3,
  },
});
