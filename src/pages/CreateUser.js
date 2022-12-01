import React from "react";
import "./CreateUser.css";
import { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

export default function CreateUser(props) {
  const { user } = UserAuth();
  const [userMenu, setUserMenu] = useState(false);
  const [ageInput, setAgeInput] = useState(0);
  const [nameInput, setNameInput] = useState("");

  const createUser = async () => {
    if (ageInput > 999 || ageInput < 0) {
      alert("Invalid age, cannot be negative or above 1000");
      document.getElementById("set-age").value = "";
    } else if (nameInput.length > 28) {
      alert("Name must be less than 28 characters");
      document.getElementById("set-name").value = "";
    } else {
      try {
        const newDoc = await addDoc(collection(db, "users"), {
          name: nameInput,
          age: Number(ageInput),
          author_uid: user.uid,
        });
        document.getElementById("set-name").value = "";
        document.getElementById("set-age").value = "";
        setUserMenu(!userMenu);
        console.log("new doc id" + newDoc.id);
      } catch (error) {
        alert("You do not have permission to do this action");
      }
    }
  };

  if (userMenu) {
    return (
      <div className="create-user-container">
        <div className="name-set-container">
          <input
            id="set-name"
            className="set-name-input "
            type="text"
            placeholder="Name..."
            maxLength="28"
            onChange={(event) => {
              setNameInput(event.target.value);
            }}
          ></input>
        </div>
        <div className="age-set-container">
          <input
            id="set-age"
            className="set-age-input"
            type="number"
            placeholder="Age..."
            onChange={(event) => {
              setAgeInput(event.target.value);
            }}
          ></input>
        </div>
        <button
          className="create-user-button"
          onClick={() => {
            createUser();
          }}
        >
          Create User
        </button>
        <button
          className="exit-create-user-button"
          onClick={() => {
            setUserMenu(!userMenu);
          }}
        >
          Exit
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          className="enter-create-menu-button"
          onClick={() => {
            setUserMenu(!userMenu);
          }}
        >
          Click to create a new user
        </button>
      </div>
    );
  }
}
