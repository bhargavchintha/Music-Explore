import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Whiselist.css';

const Wishlist = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [wishlistsongs, setwishlistSongs] = useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [addToCartError, setAddToCartError] = useState('');
  const [addToCartSuccess, setAddToCartSuccess] = useState('');
  const [addDeleteToWishlistError, setDeleteAddToWishlistError] = useState('');
  const [addDeleteToWishlistSuccess, setDeleteToWishlistSuccess] = useState('');
  
  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const response = await axios.get('/navbar');
        const { isLoggedIn, user } = response.data;
        setIsLoggedIn(isLoggedIn);
        setUser(user);
      } catch (error) {
        console.error('Error fetching navbar data:', error);
      }
    };

    fetchNavbarData();

  }, []);

  const [wishlistUpdated, setWishlistUpdated] = useState(false);

  useEffect(() => {
    const fetchomeSongs = async () => {
      try {
        const response = await axios.get('/wishlistsongs');
        setwishlistSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
  
    fetchomeSongs();
  
  }, [wishlistUpdated]);

  useEffect(() => {
    if (audioPlayer) {
      const handleEnded = () => {
        setCurrentSongIndex(null);
      };

      audioPlayer.addEventListener('ended', handleEnded);

      return () => {
        audioPlayer.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioPlayer]);

  const handlePlayButtonClick = (index) => {
    setCurrentSongIndex(index);
  };

  const handleAudioRef = (element) => {
    setAudioPlayer(element);
  };

  const toggleAccordion = (index) => {
    const updatedIndexes = expandedIndexes.includes(index)
      ? expandedIndexes.filter((idx) => idx !== index)
      : [...expandedIndexes, index];
    setExpandedIndexes(updatedIndexes);
  };
  
  const songaddToWishlist = async (id, songname, songdescription, songimage, songpreview, songoriginal, songlicence, songprice) => {
    try {
      const response = await axios.post('/deletewishlist', { 
        id, 
        songname, 
        songdescription, 
        songimage, 
        songpreview, 
        songoriginal, 
        songlicence, 
        songprice, 
      });
      console.log('Song deleted from wishlist:', response.data);
      setDeleteToWishlistSuccess(`${songname} Song deleted from wishlist`);
      setWishlistUpdated(prevState => !prevState); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setDeleteAddToWishlistError(`${songname} error to delete song in the wishlist`);
      } else {
        console.error('Error deleting song from wishlist:', error);
        // Handle other types of errors
      }
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeleteAddToWishlistError('');
      setDeleteToWishlistSuccess('');
      setAddToCartError('');
      setAddToCartSuccess('');
    }, 1300); 

    return () => clearTimeout(timer);
  }, [addDeleteToWishlistError, addDeleteToWishlistSuccess, addToCartError, addToCartSuccess]);

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
      //setAddToCartSuccess(`${songname} Song added to Cart`);
      history.push('/Cart');
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAddToCartError(`${songname} song is already in the Cart`);
      } else {
        console.error('Error adding song to Cart:', error);
        // Handle other types of errors
      }
    }
  };

  return (
    <>
    <title>Wishlist Page | Music Explore </title>
      <div className='Whislist_Song_List'>
         <div className='Wishlist_Title_Songs'>
                <div className='Error_Success_Msg'>
                  <div className='Error_Msg_Call'>
                      {addDeleteToWishlistError && <div className="error_message"><h1 className='Error_Msg_Wishlist'><span className='Error_Success_Wishlist'>{addDeleteToWishlistError}</span></h1></div>}
                      {addDeleteToWishlistSuccess && <div className="error_message"><h1 className='Error_Msg_Wishlist'><span className='Error_Success_Wishlist'>{addDeleteToWishlistSuccess}</span></h1></div>}
                      {addToCartError && <div className="error_message"><h1 className='Error_Msg_Wishlist'><span className='Error_Success_Wishlist'>{addToCartError}</span></h1></div>}
                      {addToCartSuccess && <div className="error_message"><h1 className='Error_Msg_Wishlist'><span className='Error_Success_Wishlist'>{addToCartSuccess}</span></h1></div>}
                  </div>
                </div>
              <div className='Your_Whihlist_Names'>
                 {wishlistsongs.length > 0 ? (
                  wishlistsongs.map((wishlist,index) =>(
                    <>
                      <div className='border_Wishlist'  onClick={() => toggleAccordion(index)} >
                         <div className='Img_Wishlist'>
                            <div className='Wish_Btn_List_Btns'>
                                  <button className='Icon_Remove_Wish_Btn' title='Remove From Whiselist' 
                                        onClick={(e) => {
                                            const wishlist = wishlistsongs[index]; // Get the selected song from Homesongs array
                                              songaddToWishlist(
                                                user.id, 
                                                wishlist.songname, 
                                                wishlist.songdescription,  
                                                wishlist.songimage, 
                                                wishlist.songpreview, 
                                                wishlist.songoriginal,
                                                wishlist.songlicence, 
                                                wishlist.songprice,
                                              );  e.stopPropagation();
                                          }} >
                                        <i id="Fa_Remove_wish_btn" class="fa fa-remove"></i>
                                     </button>
                                </div>
                            <div className='IMG_List_Flex_Len'>
                              <div className='Image_Container_List'>
                                {wishlist.songimage  ? (
                                  <>
                                  <div className='Image_Content_Wish'>
                                      <img className='Img_Wishlist_width' src={`songfilesupload/images/${wishlist.songimage}`} title={wishlist.songname} />
                                  </div>
                                  </>
                                ):(
                                  <>
                                  <div className='Width_Max-Wish'>
                                    <div className='Flex_Song_wishlist' title={wishlist.songname} >
                                      <div className='Song_wish_Name'>
                                        <h1 className='wish_Song'>{wishlist.songname && wishlist.songname.length > 9 ? `${wishlist.songname.slice(0, 9)}` : wishlist.songname}</h1>
                                      </div>
                                    </div>
                                  </div>
                                  </>
                                )}
                              </div>
                              <div className='Name_Contant_wish'>
                                <div className='Name-Container_Wish'>
                                  <h3 className='name_List' title={`Name: ${wishlist.songname}`} >{wishlist.songname && wishlist.songname.length > 9 ? `${wishlist.songname.slice(0, 9)}...` : wishlist.songname}</h3>
                                  <p className='Des_Wishlist' title={`Description: ${wishlist.songdescription} `} >{wishlist.songdescription && wishlist.songdescription.length > 15 ? `${wishlist.songdescription.slice(0, 15)}...` : wishlist.songdescription}</p>
                                  <p className='price_Wishlist' title={`Item price : ${wishlist.songprice}`} ><i id="Price_Wish_Rup" className='fa fa-rupee'></i>{wishlist.songprice}</p>
                                </div>
                                <div className='Add_Cart_Wish'>
                                  <div className='Add_Cart_Page_List'>
                                        <div className='Add_Cart_Pro_Btn'>
                                          <button className='Add_Cart_Btn_Prog' onClick={(e) => {e.stopPropagation();
                                                const wishlist = wishlistsongs[index]; // Get the selected song from Homesongs array
                                                addToCart(
                                                  user.id, 
                                                  wishlist.songname, 
                                                  wishlist.songdescription, 
                                                  wishlist.songlicence, 
                                                  wishlist.songprice, 
                                                  wishlist.songimage, 
                                                  wishlist.songpreview, 
                                                  wishlist.songoriginal
                                                );
                                              }} title='Add To Cart' 
                                            ><i id="Cart-Fa_Shop" className='fa fa-shopping-cart'></i>Add To Cart</button>
                                        </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                         </div>
                      </div>

                      <div className='Accordions_Home'>
                                {expandedIndexes.includes(index) && (
                                  <>
                                  <div className='Accordion_Content'>
                                    <div className='According_Details'>
                                      <div className='According_Song_View'>
                                        <div className='Close_Button_Acc'>
                                          <button className='Btn_Close_Acc' onClick={() => toggleAccordion(index)}>
                                            <i id='Fa_Times_Acc' className='fa fa-times'></i>
                                          </button>
                                        </div>
                                        <div className='Details_Song_Acc'>
                                          <div className='Details_Name_Song_Acc'>
                                            <div className='Details_Label_Song_Acc'>
                                              <h1 className='Song_Name_Label_Acc' title='Song Name'>
                                                {wishlist.songname}
                                              </h1>
                                              <h3 className='song_Des_Label_Acc' title={wishlist.songdescription}>
                                                <span className='Label_Song_Acc' title='Song Description'>
                                                  Song Description:
                                                </span>
                                                {wishlist.songdescription}
                                              </h3>
                                            </div>
                                            <div className='Song_Name_Paly'>
                                              <div className='Flex_Perview_Acc'>
                                                <span className='Label_Song_Acc' title='Song Perview'>
                                                  Song Perview:
                                                </span>
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
                                                    <source src={`songfilesupload/preview/${wishlist.songpreview}`} />
                                                  </audio>
                                                  <button className='BTNs_Song_Play_Acc' onClick={(e) => { handlePlayButtonClick(index); e.stopPropagation(); }} title='Song Perview'>
                                                    <i id='Fa_Play_Acc' className='fa fa-play' aria-hidden='true'></i>
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                            <div className='Price_Song_Acc'>

                                              <h3 className='song_Des_Label_Acc  BTn_Ses_Label '>
                                                <span className='Label_Song_Acc'>
                                                   song Licence:  
                                                </span> {wishlist.songlicence}
                                                </h3>
                                                
                                              <h3 className='song_Des_Label_Acc' title={wishlist.songprice}>
                                                <span className='Label_Song_Acc' title='Song price'>
                                                  Song price:
                                                </span>
                                                &nbsp;<i id='Fa_Rupee_Acc' className='fa fa-rupee'></i>
                                                 {wishlist.songprice}
                                              </h3>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  </>
                                )}
                              </div>

                    </>
                  ) )
                 ):(
                  <>
                 {isLoggedIn && (<>
                   <div className='No_Data_wish'>
                     <div className='Not_found'>
                         <h2 className='Search_Data'>
                          Add  some songs to your Wishlist!
                         </h2>
                         <p className='Click_Here'>
                          <Link className="Home_Click" to='/Home'>Home</Link>
                         </p>
                     </div>
                   </div>
                 </>)}  
                 {!isLoggedIn && (
                  <div className='Logout_Wishlist'>
                     <div className='Text_logOut'>
                      <h1 className='text_log_Session'>Login/signup to add item in Your <i id="Session_Log_Heart" className='fa fa-heart-o'></i> Wishlist </h1>
                       <Link className="Login_Session_Wish" to= '/Login'><button className='Btn_session_Log' >Login</button></Link>
                       <Link className="Login_Session_Wish" to= '/Signup'><button className='Btn_session_Sig' >Signup</button></Link>
                     </div>
                  </div>
                 )}
                  </>
                 )
                 
                }
              </div>
          </div>
      </div>

      
      {currentSongIndex !== null && (
            <div className='Song_Player'>
              <div className='Song_Music_Player'>
                <p className='Song_Name_S'>{wishlistsongs[currentSongIndex].songname}</p>
                <audio
                  key={`audio_${currentSongIndex}`}
                  id={`audio_${currentSongIndex}`}
                  className='Song_Audio_preview'
                  controls
                  controlsList='nodownload'
                  autoPlay
                >
                  <source src={`songfilesupload/preview/${wishlistsongs[currentSongIndex].songpreview}`} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}
     </>
  );
};

export default Wishlist;
