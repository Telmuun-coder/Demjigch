import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Human from '../../Components/Human';
import axios from 'axios';
import Ficon from 'react-native-vector-icons/Feather';
import {UserState} from '../../Context/UserStore';
import Spinner from '../../Components/Spinner';
import Icon from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Supporters = (props) => {
  const [reRender, setReRender] = useState(1);
  const isMountedRef = useRef(null);
  const [humans, setHumans] = useState([]);
  const [result, setResult] = useState([]);
  const {state} = useContext(UserState);
  const [keyWord, setKeyWord] = useState('');
  const [spin, setSpin] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSeartching] = useState(false);
  const [message, setMessage] = useState(null);
  const {candidateId} =
    (state.userRole === 'Admin' || state.userRole === 'Super admin') &&
    props.route.params;

  const loadData = async (pageNum) => {
    let sendingData = {
      // userId: state.userId,
      // candidateId: state.candidateId,
      page: pageNum,
    };
    // Adminar nevtersen uyd tuhain ner devshigchiin demjigchdiig haruulahin tuld ner devshigchiin Id-g ywuulna
    if (state.userRole === 'Admin' || state.userRole === 'Super admin') {
      sendingData = {
        candidateId,
        page: pageNum,
      };
    }

    axios.defaults.headers.common = {
      Authorization: `Bearer ${state.token}`,
    };
    pageNum === 1 && setSpin(true);
    if (isMountedRef.current)
      await axios
        .post(`http://api.minu.mn/election/elPromoter/promoters`, sendingData)
        .then((res) => {
          if (res.data.message === 'Амжилттай') {
            if (res.data.entity.length > 0) {
              setHumans((Prev) => [
                ...Prev.slice(0, Prev.length - 3),
                ...res.data.entity,
                {blank: true},
                {blank: true},
                {blank: true},
              ]);
            }
          }
        })
        .catch((e) => console.log('Supporters loadData error: ', e.message))
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

  const changeDataLocal = (flag, proId) => {
    let tmp = humans;
    tmp.find((element) => {
      if (element.promoterId === proId) element.enableFlag = flag;
    });
    setHumans([...tmp]);
  };
  const changeDataSearch = (flag, proId) => {
    let tmp = result;
    tmp.find((element) => {
      if (element.promoterId === proId) element.enableFlag = flag;
    });
    setResult([...tmp]);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setIsSeartching(false);
    setResult([]);
    let sendingData = {
      // userId: state.userId,
      // candidateId: state.candidateId,
      page: 1,
    };
    // Adminar nevtersen uyd tuhain ner devshigchiin demjigchdiig haruulahin tuld ner devshigchiin Id-g ywuulna
    if (state.userRole === 'Admin' || state.userRole === 'Super admin') {
      sendingData = {candidateId, page: 1};
    }
    axios.defaults.headers.common = {
      Authorization: `Bearer ${state.token}`,
    };

    axios
      .post(`http://api.minu.mn/election/elPromoter/promoters`, sendingData)
      .then((res) => {
        // console.log(humans.length, 'refreshing', res.data.entity.length);
        if (res.data.message === 'Амжилттай') {
          setHumans([
            ...res.data.entity,
            {blank: true, promoterId: 'blank1'},
            {blank: true, promoterId: 'blank2'},
            {blank: true, promoterId: 'blank3'},
          ]);
        }
      })
      .catch((e) => console.log('Demjigchid error: ', e.message))
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  const onEnd = () => {
    // setRefreshing(true);
    loadData(page + 1);
    setPage((Prev) => Prev + 1);
    // console.log('Are u calling mee?');
  };

  const doSearch = () => {
    setSpin(true);
    setIsSeartching(true);
    axios.defaults.headers.common = {
      Authorization: `Bearer ${state.token}`,
    };
    const data = {
      // userId: state.userId,
      // candidateId: state.candidateId,
      searchValue: keyWord,
    };
    axios
      .post('http://api.minu.mn/election/elPromoter/search', data)
      .then((res) => {
        // console.log(res.data, keyWord);
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
  const renderHuman = ({item}) => {
    return (
      <Human
        data={item}
        change={(f, id) => {
          isSearching ? changeDataSearch(f, id) : changeDataLocal(f, id);
        }}
      />
    );
  };
  const clearSearch = () => {
    setKeyWord('');
    setIsSeartching(false);
    setResult([]);
    setHumans([]);
    onRefresh();
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        (state.userRole === 'Admin' || state.userRole === 'Super admin') && {
          paddingTop: 50,
        },
      ]}>
      {/* <StatusBar backgroundColor="#E51F1D" /> */}
      <Spinner visible={spin} />
      {(state.userRole === 'Admin' || state.userRole === 'Super admin') && (
        <View style={styles.toptab}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{position: 'absolute', top: 10, left: 10, zIndex: 100}}>
            <Icon name="arrowleft" color="black" size={30} />
          </TouchableOpacity>
          <Text style={styles.underlineTextContainer}>ДЭМЖИГЧИД</Text>
          <View style={styles.underLine} />
        </View>
      )}
      <View style={[styles.search, {backgroundColor: 'white'}]}>
        <Ficon name="search" size={25} color="#9E9898" />
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
        <TouchableOpacity onPress={() => clearSearch()}>
          <Ficon name="x" size={30} color="#9E9898" />
        </TouchableOpacity>
      </View>
      {isSearching ? (
        result.length > 0 ? (
          <FlatList
            style={{
              width: windowWidth * 0.95,
            }}
            onRefresh={() => {
              setHumans([]);
              onRefresh();
            }}
            refreshing={refreshing}
            columnWrapperStyle={{justifyContent: 'space-around'}}
            numColumns={3}
            data={result}
            renderItem={renderHuman}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{
              height: '95%',
              justifyContent: 'center',
              alignItems: 'center',
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
          data={humans}
          renderItem={renderHuman}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={onEnd}
          onEndReachedThreshold={1}
        />
      )}
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
    // width: '100%',
  },
  mapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: 'red',
  },
  search: {
    marginTop: '1%',
    alignSelf: 'center',
    flexDirection: 'row',
    // marginRight: 10,
    borderRadius: 20,
    // minWidth: 150,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    width: '100%',
    height: windowHeight * 0.11,
    backgroundColor: 'transparent',
  },
  searchInput: {
    padding: 0,
    // backgroundColor: 'red',
    minWidth: 50,
    height: 35,
  },
  toptab: {
    elevation: 5,
    position: 'absolute',
    top: 0,
    zIndex: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 15,
    width: windowWidth * 1,
    backgroundColor: '#F0F0F0',
  },
  underlineTextContainer: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  underLine: {
    borderRadius: 4,
    height: 4,
    width: 72,
    backgroundColor: '#000000',
  },
  scrollExtra: {
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'red',
    width: windowWidth * 0.95,
    // paddingBottom: 50,
    // paddingTop: 10,
  },
});
