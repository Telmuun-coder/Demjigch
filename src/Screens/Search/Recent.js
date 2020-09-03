import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableNativeFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import Ficon from 'react-native-vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Item = (props) => (
  <TouchableNativeFeedback
    onPress={() => props.onClick(props.val)}
    style={styles.item}
    useForeground={false}
    background={TouchableNativeFeedback.Ripple('#5F5F5F')}>
    <View style={styles.item}>
      <Ficon name="search" size={windowWidth * 0.04} color="#9E9898" />
      <Text style={{marginHorizontal: 10}}>
        {props.val.length < 50 ? props.val : props.val.slice(0, 45) + '...'}
      </Text>
    </View>
  </TouchableNativeFeedback>
);

class Recent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recents: [],
      focus: true,
      more: true,
    };
  }

  componentWillMount = () => {
    // console.log(require('./history'));
    this.setState({recents: require('./history')});
  };
  render() {
    // console.log(this.state.recents[0].value);
    return (
      <View style={styles.container}>
        {this.state.more ? (
          <View styles={styles.firsFive}>
            <Item
              onClick={this.props.recentSearch}
              val={this.state.recents[0].value}
            />
            <Item
              onClick={this.props.recentSearch}
              val={this.state.recents[1].value}
            />
            <Item
              onClick={this.props.recentSearch}
              val={this.state.recents[2].value}
            />
            <View style={styles.seeMore}>
              <TouchableNativeFeedback
                onPress={() => {
                  this.setState({more: false});
                  Keyboard.dismiss();
                }}
                style={styles.seeMore}
                useForeground={false}
                background={TouchableNativeFeedback.Ripple('#adb0b3')}>
                <View style={styles.seeMore}>
                  <Text style={{fontWeight: 'bold', marginRight: 10}}>
                    See More
                  </Text>
                  <Ficon
                    name="chevron-down"
                    size={windowWidth * 0.05}
                    color="black"
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        ) : (
          <>
            <FlatList
              style={{paddingRight: 10}}
              keyExtractor={(item) => item.id}
              data={this.state.recents}
              renderItem={({item}) => {
                return (
                  <Item onClick={this.props.recentSearch} val={item.value} />
                );
              }}
            />
            {/* <View style={styles.footer} /> */}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  seeMore: {
    backgroundColor: '#cfcfcf',
    width: windowWidth * 0.9,
    height: 40,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    //backgroundColor: 'transparent',
    //backgroundColor: 'red',
  },
  item: {
    flexDirection: 'row',
    margin: 1,
    width: '100%',
    // backgroundColor: 'gray',
    height: windowHeight * 0.05,
    paddingHorizontal: 10,
    // marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  footer: {
    width: '100%',
    height: windowHeight * 0.1,
    backgroundColor: 'transparent',
  },
});

export default Recent;
