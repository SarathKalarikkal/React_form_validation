import React from 'react'
import RegisterForm from './forms/RegisterForm'
import LoginForm from './forms/LoginForm'
import { useState } from 'react'
import "./forms/form.css"

const Form = () => {

  const [message, setMessage] = useState("signup")

  const handleLinkClick = (e, value) => {
    e.preventDefault(); 
    setMessage(value);
 };

  return (
    <div className='form-container'>
    {message === "signup" ? (
      <>
        <RegisterForm />
        <p className="info">
          Already have an account? <a href="/" onClick={(e) => handleLinkClick(e, "login")}>Login</a>
        </p>
      </>
    ) : (
      <>
        <LoginForm />
        <p className="info">
          Don't have an account? <a href="/" onClick={(e) => handleLinkClick(e, "signup")}>Signup</a>
        </p>
      </>
    )}
  </div>
  )
}

export default Form
