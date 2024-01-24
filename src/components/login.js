import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "./spinner";
import '../App.css';
import { useNavigate } from 'react-router-dom';
export default function LoginForm() {
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = useState("");
  // const [spinnerMsg, setSpinnerMsg] = useState('');
    const {register,handleSubmit,formState: { errors },reset} = useForm();

//   const onSubmit = (data) => {console.log(data);setSuccessMsg("User registration is successful.");reset();};
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const jsonData = JSON.stringify(data);
            sessionStorage.setItem('username', jsonData.username);
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            });
            // Check if the request was successful (status code 2xx)
            console.log("aaaaaaaa",response)
            if (response.ok) {
                const responseData = await response.json();
                
                console.log(responseData);
                // setSuccessMsg("User registration is successful.please check your mail for verification");
                reset();
                setTimeout(() => {
                    setSuccessMsg("login successfull");
                    setTimeout(() => {
                        // setSpinnerMsg(""); // Clear spinner message
                        <Spinner message={"loading..."}/>
                        navigate('/dashboard');
                    }, 5000); // 5000 milliseconds (5 seconds)
                 }, 2000); 
            } else {
                    // Handle error response
                    const errorData = await response.json();
                    console.error('Error:', errorData['message']);
                    reset();
                    setSuccessMsg(errorData['message']);
                }
            } catch (error) {
                console.error('An unexpected error occurred:', error);
                reset();
            }
        };
    
  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>{successMsg && <p className="success-msg">{successMsg}</p>}
      <div style={{ textAlign: 'center' }} className="form-header">
        <h3>Login Here</h3>
      </div>
      <div className="form-body">
        <div className="form-control">
          <label>Username</label>
          <input type="text"{...register("username", { required: "Username is required." })}autoComplete={"true"}
          placeholder={"username" }/>
          {errors.username && (<p className="errorMsg">{errors.username.message}</p>)}
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
          <button type="submit">Login</button>
        </div>
        <div className="form-footer">
          <div  className="anchor" style={{display:'flex',justifyContent:'center',gap:'20px'}}>
            <a href="/reset">Forgot Password?</a>
            <a href="/signup">Dont have account.👍</a>
          </div>
        </div>
      </div>
    </form>
  </div>
  </div>
  );
}
