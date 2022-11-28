import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../service/userPool";

const AccountContext = createContext();

const Account = (props) => {
  const getSession = async () => {
    return await new Promise((res, rej) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            rej();
          } else {
            res(session);
          }
        });
      } else {
        console.log("no user logged in! calling reject");
        rej();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((res, rej) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess: ", data);
          res(data);
        },
        onFailure: (err) => {
          console.error("onFailure: ", err);
          rej(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
          res(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
