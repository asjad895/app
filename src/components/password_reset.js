import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (data) => {
    try {
      const jsonData = JSON.stringify(data);
      console.log(data);
      const response = await fetch('http://127.0.0.1:5000/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Password reset response:', responseData);

      if (responseData.success) {
        setSuccessMsg("Password reset successful. Redirecting to login page...");
        reset();
        setTimeout(() => {
          reset(); // Reset form fields
          navigate('/login'); // Navigate to login page after 3 seconds
        }, 3000);
      } else {
        setSuccessMsg("Password reset failed. Please try again.");
        reset();
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setSuccessMsg("An unexpected error occurred. Please try again later.");
      reset();
    }
  };
  
  return (
    <div>
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
        </div>
    <div style={{ backgroundColor: '#9cc5b4;', padding: '20px',justifyContent:'centre' }} className="form-container">
      <form onSubmit={handleSubmit(handleResetPassword)}>{successMsg && <p className="success-msg">{successMsg}</p>}
      <div style={{ textAlign: 'center' }} className="form-header">
        <h3>Password Reset</h3>
      </div>
      <div class="form-body">
        <div className="form-control">
          <label>Username</label>
          <input type="text"{...register("username", { required: "Username is required." })}autocomplete={"true"}
          placeholder={"username" }/>
          {errors.username && (<p className="errorMsg">{errors.username.message}</p>)}
        </div>
        <div className="form-control">
          <label>New Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value
                  )}})} autocomplete={"true"}placeholder={"password" }/>
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
          <button type="submit">Reset</button>
        </div>
        <div className="form-footer">
          <div class="anchor"style={{display:'flex',justifyContent:'center',gap:'20px'}}>
            <a href="/login">Want Login?</a>
          </div>
        </div>
      </div>
    </form>
  </div>
  </div>
   
  );
};

export default PasswordReset;
