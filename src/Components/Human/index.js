import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import ProImg from '../ProImg';
import Icon from 'react-native-vector-icons/AntDesign';
import Mood from '../Mood';
import axios from 'axios';
import {UserState} from '../../Context/UserStore';
import Spinner from '../Spinner';

class Human extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      flag: this.props.data.enableFlag,
      spin: false,
    };
  }
  setShow = (val) => this.setState({show: val});
  setFlag = (able) => this.setState({flag: able});
  static contextType = UserState;

  // componentDidMount() {
  //   this.setFlag(this.props.data.enableFlag);
  // }

  componentDidUpdate() {
    this.setFlag(this.props.data.enableFlag);
  }

  // useEffect(() => {
  //   setFlag(props.data.enableFlag);
  // }, [props.data.enableFlag]);

  putData = () => {
    this.setState({spin: true});
    const data = {
      promoterId: this.props.data.promoterId,
      userId: this.props.data.userId,
      enableFlag: !this.props.data.enableFlag,
    };

    let config = {
      headers: {
        headers: {'Content-Type': 'application/json'},
        Authorization: `Bearer ${this.context.state.token}`,
      },
    };
    axios
      .put('http://api.minu.mn/election/elPromoter/updateCnt', data, config)
      .then((res) => {
        // console.log('Flag: ', res.data);
        if (res.data.message === 'Амжилттай') {
          this.props.change(
            !this.props.data.enableFlag,
            this.props.data.promoterId,
          );
          //this.props.onRefresh();
          // this.setFlag(res.data.entity.enableFlag);
          // console.log('mani duudagdjinu');
        } else alert('Алдаа гарлаа');
      })
      .catch((e) => console.log('FlafError', e.message))
      .finally(() => {
        this.setState({spin: false});
        this.setShow(false);
      });
  };
  render() {
    if (this.props.data.blank)
      return <View style={[styles.container, {height: 90}]} />;
    else
      return (
        <TouchableNativeFeedback
          useForeground={false}
          background={TouchableNativeFeedback.Ripple('#5F5F5F')}
          onPress={() => this.setShow(true)}>
          <View style={styles.container}>
            <Mood
              flag={this.state.flag}
              data={this.props.data}
              show={this.state.show}
              putData={this.putData}
              spin={this.state.spin}
              setShow={() => this.setShow(false)}
            />
            {this.state.flag && (
              <Icon
                style={styles.check}
                name="checkcircle"
                color={'#EC1A21'}
                size={24}
              />
            )}
            <ProImg mini={true} color="#F0F0F0" uri={this.props.data.imgPath} />
            <Text style={styles.name}>
              {this.props.data.firstName[0] + //end aldaa zaaj bn
                '. ' +
                this.props.data.lastName}
            </Text>
            <Text style={styles.mail}>{this.props.data.email}</Text>
            <Text style={styles.num}>{this.props.data.phone}</Text>
          </View>
        </TouchableNativeFeedback>
      );
  }
}

export default Human;

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
  num: {
    alignSelf: 'center',
    // backgroundColor: 'red',
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
