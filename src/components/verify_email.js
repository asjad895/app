import React, { useEffect,useState }from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import axios from 'axios';
import Spinner from './spinner';

export default function VerifyEmail() {
  const [error, setError] = useState(false);
  const [successMsg,setSuccessMsg] = useState('');
  // const [token] = useSearchParams();
  const token='assshfj'
  const navigate=useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  useEffect(() => {
    const verify = () => {
      console.log(token);
  
      fetch('http://127.0.0.1:5000/verify_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then(response => {
          console.log(response);
  
          // Check if the response is okay before parsing JSON
          if (response.ok) {
            return response.json();
          } else {
            // Handle unsuccessful verification
            return response.json().then(errorData => Promise.reject(errorData));
          }
        })
        .then(responseData => {
          // Handle successful verification
          setSuccessMsg("Email verification is successful. Redirecting to the login..");
          setIsRedirecting(true); // Show spinner
  
          setTimeout(() => {
            setIsRedirecting(false); // Hide spinner before navigation
            navigate('/login');
          }, 2000);
        })
        .catch(error => {
          // Handle verification error
          setError(true);
          console.error(error);
  
          setTimeout(() => {
            setIsRedirecting(false);
            navigate('/signup');
          }, 2000);
        });
    };
  
    if (token) {
      verify();
    }
  }, [token, navigate]);
  
  return (
  <div>
    {/* ... other content ... */}
    {successMsg && <Spinner message={successMsg} />}
    {error && <p>Error: Email verification failed.</p>}
    {/* Conditionally render Spinner if needed */}
    {isRedirecting && <Spinner message="Redirecting loading..." />}
    {error&&<Spinner message="Error Redirecting ..." />}
    {!successMsg && !error && <Spinner message="processing..." />}
  </div>
);

}
