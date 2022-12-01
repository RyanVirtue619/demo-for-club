import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config.js";
import { doc, onSnapshot } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext.js";
import "./UserPage.css";

function UserPage(props) {
  const { user } = UserAuth();
  let currentUser = useRef(props.selectedUser);
  const userId = props.selectedUser.id;

  useEffect(() => {
    try {
      onSnapshot(doc(db, "users", userId), (doc) => {
        currentUser.current = { ...doc.data(), id: userId };
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  if (typeof userId == "undefined") {
    return (
      <div className="App">
        <h1>No User</h1>
        <Link to="/SelectUser" className="from-user-select-user-link">
          Go to select user?
        </Link>
      </div>
    );
  }

  const capitalize = (string) => {
    if (typeof string == "string") {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return null;
  };

  return (
    <div className="user-page">
      <div className="user-container" key={currentUser.current.id}>
        <div className="name-container">
          <div className="name-text">Name: </div>
          <div className="user-name">
            {capitalize(currentUser.current.name)}
          </div>
        </div>

        <div className="age-container">
          <div className="age-text">Age: </div>
          <div className="user-age">{currentUser.current.age}</div>
        </div>
        <div className="edit-user-link-container">
          {currentUser?.current.author_uid === user?.uid ? (
            <Link
              to="/EditUser"
              className="edit-user-link
        "
            >
              Edit User
            </Link>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
