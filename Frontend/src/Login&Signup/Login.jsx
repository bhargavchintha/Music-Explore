import React, { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinnerloader/Spinner';

const Login = () => {
  const showPassword = () => {
    var x = document.getElementById("Showpassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const history = useHistory();
  const [login, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 // const [user, setUser] = useState(null);
  
 const handleLoginsub = (event) => {
  event.preventDefault();
  setIsLoading(true);
  axios.post('/login', {
    login: login,
    password: password
  })
  .then(response => {
    setTimeout(() => {
      setIsLoading(false);
      history.push('/Home');
    }, 2000);
     
    // Check if response contains data
    if (response && response.data) {
      // Access data and perform actions
      sessionStorage.setItem('token', JSON.stringify(response.data.user.tokenkey));
    } else {
      // Handle case where response data is missing
      console.error('Response data is missing');
    }
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
    if (error.response && error.response.data && error.response.data.error) {
      // Update error message state with the message from the server
      setErrorMessage(error.response.data.error);
    } else {
      // If error response does not contain an error message, display a generic error message
      setErrorMessage('An error occurred. Please try again later.');
    }
    setIsLoading(false); // Set loading state to false regardless of the error
  });
}

  


  const handleChange = (event) => {
    if (event.target.name === 'login') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  return (
    <>
      <div className='Login_Page_Full'>
        <title>Login</title>
        <div className='Login_page'>

          <div className='Dark_Btn_Logo'>
            <div className='Logo_Music'>
              {/* <Link className="Music_Name-Ex" to="/Home">Music Explore</Link> */}
            </div>
            <div className='Dark_Btn_Switch'>
              <Link className="Music_Name-Ex" to="/Home">Music Explore</Link>
            </div>
          </div>

          <div className='Login_From'>
            <div className='Login_From_Create'>
              {errorMessage && <div  className="error-message" style={{ color: 'red', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>{errorMessage}</div>}
              <form className='Login_Page' id='loginForm' onSubmit={handleLoginsub} method='post' >
                <h1 className='Name_Log'>
                  Log in To <span className='Music_Name_Ex'> Music Explore</span>
                </h1>
                <div className='Email-User_Field'>
                  <div className="input-field">
                    <input type="text" required name="login" value={login} onChange={handleChange} />
                    <label className='Enter_Email' >Enter email/ Userid</label>
                  </div>
                </div>
                <div className='Password_Field'>
                  <div className="input-field">
                    <input id="Showpassword" type="Password" required name='password' value={password} onChange={handleChange} />
                    <label className='Enter_Email' >Password</label>
                  </div>
                </div>
                <div className='Password-Show'>

                  <div className='Show_password'>
                    <input type="checkbox" id="showPassword" onClick={showPassword} /><label htmlFor="showPassword" className="Show_pass">Show Password</label>
                  </div>

                  <div className='Forgot_Password'>
                    <Link to="/Forgot-password" className='forgot_Password_user'>Forgot Password</Link>
                  </div>

                </div>

                <div className='Submit_Button'>
                  <input type='submit' value={'Log In'} />
                </div>

              </form>

              <div className='Hr_Line'>
                <div className='Hr_Line_txt'>
                  <p className='Hr_Line_Er'>or</p>
                </div>
                <div className='Sign_up-Page'>
                  <p className='Link_send'> Don't have an account? <Link className='Link_Sign-Up' to='/Signup'>Sign up</Link></p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      {isLoading && <Spinner />}
    </>
  )
}

export default Login;