import React, { useState, useEffect } from "react";
import avtar from "/images/loginavatar.svg";
import bg from "/images/book_login.png";
import wave from "/images/loginwave.png";
import logo from "/images/logo3.png";
import "./Login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  // Clear localStorage before login
  useEffect(() => {
    window.localStorage.clear();
  }, []);

  // Handle input value changes
  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  // Focus handler
  const handleFocus = (field) => {
    setFocus((prevFocus) => ({
      ...prevFocus,
      [field]: true,
    }));
  };

  // Blur handler
  const handleBlur = (field, value) => {
    if (value === "") {
      setFocus((prevFocus) => ({
        ...prevFocus,
        [field]: false,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputValues;
  
    try {
      const response = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data);
  
      // Check if token exists in the response
      if (data.token) {
        toast.success(data.message || "Login successful");
        window.localStorage.setItem("token", data.token); // Store the token
        window.localStorage.setItem("userType", data.userType); // Store the userType
        window.localStorage.setItem("loggedIn", true);
  
        setTimeout(() => {
          window.location.href = "./dashboard/dashboard";
        }, 2000);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    }
  };
  
  return (
    <>
      <div>
        <img className="login-wave" src={wave} alt="wave background" />
        <div className="login-container">
          <div className="login-img">
            <img src={bg} alt="background" />
          </div>
          <div className="login-content">
            <form className="login-form" onSubmit={handleSubmit}>
              <img src={logo} alt="avatar" />

              {/* Email field */}
              <div
                className={`login-input-div one ${
                  focus.email ? "login-focus" : ""
                }`}
              >
                <div className="login-i">
                  <i className="fas fa-envelope" />
                </div>
                <div className="login-div">
                  <h5
                    className={
                      inputValues.email || focus.email ? "login-move-up" : ""
                    }
                  >
                    Email
                  </h5>
                  <input
                    type="email"
                    name="email"
                    className="login-input"
                    value={inputValues.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={(e) => handleBlur("email", e.target.value)}
                  />
                </div>
              </div>

              {/* Password field */}
              <div
                className={`login-input-div pass ${
                  focus.password ? "login-focus" : ""
                }`}
              >
                <div className="login-i">
                  <i className="fas fa-lock" />
                </div>
                <div className="login-div">
                  <h5
                    className={
                      inputValues.password || focus.password
                        ? "login-move-up"
                        : ""
                    }
                  >
                    Password
                  </h5>
                  <input
                    type="password"
                    name="password"
                    className="login-input"
                    value={inputValues.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus("password")}
                    onBlur={(e) => handleBlur("password", e.target.value)}
                  />
                </div>
              </div>

              <a className="forgot-pass" href="#">
                Forgot Password?
              </a>
              <input type="submit" className="login-btn" value="Login" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
