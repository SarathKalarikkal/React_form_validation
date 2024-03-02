import React, { useState } from "react";
import "./form.css";
import { IoEyeOff } from 'react-icons/io5';
import { IoEye } from 'react-icons/io5';

function RegisterForm() {

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [focusedInput, setFocusedInput] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConPassword, setShowConPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);

    const passwordInput = document.getElementById("password");

    if (showPassword) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  const togglePasswordConVisibility = () => {
    setShowConPassword(!showConPassword);

    const passwordInput = document.getElementById("confirmPassword");

    if (showConPassword) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };
  

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("")

    let formIsValid = true;

    if (formState.firstName.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "First name is required",
      }));
      formIsValid = false;
    } else if (formState.firstName.length > 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "Only 8 characters are allowed",
      }));
    }

    if (formState.lastName.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Last name is required",
      }));
    } else if (formState.lastName.length > 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Only 2 characters are allowed",
      }));
      formIsValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formState.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is not valid",
      }));
       formIsValid = false;
    } else if (formState.email.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
       formIsValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formState.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
      }));
      formIsValid = false;
    }

    if (formState.confirmPassword !== formState.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      formIsValid = false;
    }

    if (Object.keys(errors).length === 0) {
      if (formIsValid) {
        setSuccessMessage("Signup successful!");
      }
    }
  };
  

  return (
    
    <>
    <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="name-group">
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formState.firstName}
              onChange={handleChange}
               onFocus={() => handleFocus("firstName")}
              onBlur={handleBlur}
            />
            <label htmlFor="firstName" className={focusedInput === "firstName" || formState.firstName ? "active" : ""} >First Name</label>
            {errors.firstName && <p className="errorMessage">{errors.firstName}</p>}
          </div>
          <div className="input-group">
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formState.lastName}
              onChange={handleChange}
               onFocus={() => handleFocus("lastName")}
              onBlur={handleBlur}
            />
            <label htmlFor="lastName" className={focusedInput === "lastName" || formState.lastName ? "active" : ""}>Last Name</label>
            {errors.lastName && <p className="errorMessage">{errors.lastName}</p>}
          </div>
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
             onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
          />
          <label htmlFor="email" className={focusedInput === "email" || formState.email ? "active" : ''}>Email</label>
          {errors.email && <p className="errorMessage">{errors.email}</p>}
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
             onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
          />
          <label htmlFor="password"  className={focusedInput === "password" || formState.password ? "active" : ''}>Password</label>
          {showPassword ? (
        <IoEyeOff className="eyeicon" onClick={togglePasswordVisibility} />
      ) : (
        <IoEye className="eyeicon" onClick={togglePasswordVisibility} />
      )}
          
          {errors.password && <p className="errorMessage">{errors.password}</p>}
        </div>
        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
             onFocus={() => handleFocus("confirmPassword")}
              onBlur={handleBlur}
          />
          <label htmlFor="confirmPassword" className={focusedInput === "confirmPassword" || formState.confirmPassword ? "active" : ''}>Confirm Password</label>
          {showConPassword ? (
        <IoEyeOff className="eyeicon" onClick={togglePasswordConVisibility} />
      ) : (
        <IoEye className="eyeicon" onClick={togglePasswordConVisibility} />
      )}
          {errors.confirmPassword && <p className="errorMessage">{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Signup</button>
        
      </form>
      {successMessage && <p className="successMessage">{successMessage}</p>}
    </>
  );
}

export default RegisterForm;
