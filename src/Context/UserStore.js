import React, {useState, createContext, useMemo} from 'react';

export const UserState = createContext();

const UserStore = (props) => {
  const [state, setState] = useState({
    token: null,
    userRole: null,
    phoneNumber: null,
    userRole: 'Member',
    candidateId: {
      candidateId: 3,
    },
  });
  const setStater = (valName, val) => {
    switch (valName) {
      case 'token':
        setState((prev) => ({
          ...prev,
          token: val,
        }));
        break;
      case 'userRole':
        setState((prev) => ({
          ...prev,
          userRole: val,
        }));
        break;
      case 'phoneNumber':
        setState((prev) => ({
          ...prev,
          phoneNumber: val,
        }));
        break;
      case 'userRole':
        setState((prev) => ({
          ...prev,
          userRole: val,
        }));
        break;
    }
  };
  const auth = useMemo(
    () => ({
      login: (phoneNumber, password) => {
        //console.warn(phoneNumber + ', ' + password);
        setStater('token', 'sad');
      },
      logout: () => setStater('token', null),
    }),
    [],
  );
  return (
    <UserState.Provider value={{state, setStater, auth}}>
      {props.children}
    </UserState.Provider>
  );
};

export default UserStore;
