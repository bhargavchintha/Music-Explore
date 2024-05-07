import React, { useEffect, useState } from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';
import './home.css';

const Home = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
 const history = useHistory();

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


  // const intervalId = setInterval(fetchNavbarData, 1500); 

  // return () => clearInterval(intervalId);
 
}, []);


  const [Homesongs, setHomesongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  useEffect(() => {
    const fetchHomeSongs = async () => {
      try {
        const response = await axios.get('/Homesongs');
        setHomesongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchHomeSongs();

    
    const storedExpandedIndexes = JSON.parse(localStorage.getItem('expandedIndexes'));
    if (storedExpandedIndexes) {
      setExpandedIndexes(storedExpandedIndexes);
    }
    
    const intervalId = setInterval(fetchHomeSongs, 1500); 

    return () => clearInterval(intervalId);
  }, []);

  // Function to handle accordion toggle
  const toggleAccordion = (index) => {
    const updatedIndexes = expandedIndexes.includes(index)
      ? expandedIndexes.filter((idx) => idx !== index)
      : [...expandedIndexes, index];
    setExpandedIndexes(updatedIndexes);
    localStorage.setItem('expandedIndexes', JSON.stringify(updatedIndexes));
  };

  const handlePlayButtonClick = (index) => {
    setCurrentSongIndex(index);
  };

  const handleAudioRef = (element) => {
    setAudioPlayer(element);
  };


const [addToWishlistError, setAddToWishlistError] = useState('');
const [addToWishlistSuccess, setAddToWishlistSuccess] = useState('');
  const addToWishlist = async (id, songname, songdescription, songlicence, songprice, songimage, songpreview, songoriginal) => {
    try {
      const response = await axios.post('/Add-To-Wishlist', { 
        id, 
        songname, 
        songdescription, 
        songlicence, 
        songprice, 
        songimage, 
        songpreview, 
        songoriginal 
      });
     // console.log('Song added to wishlist:', response.data);
      setAddToWishlistSuccess(`${songname} Song added to wishlist`);
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAddToWishlistError(`${songname} song is already in the wishlist`);
      } else {
        console.error('Error adding song to wishlist:', error);
        // Handle other types of errors
      }
    }
  };

  const handleLoginClick = () => {
    // Redirect to the login page
    history.push('/Login');
   // handleCloseMenu();
  };

 
  const [addToCartError, setAddToCartError] = useState('');
  const [addToCartSuccess, setAddToCartSuccess] = useState('');
    const addToCart = async (id, songname, songdescription, songlicence, songprice, songimage, songpreview, songoriginal) => {
      try {
        const response = await axios.post('/Add-To-Cart', { 
          id, 
          songname, 
          songdescription, 
          songlicence, 
          songprice, 
          songimage, 
          songpreview, 
          songoriginal 
        });
       // console.log('Song added to Cart:', response.data);
       setAddToCartSuccess(`${songname} Song added to Cart`);
     //  history.push('/Cart');
        
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setAddToCartError(`${songname} song is already in the Cart`);
        //  history.push('/Cart');
        } else {
          console.error('Error adding song to Cart:', error);
          // Handle other types of errors
        }
      }
    };


  useEffect(() => {
    const timer = setTimeout(() => {
      setAddToWishlistError('');
      setAddToWishlistSuccess('');
    }, 2000); 

    return () => clearTimeout(timer);
  }, [addToWishlistError, addToWishlistSuccess]);

  

  return (
    <>
    <div className='Home_Page_Tittle'>
      <title>Home | Music Explore</title>
      <div className='container_Home'>
        <div className='Error_Success_Msg'>
           <div className='Error_Msg_Call'>
              {addToWishlistError && <div className="error_message"><h1 className='Error_Msg'><span className='Error_Success'>{addToWishlistError}</span></h1></div>}
              {addToWishlistSuccess && <div className="error_message"><h1 className='Error_Msg'><span className='Error_Success'>{addToWishlistSuccess}</span></h1></div>}
           </div>
        </div>
        <div className='Home_Page_Songs'>
          {Homesongs.length > 0 && Homesongs.map((song, index) => (
<>
            <div key={index} className='Songs_Upload'  onClick={() => toggleAccordion(index)} >
               <div className='Songs_View' >
                   
                   {isLoggedIn ? ( <>
                    <div className='WhiseList_Song_List'> 
                       <button 
                            className='Icon_heart' 
                            title='Add To Whiselist' 
                            onClick={(e) => {e.stopPropagation();
                              const song = Homesongs[index]; // Get the selected song from Homesongs array
                              addToWishlist(
                                user.id, 
                                song.songname, 
                                song.songdescription, 
                                song.songlicence, 
                                song.songprice, 
                                song.songimage, 
                                song.songpreview, 
                                song.songoriginal
                              );
                            }}
                            >
                            <i id="WhiseList_Song" className="fa fa-heart-o"></i>
                           </button>
                          </div>
                   </>):(<>
                     <div className='WhiseList_Song_List'> 
                       <button className='Icon_heart' title='Add To Whiselist' onClick={(e) => {e.stopPropagation(); handleLoginClick();}} >
                           <i id="WhiseList_Song" className="fa fa-heart-o"></i>
                        </button>
                     </div>
                    </>)}
                   
                <div className='Songs_Image_View'>
                  <div className='Width_Img_View'>
                    {song.songimage ? (
                      <img className='IMG_Width' src={`songfilesupload/images/${song.songimage}`} title={song.songname} alt={song.songname} />
                    ) : (
                      <div className='Flex_Song_View' title={song.songname} >
                        <div className='Song_View_Name'>
                              <h1 className='N_Song'>{song.songname && song.songname.length > 10 ? `${song.songname.slice(0, 10)}...` : song.songname}</h1>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='Audio_Song_View'>
                      <div className='Audio_File'>
                        <audio
                          ref={(element) => handleAudioRef(element)}
                          id={`audio_${index}`}
                          className='Audio_File_Preview'
                          controls
                          controlsList='nodownload'
                        >
                          <source src={`songfilesupload/preview/${song.songpreview}`} />
                        </audio>
                        <button className='BTNs_Song_Play' onClick={(e) => { handlePlayButtonClick(index); e.stopPropagation(); }} title='song preview' >
                             <i className='fa fa-play' aria-hidden='true'></i>
                        </button>
                      </div>
                    </div>
                  <div className='Details_SongsHome'>
                     <div className='Details_Names_SongPage'>
                      <div className='Name_Song_View'>
                         <p className='Song_Name_DetailsView' title={song.songname} >{song.songname && song.songname.length > 9 ? `${song.songname.slice(0, 9)}...` : song.songname}</p>
                      </div>
                     <div className='Song_Price'>
                        <p className='Price_Song' title='Song Price' >
                          Price:&nbsp;<i id="Fa_Price_Tag" className='fa fa-rupee'></i>{song.songprice}
                        </p>
                     </div>
                     </div>
                     <div className='Add_Cart'>
                       <button className='Add_Cart_Btn' onClick={(e) => {e.stopPropagation();
                              const song = Homesongs[index]; // Get the selected song from Homesongs array
                              addToCart(
                                user.id, 
                                song.songname, 
                                song.songdescription, 
                                song.songlicence, 
                                song.songprice, 
                                song.songimage, 
                                song.songpreview, 
                                song.songoriginal
                              );
                            }} title='Add To Cart' 
                       ><i className='fa fa-shopping-cart'></i></button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='Accordions_Home'>
            {expandedIndexes.includes(index) && (
              <div className='Accordion_Content' >
                  <div className='According_Details'>
                     <div className='According_Song_View'>
                        <div className="Close_Button_Acc">
                            <button className='Btn_Close_Acc' onClick={() => toggleAccordion(index)} ><i id="Fa_Times_Acc" className='fa fa-times'></i></button>
                        </div>
                        <div className='Details_Song_Acc'>
                           <div className='Details_Name_Song_Acc'>
                               <div className='Details_Label_Song_Acc'>
                                    <h1 className='Song_Name_Label_Acc' title='Song Name' >{song.songname}</h1>
                                    <h3 className='song_Des_Label_Acc' title={song.songdescription} ><span className='Label_Song_Acc' title='Song Description' >Song Description: </span><span>{song.songdescription}</span></h3>
                                </div>
                                <div className='Song_Name_Paly'>
                                   <div className='Flex_Perview_Acc'>
                                      <span className='Label_Song_Acc' title='Song Perview' >Song Perview:</span>
                                   </div>
                                   <div className='Audio_Song_View_Acc'>
                                      <div className='Audio_File-Acc'>
                                        <audio
                                          ref={(element) => handleAudioRef(element)}
                                          id={`audio_${index}`}
                                          className='Audio_File_Preview'
                                          controls
                                          controlsList='nodownload'
                                        >
                                          <source src={`songfilesupload/preview/${song.songpreview}`} />
                                        </audio>
                                        <button className='BTNs_Song_Play_Acc' onClick={(e) => { handlePlayButtonClick(index); e.stopPropagation(); }} title='Song Perview' >
                                            <i id="Fa_Play_Acc" className='fa fa-play' aria-hidden='true'></i>
                                        </button>
                                      </div>
                                    </div>
                                 </div>
                                 <div className='Price_Song_Acc'>
                                     <h3 className='song_Des_Label_Acc' title={song.songprice} ><span className='Label_Song_Acc' title='Song price' >Song price: </span><i id="Fa_Rupee_Acc" className='fa fa-rupee'></i>{song.songprice}</h3>
                                  </div>

                                  <div className='ADD_Btn_Acc'>
                                      <div className='Btn_Label_Cart'>
                                      {isLoggedIn ? ( <>
                                                  <div className='WhiseList_Song_List_Acc'> 
                                                    <button 
                                                          className='Icon_heart_Label_Acc' 
                                                          title='Add To Whiselist' 
                                                          onClick={(e) => {e.stopPropagation();
                                                            const song = Homesongs[index]; // Get the selected song from Homesongs array
                                                            addToWishlist(
                                                              user.id, 
                                                              song.songname, 
                                                              song.songdescription, 
                                                              song.songlicence, 
                                                              song.songprice, 
                                                              song.songimage, 
                                                              song.songpreview, 
                                                              song.songoriginal
                                                            );
                                                          }}
                                                          >
                                                          <i id="WhiseList_Song" className="fa fa-heart-o"></i>
                                                          <span className='Add_To_List_Acc' >Add To Whiselist</span>
                                                        </button>
                                                        </div>
                                                </>):(<>
                                                  <div className='WhiseList_Song_List_Acc'> 
                                                    <button className='Icon_heart_Label_Acc' title='Add To Whiselist' onClick={(e) => {e.stopPropagation(); handleLoginClick();}} >
                                                        <i id="WhiseList_Song" className="fa fa-heart-o"></i>
                                                        <span className='Add_To_List_Acc' >Add To Whiselist</span>
                                                      </button>
                                                  </div>
                                                  </>)}
                                      </div>



                                   </div> 
                                 
                            </div>
                         </div>  
                     


                           {/* {song.songname},{user.id},{song.songid}  */}
                          
                    </div>
                  </div>
              </div>
            )}
          </div>
          </>
          ))}
        </div>
      </div>
    </div>
{currentSongIndex !== null && (
  <div className='Song_Player'>
    <div className='Song_Music_Player'>
      <p className='Song_Name_S'>{Homesongs[currentSongIndex].songname}</p>
      <audio
        key={`audio_${currentSongIndex}`}
        id={`audio_${currentSongIndex}`}
        className='Song_Audio_preview'
        controls
        controlsList='nodownload'
        autoPlay
      >
        <source src={`songfilesupload/preview/${Homesongs[currentSongIndex].songpreview}`} />
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
)}
{/* <div className="Close_Button" onClick={() => toggleAccordion(index)}>Close</div> */}
                {/* {song.songname} */}
    </>
  );
};

export default Home;
