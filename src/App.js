import "./App.css";
import UserPage from "./pages/UserPage.js";
import Layout from "./pages/Layout";
import SelectUser from "./pages/SelectUser";
import EditUser from "./pages/EditUser";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Protected from "./components/Protected";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignIn from "./pages/SignIn";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const [selectedUser, setSelectedUser] = useState({});

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="Home" element={<Home />}></Route>
            <Route
              path="User"
              element={<UserPage selectedUser={selectedUser} />}
            />
            <Route
              path="SelectUser"
              element={
                <SelectUser
                  selectedUser={selectedUser}
                  buttonHandler={(clickedUser) => {
                    setSelectedUser(clickedUser);
                  }}
                />
              }
            />
            <Route
              path="EditUser"
              element={
                <Protected>
                  <EditUser
                    selectedUser={selectedUser}
                    updateUser={(user) => {
                      setSelectedUser(user);
                    }}
                  />
                </Protected>
              }
            />
            <Route path="SignIn" element={<SignIn />}></Route>
            <Route
              path="Account"
              element={
                <Protected>
                  <Account />
                </Protected>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
