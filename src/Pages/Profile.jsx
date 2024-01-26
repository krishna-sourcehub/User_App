import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import API_URL from '../../config/global';
import "../css/Profile.css";
const Profile = () => {
  const [res, setRes] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.token) {
      getData(user.token);
    }
  }, []);
  
  const getData = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(`${API_URL}/profile`, config);
  
      if (response.data === "Invalid Token") {
        alert("Login again");
      } else if (response.data === "Server Busy") {
        alert("Unauthorized access");
      } else if (response?.status) {
        setRes(response.data.auth_token);
        console.log(res.name)
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  
  return (
    <Container>
    <h1>Profile {res.name}</h1>
    </Container>
  )
}

export default Profile