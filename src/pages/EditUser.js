import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  doc,
  updateDoc,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./EditUser.css";

export default function EditUser() {
  const { user } = UserAuth();
  const [storedUser, setStoredUser] = useState({});
  const [ageInput, setAgeInput] = useState(0);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const updateUser = async () => {
      if (typeof storedUser.id != "undefined") {
        console.log("firebase write");
        await updateDoc(doc(db, "users", storedUser.id), storedUser);
      }
    };
    updateUser();
    // eslint-disable-next-line
  }, [storedUser]);

  useEffect(() => {
    const _callback = () => {
      if (typeof storedUser.id == "undefined") {
        return <Navigate to="/" />;
      }
    };
    if (user.uid !== undefined) {
      const q = query(
        collection(db, "users"),
        where("author_uid", "==", user.uid)
      );
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setStoredUser({ ...doc.data(), id: doc.id });
        });
      });
      _callback();
    }
  }, [user.uid, storedUser.id]);

  const setAge = (age) => {
    if (age <= 999) {
      setStoredUser({ ...storedUser, age: Number(age) });
    } else if (age > 999) {
      alert("max age is 999");
    } else if (age < 0) {
      alert("cannot have negative age");
    }
    document.getElementById("age-input").value = "";
  };

  const setName = (name) => {
    if (name.length <= 28) {
      setStoredUser({ ...storedUser, name: name });
    } else {
      alert("name too long");
    }
    document.getElementById("name-input").value = "";
  };

  const capitalize = (string) => {
    if (typeof string == "string") {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return null;
  };

  return (
    <div className="edit">
      <h1 className="edit-display-user-name">
        User: {capitalize(storedUser.name)}
      </h1>
      <div className="edit-container">
        <div className="edit-name-field">
          <div className="current-name">
            <div>Current Name: {capitalize(storedUser.name)}</div>
          </div>
          <div className="name-input-container">
            <input
              id="name-input"
              className="name-input"
              type="text"
              placeholder="Input name here..."
              maxLength="28"
              onChange={(event) => {
                setNameInput(event.target.value);
              }}
            />
          </div>
          <div className="name-button-container">
            <button
              className="set-name-button"
              onClick={() => {
                setName(nameInput);
              }}
            >
              Set Name
            </button>
          </div>
        </div>
        <div className="edit-age-field">
          <div className="current-age">
            <div>Current Age: {storedUser.age}</div>
          </div>
          <div className="age-input-container">
            <input
              id="age-input"
              className="age-input"
              type="number"
              placeholder="Input age here..."
              maxLength="3"
              max="130"
              onChange={(event) => {
                setAgeInput(event.target.value);
              }}
            />
          </div>
          <div className="age-button-container">
            {" "}
            <button
              className="set-age-button"
              onClick={() => {
                setAge(ageInput);
              }}
            >
              Set Age
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
