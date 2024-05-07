import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
  const history = useHistory();
  const [passwordType, setPasswordType] = useState('password');
  const [values, setValues] = useState({
    name: '',
    userid: '',
    email: '',
    password: ''
  });

  const showPassword = () => {
    setPasswordType(prevType => prevType === 'password' ? 'text' : 'password');
  };

  const handleSign = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const OTPRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000); 
  };

  const [erroruserid, setErrorMessage] = useState('');
  const handleSignSubmit = (event) => {
    const specialCharRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;

    // Check if userid contains at least one special character
    if (!specialCharRegex.test(values.userid)) {
      event.preventDefault();
      setErrorMessage('Userid must contain at least one special character and One number and also no spaces between characters');
      return;
    }
    function generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let tokenkey = '';
  
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          tokenkey += characters.charAt(randomIndex);
      }
      
      return tokenkey;
  }
  
  const tokenkey = generateRandomString(32);

     event.preventDefault();
    const randomKey = OTPRandomNumber();
    axios.post('/signup', {
      name: values.name,
      userid: values.userid,
      email: values.email,
      password: values.password,
      randomKey: randomKey,
      tokenkey:tokenkey
    })
    .then(res => {
     // console.log();
      // Clear the form data upon successful signup
      // setValues({
      //   name: '',
      //   userid: '',
      //   email: '',
      //   password: ''
      // });
      // Redirect to login page
      history.push('/Login');
    })
    .catch(err => {
      if (err.response && err.response.data && (err.response.data.error === 'Email already exists' || err.response.data.error === 'User ID already exists')) {
        // Show error message for existing email or userid
        setErrorMessage(err.response.data.error);
      } else {
        console.log(err);
      }
    });
    
  };
  

  return (
    <div className='Login_Page_Full'>
      <title>Signup</title>
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
          {erroruserid && <div style={{ color: 'red', fontSize:'18px', fontWeight:'600' }}>{erroruserid}</div>}
            <form className='Login_Page' id='loginForm' onSubmit={handleSignSubmit} method='post'>
              <h1 className='Name_Sign_e3'>Sign up to start <span className='Music_Name'><br/>listening</span></h1>
              <div className='Name-User_Field'>
                <div className="input-field">
                  <input type="text" required name='name' onChange={handleSign} value={values.name}/>
                  <label className='Enter_Email'>Name</label>
                </div>
              </div>
              <div className='Name-User_Field'>
                <div className="input-field">
                  <input type="text" required name='userid' minLength={8} maxLength={11} onChange={handleSign} value={values.userid}/>
                  <label className='Enter_Email'>User Id</label>
                  
                </div>
              </div>
              <div className='Email-User_Field'>
                <div className="input-field">
                  <input type="email" required name='email' onChange={handleSign} value={values.email}/>
                  <label className='Enter_Email'>Enter email</label>
                </div>
              </div>
              <div className='Cn_Passwords'>
                <div className='Password_Field'>
                  <div className="input-field">
                    <input id="Showpassword" type={passwordType} required name='password' minLength={8} onChange={handleSign} value={values.password}/>
                    <label className='Enter_Email'>Password</label>
                  </div>
                </div>
                <div className='Error_msg'>
                  <p className='Msg_error'></p>
                </div>
              </div>
              <div className='Password-Show'>
                <div className='Show_password'>
                  <input type="checkbox" id="showPassword" onClick={showPassword}/>
                  <label htmlFor="showPassword" className="Show_pass">Show Password</label>
                </div>
              </div>
              <div className='Submit_Button_Sign'>
                <input type='submit' value={'Sign Up'}/>
              </div>
            </form>
            <div className='Hr_Line'>
              <div className='Hr_Line_txt'>
                <p className='Hr_Line_Er'>or</p>
              </div>
              <div className='Sign_up-Page'>
                <p className='Link_send'> Already have an account? <Link className='Link_Sign-Up' to='/Login'>Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
