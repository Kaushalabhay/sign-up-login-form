import axios from "axios";
import React, { useEffect } from "react"; //rfc
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      return navigate("/login");
    }

    const fetchUser = async () => {
      try {
        const response = await axios.post("http://localhost:5000/user", { userId });
        setUserData(response.data.user);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleLogOut = () => {
    sessionStorage.removeItem("userId");
    return navigate("/login");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm(
      "Are you sure you want to delete your Account?"
    );
    if (!confirmation) {
      return;
    }
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.delete("http://localhost:5000/user", {
        data: { userId },
      });
      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      <form className="home-form">
        <h1 className="heading">Your Profile:</h1>
        {userData ? (
          <>
            <div className="home-div">
              <h3>Name: {userData.name}</h3>
            </div>
            <div className="home-div">
              <h3>Email: {userData.email}</h3>
            </div>
            <div className="home-div">
              <h3>Id: {userData._id}</h3>
            </div>
          </>
        ) : (
          <p>No user Data</p>
        )}

        <div>
          <button className="home-button" onClick={handleLogOut}>
            Log-out
          </button>
          <button className="home-button" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}
