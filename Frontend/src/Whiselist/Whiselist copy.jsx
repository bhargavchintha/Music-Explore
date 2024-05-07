import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Whiselist.css';

const wishlist = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [wishlistsongs, setwishlistSongs] = useState([]);
  const [Addwishlistsongs, setAddwishlistSongs] = useState([]);

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
    
    // const intervalId = setInterval(fetchomeSongs, 1500); 
  
    // return () => clearInterval(intervalId);
  
  }, [wishlistUpdated]);

  const [addDeleteToWishlistError, setDeleteAddToWishlistError] = useState('');
  const [addDeleteToWishlistSuccess, setDeleteToWishlistSuccess] = useState('');
  
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
    }, 1300); 

    return () => clearTimeout(timer);
  }, [addDeleteToWishlistError, addDeleteToWishlistSuccess]);

  return (
    <>
    <title>Wishlist Page | Music Explore </title>
      <div className='Whislist_Song_List'>
         <div className='Wishlist_Title_Songs'>
                <div className='Error_Success_Msg'>
                  <div className='Error_Msg_Call'>
                      {addDeleteToWishlistError && <div className="error_message"><h1 className='Error_Msg_Wishlist'><span className='Error_Success_Wishlist'>{addDeleteToWishlistError}</span></h1></div>}
                      {addDeleteToWishlistSuccess && <div className="error_message"><h1 className='Error_Msg_Wishlist'><span className='Error_Success_Wishlist'>{addDeleteToWishlistSuccess}</span></h1></div>}
                  </div>
                </div>
              <div className='Your_Whihlist_Names'>
                 {wishlistsongs.length > 0 ? (
                  wishlistsongs.map((wishlist,index) =>(
                    <>
                      <div className='border_Wishlist'>
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
                                              );
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
                                        <h1 className='wish_Song'>{wishlist.songname && wishlist.songname.length > 8 ? `${wishlist.songname.slice(0, 8)}...` : wishlist.songname}</h1>
                                      </div>
                                    </div>
                                  </div>
                                  </>
                                )}
                              </div>
                              <div className='Name_Contant_wish'>
                                <div className='Name-Container_Wish'>
                                  <h3 className='name_List' title={`Name: ${wishlist.songname}`} >{wishlist.songname && wishlist.songname.length > 10 ? `${wishlist.songname.slice(0, 10)}...` : wishlist.songname}</h3>
                                  <p className='Des_Wishlist' title={`Description: ${wishlist.songdescription} `} >{wishlist.songdescription && wishlist.songdescription.length > 17 ? `${wishlist.songdescription.slice(0, 17)}...` : wishlist.songdescription}</p>
                                  <p className='price_Wishlist' title={`Item price : ${wishlist.songprice}`} ><i id="Price_Wish_Rup" className='fa fa-rupee'></i>{wishlist.songprice}</p>
                                </div>
                                <div className='Add_Cart_Wish'>
                                  <div className='Add_Cart_Page_List'>
                                      {/* <button>Add Cart</button> */}
                                      
                                  </div>
                                </div>
                              </div>
                            </div>
                         </div>
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
                          <Link to='/Home'>Home</Link>
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

      

     </>
  );
};

export default wishlist;
