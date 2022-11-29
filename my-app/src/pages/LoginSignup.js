import React, { useEffect, useState } from "react";
import Auth from "../components/Auth";

function LoginSignup({ userRepository }) {
  const [users, setUsers] = useState([]);

  // const [userId, setUserId] = useState("100");

  const createUser = (user) => {
    const updated = { ...users };
    updated[user.id] = user;
    setUsers(updated);
    console.log("user added : ", user);
    userRepository.saveUser("userList", user); //saving into firebase db
  };
  const deleteUser = (user) => {
    const updated = { ...users };
    delete updated[user.id];
    setUsers(updated);
    userRepository.removeUser("userList", user);
  };

  return (
    <React.Fragment>

      <Auth onAdd={createUser} deleteUser={deleteUser} />
    </React.Fragment>
  );
}

export default LoginSignup;
