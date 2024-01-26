import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [username, setUsername] = useState('asjad1');
  const [password, setPassword] = useState(/* your initial password value */);
  const [email, setEmail] = useState(/* your initial email value */);
  const [error, setError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  // setUsername('asjad1');
  console.log(username);
  // useEffect to enable/disable submit button based on username changes
  useEffect(() => {
    const isUsernameChanged = username ;
    setIsSubmitDisabled(!isUsernameChanged);
  }, [username]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    console.log(username);
    fetch(`http://127.0.0.1:5000/users/${username}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);
  console.log(userData);
  const handleSubmit = () => {
    fetch('your_api_endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful API response
        setUserData(data);
        setSuccessMsg('aaya'); 
        setTimeout(() => {
        }, 2000);
      })
      .catch(error => {
        // Handle API response error
        setError('Error submitting data to the API: ' + error.message);
      });
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/email/${username}`, { method: 'POST' });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Password reset:', data);
  
      if (data.success) {
        setSuccessMsg("Email sent");
        setTimeout(() => {
          navigate('/reset'); 
        }, 3000);
      } else {
        // Handle error message from server
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      // Handle network or other errors
    }
    successMsg && <p className="success-msg">{successMsg}</p>
  };
  //profile container which should be eidtablle and submittable according to username  chnagled
  return (
    <div>
      {/* Display success/error messages if any */}
      {successMsg && <p className="success-msg">{successMsg}</p>}
      {error && <p className="error-msg">{error}</p>}
      <h2>Profile</h2>
      {userData && <><p>{userData.username}</p><p>{userData.email}</p><p>{userData.password}</p></>}
    </div>
  );
  
   
};

export default Profile;
