import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Spinner from "./spinner";
import '../App.css';

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  // const [spinnerMsg, setSpinnerMsg] = useState('');
  const {register,handleSubmit,formState: { errors },reset} = useForm();

//   const onSubmit = (data) => {console.log(data);setSuccessMsg("User registration is successful.");reset();};
const onSubmit = async (data) => {
    try {
      // Convert form data to JSON
      const jsonData = JSON.stringify(data);
  
      // Make a POST request to the Flask API endpoint
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      });
  
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        // setSuccessMsg("User registration is successful.please check your mail for verification");
        reset();
        setTimeout(() => {
          setSuccessMsg("User registration is successful. Please check your mail for verification");
          setTimeout(() => {
            // setSpinnerMsg(""); // Clear spinner message
            <Spinner message={"loading..."}/>
            navigate('/verify-email');
          }, 5000); // 5000 milliseconds (5 seconds)
        }, 2000); 

      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Error:', errorData);
        setSuccessMsg(errorData['error']);
        reset();
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      reset();
    }
  };
  

  return (
    <div>
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>{successMsg && <p className="success-msg">{successMsg}</p>}
      <div style={{ textAlign: 'center' }} className="form-header">
        <h3>signup Here</h3>
      </div>
      <div class="form-body">
        <div className="form-control">
          <label>Username</label>
          <input type="text"{...register("username", { required: "Username is required." })}autoComplete={"true"}
          placeholder={"username" }/>
          {errors.username && (<p className="errorMsg">{errors.username.message}</p>)}
        </div>
      <div className="form-control">
          <label>Email</label>
          <input type="text"{...register("email", {required: "Email is required.",pattern: {value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
          message: "Email is not valid."}})}autoComplete={"true"}placeholder={"Email" } />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value
                  )}})} autoComplete={"true"}placeholder={"password" }/>
          {errors.password?.type === "required" && (
            <p className="errorMsg">Password is required.</p>
          )}
          {errors.password?.type === "checkLength" && (
            <p className="errorMsg">
              Password should be at-least 6 characters.
            </p>
          )}
          {errors.password?.type === "matchPattern" && (
            <p className="errorMsg">
              Password should contain at least one uppercase letter, lowercase
              letter, digit, and special symbol.
            </p>
          )}
        </div>
        <div  style={{ textAlign: 'center' }} >
          <button type="submit">Register</button>
        </div>
        <div className="form-footer">
          <div class="anchor" style={{display:'flex',justifyContent:'center',gap:'20px'}}>
            <a href="/reset">Forgot Password?</a>
            <a href="/login">Already have an account.</a>
          </div>
          <div className="social">
            <div className="go"><i class="fab fa-google"></i>  Google</div>
            <div className="fb"><i class="fab fa-facebook"></i>  Facebook</div>
          </div>
        </div>
      </div>
    </form>
  </div>
  </div>
   
  );
}
