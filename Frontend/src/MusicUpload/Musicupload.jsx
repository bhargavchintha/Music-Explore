import React, {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import './Musicupload.css'
import axios from 'axios';

const Musicupload = () => {
   let history = useHistory();

   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

 useEffect(() => {
  const fetchNavbarData = () => {
    axios.get('/navbar')
      .then(response => {
        const { isLoggedIn, user } = response.data;
        setIsLoggedIn(isLoggedIn);
        setUser(user);
      })
      .catch(error => console.error('Error fetching navbar data:', error));
  };

  fetchNavbarData(); 

  return 
}, []);

   const [songselectedImage, setSongSelectedImage] = useState(null);

   const handleSongImageChange = (e) => {
      const file = e.target.files[0];
     if (file) {
       const reader = new FileReader();
       reader.onload = () => {
        setSongSelectedImage(reader.result);
       };
       reader.readAsDataURL(file);
     }
   };


   const [selectedSong, setSelectedSong] = useState(null);
    const [songDuration, setSongDuration] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSongChange = (event) => {
        const file = event.target.files[0];
        const fileSize = file.size / 1024 / 1024; // Convert to MB
        if (fileSize > 1) {
            setErrorMessage('File size exceeds 1MB.');
            return;
        }

        const audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = () => {
            const duration = Math.round(audio.duration);
            if (duration < 10 || duration > 20) {
                setErrorMessage('Song duration must be between 10 to 20 seconds.');
                return;
            }
            setSongDuration(duration);
            setSelectedSong(file);
            setErrorMessage('');
        };
    };

   const [musicvalues, setMusicvalues] = useState({
    songid: '',
    songname: '',
    songdescription:'',
    songlicence:' ',
    songprice: '',
    songimage:'',
    songpreview:'',
    songorginal:''
  });
  
  const handleMusic = (event) => {
    setMusicvalues({ ...musicvalues, [event.target.name]: event.target.value });
  };


    
    
  const handlemusicuploadsubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('songid',  user.id);
  formData.append('songname', musicvalues.songname);
  formData.append('songdescription', musicvalues.songdescription);
  formData.append('songlicence', musicvalues.songlicence);
  formData.append('songprice', musicvalues.songprice);
  //formData.append('songpreview', musicvalues.songpreview);
  //formData.append('songorginal', musicvalues.songorginal);

    const songimagefile = event.target.elements.songimage.files[0]; 
    const songpreviewfile = event.target.elements.songpreview.files[0];
    const songoriginalfile = event.target.elements.songoriginal.files[0];

    //const file = event.target.elements.songorginal.files[0];


    
    formData.append('songimage', songimagefile);
    formData.append('songpreview', songpreviewfile);
    formData.append('songoriginal', songoriginalfile);
    
    axios.post('/songs', formData)
      .then((response) => {
        // Handle success response, such as showing a success message or redirecting to another page
       // console.log('Server response:', response.data);
    
        // Reset the selected image state after successful submission
        //setSongSelectedImage(null);
        
        history.push('/Uploadfiles');
        

      })
      .catch((error) => {
        console.error('Error uploading song:', error);
        // Handle error, such as displaying an error message to the user
      });

  };
  useEffect(() => {
    const fetchHomeSongs = async () => {
      try {
        const response = await axios.get('/Homesongs');
        setHomesongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    // const intervalId = setInterval(fetchHomeSongs, 2500); 

    // return () => clearInterval(intervalId);
  }, []);
    
  
  return (
    <>
     <div className='Music_Upload'>
    
    <title>Music Upload</title>
       <div className='Music_values'>
       
       {isLoggedIn &&(<><div className='Music_Title'>
            <div className='Close_Btn_music'>
                  <button  onClick={() => history.goBack()} className='Close_Button_Music' >X</button>
               </div>
           <form method='post' onSubmit={handlemusicuploadsubmit} className='Form_Music_Up' >
              <div className='H_Music'>
                  <h1 className='Music_Name_Upload_q'>
                     Music Upload 
                  </h1>
              </div>
              <div className='Container_Music'>
                 <div className='Content_Music'>
                     <div className='Inputs_Music_grid'>
                         <div className='musicupload_Inputs'>
                            <input type='text'  name="songname"  onChange={handleMusic} value={musicvalues.songname} maxLength={15}   pattern="[A-Za-z\s]+"   required />
                            <label className='Music_Upolad_L' >Song Name</label>
                          </div>
                          <div className='musicupload_Inputs'>
                          <input type='text'  name="songdescription"  onChange={handleMusic} value={musicvalues.songdescription}   pattern="[A-Za-z\s]+"  maxLength={40} required />
                            <label className='Music_Upolad_L' >Song description</label>
                          </div>
                          <div className='musicupload_Inputs'>
                              <p className='Music_Upolad_Perview_P' >Song Image</p>
                                <div className='Small_Note_Perview'>
                                  <p className='Note_Music_small'>Note: <small className='Music_Note_Up' >Not required, but if there, please upload.</small></p>
                                </div>

                          {songselectedImage && (
                       <>
                        <div className='center_IMg_upload'>
                          <img src={songselectedImage} alt="Selected" className='Img_preview_Music'/>
                        </div>
                       </>
                      )} 
                            <input type='file' title='preview file' name="songimage" onChange={handleSongImageChange} accept=".jpg, .jpeg, .png" />
                          </div>
                          <div className='musicupload_Inputs'>
                            <p className='Music_Upolad_Perview_P' >Song Perview</p>
                            <div className='Small_Note_Perview'>
                                <p className='Note_Music_small'>Note: <small className='Music_Note_Up' >The song should be greater than10 seconds, but  <span className='Br_Line_up'><br></br></span>less than 20 seconds.</small></p>
                            </div>
                            <div className='Preview_song_View_Upload'>
                            {selectedSong && (
                                       <div>
                                          <audio className='Audio_preview_Music' controls  controlsList="nodownload" >
                                                <source src={URL.createObjectURL(selectedSong)} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                          </audio>
                                       </div>
                                    )}
                                    {errorMessage && <p>{errorMessage}</p>}
                            </div>
                            <input type="file" title='preview file' name="songpreview" onChange={handleSongChange} accept=".mp3" />
                          </div>
                          <div className='musicupload_Inputs'>
                            <p className='Music_Upolad_Perview_P' >Orginal Song</p>
                              <div className='Small_Note_Perview'>
                                  <p className='Note_Music_small'>Note: <small className='Music_Note_Up' >Upload here Orginal song here</small></p>
                              </div>
                             <input type='file' title='preview file' placeholder='Preview File' name="songoriginal"  accept=".zip,.rar"  />
                          </div> 
                          <div className='musicupload_Inputs'>
                            <p className='Music_Upolad_Perview_P'>Song Licence</p>
                            <select className='Song_Type' name='songlicence' required onChange={handleMusic}  defaultValue=''>
                                  <option value='' disabled  >Please choose an option</option>
                                  <option value='Standard'  >Standard</option>
                                  <option value='professional'>professional</option>
                                  <option value='exclusive'>exclusive</option>
                            </select>
                          </div>
                          <div className='musicupload_Inputs'>
                          <p className='Note_Music_small'>Note: <small className='Music_Note_Up' >Here, the song price will be calculated in USD(DOLLAR). </small></p>
                              <div className='musicupload_Input' >
                                <input type='number'  name="songprice"  required onChange={handleMusic} value={musicvalues.songprice} />
                                <label className='Music_Upolad_L' >Song Price</label>
                              </div>
                          </div>
                          <div className='musicupload_Inputs'>
                              <div className='Submit_Btn_Music'>
                                  <button className='Music_Upload_Data'>Upload</button>
                              </div>
                           </div>

                     </div>
                 </div>
              </div>

           </form>
           

           </div>
           </>)}
        </div>
       
     </div>
        
     </>
  )
}

export default Musicupload