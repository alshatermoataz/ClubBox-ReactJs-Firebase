import { createContext, useContext, useEffect, useState, } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import { auth } from '../../firebase';


const UserContext = createContext();

globalThis.userID = "";//

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});


  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(function(data){userID = data.user.uid.toString(); console.log(userID)});
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password).then(function(data){userID = data.user.uid.toString(); console.log(userID)});
   }

  const logout = () => {
      return signOut(auth).then(function(data){userID = ""; console.log(userID)});
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
