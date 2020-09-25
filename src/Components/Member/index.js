import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProImg from '../ProImg';
import Liner from '../Liner';

class Member extends PureComponent {
  render() {
    if (this.props.data.blank)
      return <View style={[styles.container, {height: 90}]} />;
    else
      return (
        <View style={styles.container}>
          <ProImg mini={true} color="#F0F0F0" uri={this.props.data.imgPath} />
          <Text style={styles.name}>
            {this.props.data.firstName[0].toUpperCase() +
              '. ' +
              this.props.data.lastName}
          </Text>
          <Liner red={this.props.data.promoterCnt} />
        </View>
        // </TouchableNativeFeedback>
      );
  }
}

export default Member;

const styles = StyleSheet.create({
  container: {
    width: 100,
    // backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {fontSize: 12, fontWeight: 'bold', color: '#000000'},
  mail: {
    fontSize: 8,
    color: '#000000',
    opacity: 0.87,
  },
  numm: {
    fontSize: 10,
    color: '#000000',
    opacity: 0.87,
  },
  check: {
    zIndex: 100,
    position: 'absolute',
    right: 10,
    top: 15,
  },
});
