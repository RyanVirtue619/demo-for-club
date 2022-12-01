import React, { useEffect, useState } from "react";
import {
  addDoc,
  deleteDoc,
  collection,
  onSnapshot,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";
import "./Account.css";
import { Link } from "react-router-dom";
export default function Account() {
  const { logOut, user } = UserAuth();
  const [storedUser, setStoredUser] = useState({});
  const [userMenu, setUserMenu] = useState(false);
  const [ageInput, setAgeInput] = useState(0);

  useEffect(() => {
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
    }
  }, [user.uid]);

  /*const logStoredUser = () => {
    console.log(storedUser);
    console.log(user.uid);
  };*/

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {
    if (ageInput > 999 || ageInput < 0) {
      alert("Invalid age, cannot be negative or above 1000");
      document.getElementById("set-age").value = "";
    } else {
      try {
        const newDoc = await addDoc(collection(db, "users"), {
          name: user.displayName,
          age: Number(ageInput),
          author_uid: user.uid,
          public: true,
        });
        document.getElementById("set-age").value = "";
        setUserMenu(!userMenu);
        console.log("new doc id" + newDoc.id);
        toggleMenu();
      } catch (error) {
        alert("You do not have permission to do this action");
      }
    }
  };

  const togglePublic = async () => {
    if (storedUser.id === undefined) {
      toggleMenu();
    } else {
      try {
        storedUser.public = !storedUser.public;
        await updateDoc(doc(db, "users", storedUser.id), storedUser);
      } catch (error) {
        console.log(error);
        alert("You don't have permission to do that");
      }
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setStoredUser({});
    } catch (error) {
      console.log(error);
      alert("You do not have permission to do this");
    }
  };

  const toggleMenu = () => {
    setUserMenu(!userMenu);
  };

  return (
    <div className="account-page">
      <div className="account-header">Account Page</div>
      <div className="account-content">
        <div className="account-display-name-container">
          <p className="account-display-name">Welcome, {user?.displayName}</p>
        </div>
        <div>
          <p>
            Your account is currently:{" "}
            {storedUser.public ? "public" : "private"}
          </p>
        </div>
        <button className="logout-button" onClick={handleSignOut}>
          Logout
        </button>
        <div>
          {userMenu ? (
            <div>
              <input
                id="set-age"
                className="edit-age-input"
                type="number"
                placeholder="Enter age to display"
                onChange={(event) => {
                  setAgeInput(event.target.value);
                }}
              />
              <button className="set-public-with-age" onClick={createUser}>
                Set Public with entered age
              </button>
              <button className="exit-create-user" onClick={toggleMenu}>
                Exit
              </button>
            </div>
          ) : (
            <button className="public-toggle" onClick={togglePublic}>
              Toggle Public Account
            </button>
          )}
        </div>
        {storedUser?.id !== undefined ? (
          <>
            <button
              className="delete-button"
              onClick={() => deleteUser(storedUser.id)}
            >
              Delete User
            </button>
            <Link className="edit-public" to="/EditUser">
              Edit Public Account
            </Link>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
