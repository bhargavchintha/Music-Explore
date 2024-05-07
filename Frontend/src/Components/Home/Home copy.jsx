import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
 // const history = useHistory();

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

  const intervalId = setInterval(fetchNavbarData, 2500); 

  return () => clearInterval(intervalId);
}, []);


  const [Homesongs, setHomesongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);

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
    fetchHomeSongs();
    fetchHomeSongs();
    fetchHomeSongs();
    fetchHomeSongs();
    fetchHomeSongs();
    fetchHomeSongs();

  }, []);

  // Function to handle accordion toggle
  const toggleAccordion = (index) => {
    const updatedSongs = Homesongs.map((song, i) => ({
      ...song,
      expanded: i === index ? !song.expanded : false,
    }));
    setHomesongs(updatedSongs);
  };

  const handlePlayButtonClick = (index) => {
    setCurrentSongIndex(index);
  };

  const handleAudioRef = (element) => {
    setAudioPlayer(element);
  };


  const [addToWishlistError, setAddToWishlistError] = useState('');
const [addToWishlistSuccess, setAddToWishlistSuccess] = useState('');
  const addToWishlist = async (userid, songname, songdescription, songlicence, songprice, songimage, songpreview, songoriginal) => {
    try {
      const response = await axios.post('/add-to-wishlist', { 
        userid, 
        songname, 
        songdescription, 
        songlicence, 
        songprice, 
        songimage, 
        songpreview, 
        songoriginal 
      });
      console.log('Song added to wishlist:', response.data);
      setAddToWishlistSuccess('Song added to wishlist');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAddToWishlistError('Song is already in the wishlist');
      } else {
        console.error('Error adding song to wishlist:', error);
        // Handle other types of errors
      }
    }
  };

  return (
    <>
    <div className='Home_Page_Tittle'>
      <title>Home | Music Explore</title>
      <div className='container_Home'>
        <div className='Home_Page_Songs'>
        {addToWishlistError && <div className="error-message">{addToWishlistError}</div>}
        {addToWishlistSuccess && <div className="error-message">{addToWishlistSuccess}</div>}
          {Homesongs.length > 0 && Homesongs.map((song, index) => (
<>
            <div key={index} className='Songs_Upload'  onClick={() => toggleAccordion(index)} >
               <div className='Songs_View' >
                   
                   {isLoggedIn ? (<>
                    <div className='WhiseList_Song_List'> 
                       
                       <button 
                            className='Icon_heart' 
                            title='Add To Whiselist' 
                            onClick={(e) => {e.stopPropagation();
                              const song = Homesongs[index]; // Get the selected song from Homesongs array
                              addToWishlist(
                                user.userid, 
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
                       <button className='Icon_heart' title='Add To Whiselist' onClick={(e) => {e.stopPropagation()}} >
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
                          <h1 className='N_Song'>{song.songname}</h1>
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
                        <button className='BTNs_Song_Play' onClick={(e) => { handlePlayButtonClick(index); e.stopPropagation(); }}>
                             <i className='fa fa-play' aria-hidden='true'></i>
                        </button>
                      </div>
                    </div>
                  <div className='Details_SongsHome'>
                     <div className='Details_Names_SongPage'>
                      <div className='Name_Song_View'>
                         <p className='Song_Name_DetailsView' title={song.songname} >{song.songname}</p>
                      </div>
                     <div className='Song_Price'>
                        <p className='Price_Song'>
                          Price:&nbsp;<i id="Fa_Price_Tag" className='fa fa-rupee'></i>{song.songprice}
                        </p>
                     </div>
                     </div>
                     <div className='Add_Cart'>
                       <button className='Add_Cart_Btn' title='Add To Cart' ><i className='fa fa-shopping-cart'></i></button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='Accordions_Home'>
            {song.expanded && (
              <div className='Accordion_Content'>
                  <div className='According_Details'>
                     <div className='According_Song_View'>
hai
{/* <div className="Close_Button" onClick={() => toggleAccordion(index)}>Close</div> */}
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
