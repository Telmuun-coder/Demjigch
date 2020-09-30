import React, {useState, createContext, useMemo, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const UserState = createContext();

const UserStore = (props) => {
  const [showSplash, setShowSplash] = useState(true);
  const [rem, setRem] = useState('had');
  const [state, setState] = useState({
    userRole: null,
    userRole: 'Admin',
    token: null,
    candidateId: null,
    userId: null,
    committeeId: null,
    error: null,
    candidates: [],
    // data: {},
  });

  const setStater = (valName, val) => {
    switch (valName) {
      case 'token':
        setState((prev) => ({
          ...prev,
          token: val,
        }));
        break;
      case 'data':
        setState((prev) => ({
          ...prev,
          data: val,
        }));
        break;
      case 'userRole':
        setState((prev) => ({
          ...prev,
          userRole: val,
        }));
        break;
      case 'candidateId':
        setState((prev) => ({
          ...prev,
          candidateId: val,
        }));
        break;
      case 'error':
        setState((prev) => ({
          ...prev,
          error: val,
        }));
        break;
      case 'candidates':
        setState((prev) => ({
          ...prev,
          candidates: val,
        }));
        break;
      case 'committeeId':
        setState((prev) => ({
          ...prev,
          committeeId: val,
        }));
        break;
      case 'userId':
        setState((prev) => ({
          ...prev,
          userId: val,
        }));
        break;
      default:
        break;
    }
  };

  const getCandidates = (token, committeeId, role) => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
    if (role == 1 || role == 2) {
      axios
        .get(`http://api.minu.mn/election/elUser/candidates?committeeId=`)
        .then((res) => {
          // console.log('kkkkkk', res.data.entity);
          if (res.data.message === 'Амжилттай') {
            setStater('candidates', res.data.entity);
          }
        })
        .catch((e) =>
          console.log('Admin Ner devshigchine get hiih uyin aldaa: ', e),
        );
    } else {
      axios
        .get(
          `http://api.minu.mn/election/elUser/candidates?committeeId=${committeeId}`,
        )
        .then((res) => {
          // console.log('gggggggg', res.data.entity);
          if (res.data.message === 'Амжилттай') {
            setStater('candidates', res.data.entity);
          }
        })
        .catch((e) => console.log('Ner devshigchine get hiih uyin aldaa: ', e));
    }
  };

  const auth = useMemo(
    () => ({
      login: async (phoneNumber, password, setSpin) => {
        const user = {
          phone: phoneNumber, //'88564757',
          password: password, //'12345678',
        };
        setSpin(true);
        await axios
          .post('http://api.minu.mn/election/elUser/login', user)
          .then(async (res) => {
            // console.log('login', res.data.entity);
            if (res.data.message === 'Амжилттай') {
              setStater('error', null);
              getCandidates(
                res.data.token,
                res.data.entity.elCandidate === null
                  ? res.data.entity.committeeId
                  : res.data.entity.elCandidate.committeeId,
                res.data.entity.roleId,
              );
              console.log(res.data.message + 'Nevterlee');
              setStater('token', res.data.token);
              setStater('userRole', res.data.entity.roleName);
              // setStater('userRole', 'Admin');
              setStater('userId', res.data.entity.userId);
              setStater(
                'candidateId',
                res.data.entity.elCandidate === null
                  ? null
                  : res.data.entity.elCandidate.candidateId,
              );
              if (res.data.entity.elCandidate === null)
                setStater('committeeId', res.data.entity.committeeId);
              else
                setStater(
                  'committeeId',
                  res.data.entity.elCandidate.committeeId,
                );
            } else {
              //aldaag haruulna
              setStater('error', res.data.message);
            }
          })
          .catch((e) => {
            if (e.message === 'Network Error')
              alert('Та инернет холболтолтоо шалгана уу.');
            console.log(e.message);
          })
          .finally(() => {
            setSpin(false);
            // console.log('sda', await AsyncStorage.getItem('state'));
          });
      },
      logout: async () => {
        // AsyncStorage.multiRemove(['token', 'data']);
        await AsyncStorage.removeItem('state');
        setStater('token', null);
      },
    }),
    [],
  );
  const restore = async () => {
    setTimeout(() => setShowSplash(false), 1000);
    const prevState = await AsyncStorage.getItem('state');
    const prevRem = await AsyncStorage.getItem('rem');
    if (prevState != null) {
      const tmp = JSON.parse(prevState);
      setState(tmp);
      // console.log('backUp', tmp);
    }
    prevRem === null ? setRem('had') : setRem(prevRem);
  };

  const saveState = async () => {
    await AsyncStorage.setItem('state', JSON.stringify(state));
    await AsyncStorage.setItem('rem', rem);
  };

  useEffect(() => {
    if (state.token != null) {
      rem === 'had' && saveState();
    } else return;
  }, [state]);

  useEffect(() => {
    // setShowSplash(true);
    restore();
  }, []);

  return (
    <UserState.Provider
      value={{state, setStater, auth, setRem, rem, setShowSplash, showSplash}}>
      {props.children}
    </UserState.Provider>
  );
};

export default UserStore;
