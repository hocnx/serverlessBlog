import React, { createContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Hub } from "aws-amplify";

const initialData = {
    username: null, 
    userID: null
}
export const UserContext = createContext();
async function fetchUser() {
  const userData = await Auth.currentSession().catch((err) =>
    console.log("error: ", err)
  );

  if (!userData) {
    console.log("userData: ", userData);
    return initialData;
  }
  const {
    idToken: { payload },
  } = userData;
  const isAuthorized =
    payload["cognito:groups"] && payload["cognito:groups"].includes("Admin");
  return {
    username: payload["cognito:username"],
    userID: payload["cognito:username"],
    isAdmin: isAuthorized,
  };
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    username: "",
    userID: ""
  });
  useEffect(() => {
    fetchUser().then((user) => {
      setUser(user);
    });

    Hub.listen("auth", (data) => {
      const {
        payload: { event },
      } = data;
      console.log("event: ", event);
      if (event === "signIn") {
        console.log('sigin event')
        fetchUser().then((user) => {
          setUser(user);
        });
      }
      if (event === "signOut") {
        console.log('siginOut event')
        setUser(initialData);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
