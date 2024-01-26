import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../../config/global';
import "../css/SignUp.css";
const Password = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    enteredOtp: "",
    email: "",
    newPassword: "",
    repeatPassword: ""

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  function ValidateEmail(mail) {
    console.log('Email validation called');
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }

  const checkPassword = (password) => {
    // Check if the password has at least 8 characters
    if (password.length < 8) {
      alert('Password must have at least 8 characters.');
      return false;
    }

    // Check if the password contains at least one number
    if (!/\d/.test(password)) {
      alert('Password must contain at least one number.');
      return false;
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      alert('Password must contain at least one uppercase letter.');
      return false;
    }

    // Check if the password contains at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      alert('Password must contain at least one special character.');
      return false;
    }

    console.log('Password is valid!');
    return true;
  };

  function matchPassword() {
    console.log(formData.newPassword)
    if (formData.newPassword === formData.repeatPassword) {
    
      return true;
    }
    else {
      alert("Check Password and repeated Password");
    }
  }

  


  function verifyemail(e) {
    e.preventDefault();

    const isValid =
      ValidateEmail(formData.email);
  

    if (isValid) {
      console.log('All validations passed. Proceeding with logic...');
      sendOTP();
    } else {
      console.log('Validation failed. Check console for details.');
    }
  }

  const sendOTP = async (e) => {
    console.log(formData);
    try {
      const response = await axios.post(`${API_URL}/reset/Password`, formData);
      if (response.data && response.data.message !== undefined) {
        const messageValue = response.data.message;

        if (messageValue === true) {
          alert("OTP  Sent to your email Id");
          console.log("OTP  Sent to your email Id");
        } else {
          console.log("Email not exists. You don't have account");
          alert("Email not exists. You don't have account");
        }
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error during User verification:", error);
    }

  };

  function verifyPassword(e) {
    e.preventDefault();

    const isValid =
      checkPassword(formData.newPassword) &&
      matchPassword();

    if (isValid) {
      console.log('All validations passed.');
      changePassword();
    } else {
      console.log('Validation failed.');
    }
  }

  const changePassword = async (e) => {
    console.log(formData);
    try {
      console.log(formData.enteredOtp)
      const response = await axios.post(`${API_URL}/reset/verify`, formData);
      if (response.data && response.data.message !== undefined) {
        const messageValue = response.data.message;


        if (messageValue === true) {
          alert("Password Changed Successfully");
          console.log("Password Changed Successfully");
          navigate("/");
        } else {
          console.log("Invalid OTP");
          alert("Invalid OTP");
        }
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error during Registration:", error);
    }

  };



  return (
    <Container>
      <h1>Change Password</h1>
      <Form onSubmit={verifyPassword}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Button variant='primary' onClick={verifyemail}> Send OTP </Button>
        <Form.Group>
          <Form.Label>OTP</Form.Label>
          <Form.Control type="number" name="enteredOtp" value={formData.enteredOtp} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" name="newPassword" value={formData.newPassword} onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Repeat New Password</Form.Label>
          <Form.Control type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required />
        </Form.Group>

        <Button variant='primary' type='submit'>Register</Button>
        <p>Already have an account? <Link to="/">Login</Link></p>

      </Form>
    </Container>
  );
}

export default Password;
