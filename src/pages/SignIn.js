import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

export default function SignIn() {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/account");
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="sign-in-page-container">
      <div className="sign-in-page">
        <div className="sign-in-text">Sign In</div>
        <GoogleButton className="google-button" onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
}
