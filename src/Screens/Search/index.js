import React, {Component, createRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
import Ficon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import Recent from './Recent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: true,
      // focus: true,
      word: '',
      // search: '',
    };
    this.refing = createRef();
  }
  recentSearch = (rec) => {
    this.setState({word: rec});
    this.changeTolov();
  };

  changeTolov = () => {
    this.setState({isSearching: !this.state.isSearching});
  };
  updateSearch = (s) => {
    this.setState({search: s});
  };
  doSearch = () => {
    // this.setState({focus: false});
    //1. ogogdloo tataj awchirna
    //2. history luu hiine.
  };
  deleteAllHirtory = () => {
    //1. Buh history ustgana
    Alert.alert(
      'Анхаар!',
      'Бүх түүхийг устгах уу?',
      [
        {text: 'Үгүй', onPress: () => console.log('I knew youu')},
        {
          text: 'Тийм',
          onPress: () => console.log('Really nigga'),
          // style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  // componentDidMount = () => {
  //   //this.refing.current.autoFocus = true;
  //   //this.setState({recents: require('./history')});
  // };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: 35,
              height: 30,
            }}
            onPress={() => this.props.navigation.goBack()}>
            <Icon
              size={windowWidth * 0.07}
              name={'ios-arrow-back'}
              color="#9E9898"></Icon>
          </TouchableOpacity>
          <View style={styles.modalSearch}>
            <TextInput
              // focus={this.state.focus}
              style={styles.input}
              autoFocus
              ref={this.refing}
              inlineImageLeft="search_icon"
              placeholder="Хайх"
              keyboardType="web-search"
              onFocus={() => console.log('focus received')}
              onBlur={() => console.log('focus lost')}
              onChangeText={(text) => {
                this.setState({word: text});
                if (text === '') this.changeTolov();
              }}
              value={this.state.word}
            />
            <TouchableOpacity
              style={styles.search}
              onPress={() => {
                if (this.state.isSearching === false) this.setState({word: ''});
                else if (this.state.word !== '') this.doSearch();
                this.changeTolov();
              }}>
              {this.state.isSearching ? (
                <Ficon
                  name="search"
                  size={windowWidth * 0.06}
                  color="#9E9898"
                />
              ) : (
                <Icon
                  name="ios-close"
                  size={windowWidth * 0.06}
                  color="#7E7E7E"
                />
              )}
            </TouchableOpacity>
          </View>
          {/* <View>
            <SearchBar
              platform="default"
              lightTheme={true}
              containerStyle={styles.newSearch}
              inputContainerStyle={styles.inputContainer}
              rightIconContainerStyle={styles.rightIcon}
              placeholder="Хайх..."
              onChangeText={this.updateSearch}
              value={this.state.search}
            />
          </View> */}
        </View>
        <View
          style={{width: windowWidth, borderWidth: 0.3, borderColor: '#a6a1a1'}}
        />
        {this.state.isSearching && (
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={styles.clear}
              onPress={() => this.deleteAllHirtory()}>
              <Text style={{fontWeight: 'bold'}}>Clear all</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.isSearching && <Recent recentSearch={this.recentSearch} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '93%',
    //marginVertical: hp('2%'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    //backgroundColor: 'red',
  },
  container: {
    flex: 1,
    // padding: '1%',
    backgroundColor: 'transparent',
    //backgroundColor: 'red',
  },

  modalSearch: {
    marginVertical: windowWidth * 0.02,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#cfcfcf',
    // backgroundColor: 'green',
    borderRadius: 50,
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingLeft: 15,
    marginRight: 15,
    alignItems: 'center',
  },
  search: {
    // marginHorizontal: '5%',
    //backgroundColor: 'yellow',
    marginRight: 10,
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '83%',
    // backgroundColor: 'blue',
  },
  clear: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    marginRight: 10,
  },
});

export default Search;
