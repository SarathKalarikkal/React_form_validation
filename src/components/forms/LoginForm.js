import React, { useState } from 'react'
import "./form.css"
import { IoEyeOff } from 'react-icons/io5';
import { IoEye } from 'react-icons/io5';

function LoginForm() {

const [formstate, setFormState] = useState({
  email : "",
  password : ""
})
const [errors, setErrors]= useState({})
const [focusInp, setFocusInp] =useState(null)
const [successMessage, setSuccessMessage] = useState('')
const [showPassword, setShowPassword] = useState(true);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
 
  const passwordInput = document.getElementById("password");
  passwordInput.type = !showPassword ? "password" : "text";
 };



const handleChange =(e)=>{
  setFormState({
    ...formstate,
    [e.target.name] : e.target.value
  })
}

const handleSubmit = (e)=>{
  setErrors({})
  setSuccessMessage("")

let isFormValid = true

  e.preventDefault()
  console.log("submit")
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if(!emailRegex.test(formstate.email)){
    setErrors((err)=>({
      ...err,
      emailErr : "Email is not valid"
    }))
    isFormValid = false
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if(!passwordRegex.test(formstate.password)){
    setErrors((err)=>({
      ...err,
      passwordErr : "Password is not valid"
    }))
    isFormValid = false
  }

  if(Object.keys(errors).length === 0){
    if(isFormValid){
      setSuccessMessage("Login Successful!")
    }
    
  }

}

const handleFocus = (inpValue) =>{
  setFocusInp(inpValue)
}
const handleBlur = (inpValue) =>{
  setFocusInp(null)
}

  return (
    <>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="input-group">
         <input type="email" name="email" id="email"  value={formstate.email} onChange={handleChange} onFocus={()=>handleFocus('email')} onBlur={handleBlur}/>
         <label htmlFor="email" className={focusInp === "email" || formstate.email.length > 0 ? 'active' : ""}>Email</label>
         {errors.emailErr && <p className="errorMessage">{errors.emailErr}</p>}
      </div>
      <div className="input-group">
         <input type="password" name="password" id="password" className='passwordInp' value={formstate.password} onChange={handleChange} onFocus={()=>handleFocus('password')} onBlur={handleBlur} />
         <label htmlFor="password" className={focusInp === "password" || formstate.password.length > 0 ? 'active' : ""}>Password</label>
         {showPassword ? ( <IoEyeOff className="eyeicon" onClick={togglePasswordVisibility} />) : (<IoEye className="eyeicon" onClick={togglePasswordVisibility} />) }
         {errors.passwordErr && <p className="errorMessage">{errors.passwordErr}</p>}
      </div>
      <button type='submit'>Login</button>
    </form>
    {successMessage && <p className= "successMessage">{successMessage}</p>}
    </>
  )
}

export default LoginForm