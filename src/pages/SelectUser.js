import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config.js";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./SelectUser.css";

const SelectUser = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"), where("public", "==", true));
    onSnapshot(q, (querySnapshot) => {
      const users2 = [];
      console.log(querySnapshot);
      querySnapshot.forEach((doc) =>
        users2.push({ ...doc.data(), id: doc.id })
      );
      setUsers(users2);
    });
  }, []);

  const capitalize = (string) => {
    if (typeof string == "string") {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return null;
  };

  return (
    <div className="selected-user-page">
      <h2 className="selected-user-name">
        Selected User: {props.selectedUser.name}
      </h2>
      <div className="select-users-container">
        {users.map((element) => {
          return (
            <div key={element.id} className="select-button-container">
              <button
                className="select-button"
                onClick={() => {
                  props.buttonHandler(element);
                }}
              >
                Select user: {capitalize(element.name)}
              </button>
            </div>
          );
        })}
      </div>

      <Link to="/User" className="from-select-user-page-link">
        View User Page
      </Link>
    </div>
  );
};

export default SelectUser;
