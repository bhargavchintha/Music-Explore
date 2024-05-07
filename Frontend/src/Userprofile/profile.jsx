import React,{useEffect,useState} from 'react'
import './profile.css'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const profile = () => {
  const toggleDarkMode = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const element = document.body;
    element.classList.toggle('dark-side');
    localStorage.setItem('darkMode', !isDarkMode);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const element = document.body;

    if (isDarkMode) {
      element.classList.add('dark-side');
    }
  }, []);

  const [user, setUser] = useState('')
   const [updateMessage, setUpdateMessage] = useState('');
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/user-profile');
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
    
  }, []);

  

//f const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmitprofile = (event) => {
      event.preventDefault();
      
      // Create FormData object
      const formData = new FormData();
      
      // Append user data to FormData
      formData.append('name', event.target.elements.name.value);
      formData.append('userid', event.target.elements.userid.value);
      formData.append('email', event.target.elements.email.value);
      formData.append('phoneno', event.target.elements.phoneno.value);
      formData.append('dob', event.target.elements.dob.value);
      formData.append('gender', event.target.elements.gender.value);
      
      // Append image file to FormData
      const file = event.target.elements.image.files[0];
      if (file) {
        formData.append('image', file);
      }
    
      // Send FormData using Axios
      axios.post('/updateprofile', formData)
        .then(response => {
          console.log(response.data);
          // Update UI or show success message
          setUpdateMessage(response.data.message);
          setTimeout(() => {
            setUpdateMessage('');
          }, 2000);
        })
        .catch(error => {
          console.error('Error updating profile:', error);
          // Handle error
        });
    };
    


  return (
    <>
    <div className='User_profile_id'>
    {user ?(
      <>
      <title>User Profile</title>
      <div className='Dark_btn'>
          <Link className="Back_to-Home" to='/Home'> <i id="Fa_Arrow_Left" className="fa fa-arrow-left" aria-hidden="true"></i> Back to home</Link>
         <button onClick={toggleDarkMode}  className="BUTNS Button_BTN  Byu" title="Change To Dark Mode"></button>
      </div>
       <div className='User_profile_M'>
         <div className='User_Profile_List'>
         <form  method='post' onSubmit={handleSubmitprofile} >
                    <div className='Update_MSG_Profile'>
                          {updateMessage && <p  className='Profile_Update_Message' >{updateMessage}</p>}
                    </div>
                 <div className='Upload_Img'>
                    <label htmlFor="fileInput" className="fileInputLabel">
                    {selectedImage ? (
                        <img src={selectedImage} alt="Selected" className='Img_preview'/>
                      ) : (
                        <img  src={user.image ? `/userimages/${user.image}` : ''}  className='Img_preview_Back'/>
                      )}
                        <div className='Upload_Btn_image'>
                          <input type="file" id="fileInput" className="fileInput" name='image' onChange={handleImageChange}  accept=".jpg, .jpeg, .png"  />
                        </div>
                      </label>
                 </div>
                  <div className='User_Name_Id_profile'>

                      <div className='User_Name_profile'>
                        <p className='Name_User_Profile'>Name:</p>
                        <input className='Input_Profile' type='text'  name='name'  defaultValue={user ? user.name : ''}  placeholder='yourname' />
                      </div>

                      <div className='User_ID_P'>
                        <p className='Name_User_Profile'>User Id:</p>
                        <input className='Input_Profile' type='text'  value={user ? user.userid : ''} readOnly name='userid' placeholder='yourname' />
                      </div>

                      <div className='User_ID_P'>
                        <p className='Name_User_Profile'>Email:</p>
                        <input className='Input_Profile' type='email'  value={user ? user.email : ''} readOnly name='email' placeholder='yourname' />
                      </div>

                      <div className='User_ID_P'>
                        <p className='Name_User_Profile'>phone Number:</p>
                        <input className='Input_Profile' type='number' minLength={10} maxLength={15} defaultValue={user ? user.phoneno : ''}  name='phoneno' placeholder='Phone Number' required />
                      </div>

                      <div className='User_ID_P'>
                        <p className='Name_User_Profile'>Data of Birth:</p>
                        <input className='Input_Profile' type='date'  name='dob' defaultValue={user.dob} pattern='^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$'  required />
                      </div>

                      <div className='User_ID_P'>
                        <p className='Name_User_Profile'>Gender:</p>
                        <select className='Input_Profile' name='gender' required >
                         <option disabled selected value={user.gender} > {user.gender}</option>
                          <option value='Male'>Male</option>
                          <option value='Female'>Female</option>
                          <option value='Other'>Other</option>
                        </select>
                      </div>

                  </div>

                  <div className='Submit_Profile_btn-BTNS'>
                   <button className='Profile_Sub_Btn'>Update</button>
                  </div>
                  
             </form>
         </div>
       </div>
       
       </>):(<>
       Login and Check Data
       </>) }
    </div>
    </>
  )
}

export default profile