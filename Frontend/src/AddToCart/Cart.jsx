import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Cart.css';

const Cart = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [Cartsongs, setCartSongs] = useState([]);
  const [Addwishlistsongs, setAddwishlistSongs] = useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);

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

    // const intervalId = setInterval(fetchNavbarData, 2500); 

    // return () => clearInterval(intervalId);
  }, []);

  const [CartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    const fetchcartSongs = async () => {
      try {
        const response = await axios.get('/Cart-songs');
        setCartSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
  
    fetchcartSongs();
    
    // const intervalId = setInterval(fetchomeSongs, 1500); 
  
    // return () => clearInterval(intervalId);
  
  }, [CartUpdated]);

  const [addDeleteToCartError, setDeleteAddToCartError] = useState('');
  const [addDeleteToCartSuccess, setDeleteToCartSuccess] = useState('');
  
  const songaddToCart = async (id, songname, songdescription, songimage, songpreview, songoriginal, songlicence, songprice) => {
    try {
      const response = await axios.post('/Delete-Cart-song', { 
        id, 
        songname, 
        songdescription, 
        songimage, 
        songpreview, 
        songoriginal, 
        songlicence, 
        songprice, 
      });
     // console.log('Song deleted from Cart:', response.data);
     setDeleteToCartSuccess(`${songname} Song deleted from Cart`);
      setCartUpdated(prevState => !prevState); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setDeleteToCartSuccess(`${songname} error to delete song in the Cart`);
      } else {
        console.error('Error deleting song from Cart:', error);
        // Handle other types of errors
      }
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeleteAddToCartError('');
      setDeleteToCartSuccess('');
    }, 1300); 

    return () => clearTimeout(timer);
  }, [addDeleteToCartError, addDeleteToCartSuccess]);


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
  // const handleClickcheckout = () => {
  //   // Redirect to the checkout page
  //   history.push('/Checkout');
  // };


  const addToCheckout = async () => {
    try {
     
      for (const Cart of Cartsongs) {
        await axios.post('/Add-To-Checkout', { 
          id: user.id,
          songname: Cart.songname,
          songdescription: Cart.songdescription,
          songlicence: Cart.songlicence,
          songprice: Cart.songprice,
          songimage: Cart.songimage,
          songpreview: Cart.songpreview,
          songoriginal: Cart.songoriginal 
        });
      }
      
      history.push('/Checkout');
    } catch (error) {
      console.error('Error adding songs to Checkout:', error);
    }
  };

  return (
    <>
    <title>Wishlist Page | Music Explore </title>
      <div className='Cart_Song_List'>
         <div className='Cart_Title_Songs'>
                <div className='Error_Success_Msg'>
                  <div className='Error_Msg_Call'>
                      {addDeleteToCartError && <div className="error_message"><h1 className='Error_Msg_Wishlist'><span className='Error_Success_Wishlist'>{addDeleteToCartError}</span></h1></div>}
                      {addDeleteToCartSuccess && <div className="error_message"><h1 className='Error_Msg_Wishlist'><span className='Error_Success_Wishlist'>{addDeleteToCartSuccess}</span></h1></div>}
                  </div>
                </div>
              <div className='Your_Cart_Names'>
                 {Cartsongs.length > 0 ? (
                  Cartsongs.map((Cart,index) =>(
                    <>
                      <div className='border_Cart'  onClick={() => toggleAccordion(index)} >
                         <div className='Img_Cart'>
                            <div className='Cart_Btn_List_Btns'>
                                  <button className='Icon_Remove_Cart_Btn' title='Remove From Cart' 
                                        onClick={(e) => {
                                            const Cart = Cartsongs[index]; // Get the selected song from Homesongs array
                                            songaddToCart(
                                                user.id, 
                                                Cart.songname, 
                                                Cart.songdescription,  
                                                Cart.songimage, 
                                                Cart.songpreview, 
                                                Cart.songoriginal,
                                                Cart.songlicence, 
                                                Cart.songprice,
                                              );  e.stopPropagation();
                                          }} >
                                        <i id="Fa_Remove_Cart_btn" className="fa fa-remove"></i>
                                     </button>
                                </div>
                            <div className='IMG_Cart_Flex_Len'>
                              <div className='Image_Container_List'>
                                {Cart.songimage  ? (
                                  <>
                                  <div className='Image_Content_Wish'>
                                      <img className='Img_Cart_width' src={`songfilesupload/images/${Cart.songimage}`} title={Cart.songname} />
                                  </div>
                                  </>
                                ):(
                                  <>
                                  <div className='Width_Max-Cart'>
                                    <div className='Flex_Song_Cart' title={Cart.songname} >
                                      <div className='Song_cart_Name'>
                                        <h1 className='Cart_Song'>{Cart.songname && Cart.songname.length > 9 ? `${Cart.songname.slice(0, 9)}` : Cart.songname}</h1>
                                      </div>
                                    </div>
                                  </div>
                                  </>
                                )}
                              </div>
                              <div className='Name_Contant_cart'>
                                <div className='Name-Container_Wish'>
                                  <h3 className='name_List_Cart' title={`Name: ${Cart.songname}`} >{Cart.songname && Cart.songname.length > 9 ? `${Cart.songname.slice(0, 9)}...` : Cart.songname}</h3>
                                  <p className='Des_cart' title={`Description: ${Cart.songdescription} `} >{Cart.songdescription && Cart.songdescription.length > 15 ? `${Cart.songdescription.slice(0, 15)}...` : Cart.songdescription}</p>
                                  <p className='price_cart' title={`Item price : ${Cart.songprice}`} ><i id="Price_Wish_Rup" className='fa fa-rupee'></i>{Cart.songprice}</p>
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
                                                {Cart.songname}
                                              </h1>
                                              <h3 className='song_Des_Label_Acc' title={Cart.songdescription}>
                                                <span className='Label_Song_Acc' title='Song Description'>
                                                  Song Description:
                                                </span>
                                                {Cart.songdescription}
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
                                                    <source src={`songfilesupload/preview/${Cart.songpreview}`} />
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
                                                </span> {Cart.songlicence}
                                                </h3>
                                                
                                              <h3 className='song_Des_Label_Acc' title={Cart.songprice}>
                                                <span className='Label_Song_Acc' title='Song price'>
                                                  Song price:
                                                </span>
                                                &nbsp;<i id='Fa_Rupee_Acc' className='fa fa-rupee'></i>
                                                 {Cart.songprice}
                                              </h3>
                                            </div>
                                            <div className='Note_msg'>
                                               <div className='Note_Msg_Cart'>
                                                <p className='Msg-Cart' ><span className='Span_Note' >Note:</span>Here, with this, you will get one file, and in that file, only songs will be there.</p>
                                               </div>
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
                          Add  some songs to your Cart!
                         </h2>
                         <p className='Click_Here'>
                          <Link className="Home_Click" to='/Home'><button  className='Name_Btn_Home'><i id="Cart_Wish_home" className="fa fa-home" aria-hidden="true"></i></button></Link>
                         </p>
                     </div>
                   </div>
                 </>)}  
                 {!isLoggedIn && (
                  <div className='Logout_Wishlist'>
                     <div className='Text_logOut'>
                      <h1 className='text_log_Session'>Login/signup to add item in Your <i id="Session_Log_Heart" className='fa fa-shopping-cart'></i> Cart </h1>
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
   {isLoggedIn &&(<>
   <div className='Total_Price_Cart'>
      <div className='Total_Cart'>
          <div className='Total_Shop_Cart'>
                 <h2 className='Price_Tag_Cart' >Total Price:  <i id="Rupee_Price_C" className='fa fa-rupee'></i> {Cartsongs.reduce((total, Cart) => total + parseFloat(Cart.songprice), 0)}</h2>
           </div>
           <div className='Check_Out'>
              <button className='Check_Out_btn' onClick={addToCheckout} >Check Out</button>
           </div>
      </div>
    </div>
   </>)}
      
      {currentSongIndex !== null && (
            <div className='Song_Player'>
              <div className='Song_Music_Player'>
                <p className='Song_Name_S'>{Cartsongs[currentSongIndex].songname}</p>
                <audio
                  key={`audio_${currentSongIndex}`}
                  id={`audio_${currentSongIndex}`}
                  className='Song_Audio_preview'
                  controls
                  controlsList='nodownload'
                  autoPlay
                >
                  <source src={`songfilesupload/preview/${Cartsongs[currentSongIndex].songpreview}`} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}
     </>
  );
};

export default Cart;
