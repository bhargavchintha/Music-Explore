import React, { useEffect ,useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';


const Navbar = ( { searchQuery, setSearchQuery } ) => {
  const [isMenuOpen, setIsMenuOpen] = useState('');
  const history = useHistory();

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

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      // Redirect to the search page with the search query as a URL parameter
      history.push(`/search?songname=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleClick = () => {
    // Redirect to the login page
    history.push('/Login');
    handleCloseMenu();
  };
  const handlemusicupload = () => {
    history.push('/Musicupload');
    handleCloseMenu();
  }


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




const handleLogout = () => {
  axios.post('/logout')
    .then(response => {
      setIsLoggedIn(false);
      setUser(null);
      sessionStorage.removeItem('token');
      history.push('/Home'); // Redirect to the home page
    })
    .catch(error => console.error('Error logging out:', error));
};

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.Head_Profile')) {
       
      }
    };

    document.addEventListener('click', handleClickOutside);

  }, []);


  const truncateName = (name, maxLength) => {
    if (name.length <= maxLength) {
      return name;
    } else {
      const truncatedName = name.substring(0, maxLength);
      return truncatedName + '...';
    }
  };
  
  // Assuming user is an object containing user details
  const userName = user ? truncateName(user.userid, 15) : 'user';

  return (
    <>
<div children="Parent_Music">
   <div className='Head_Profile_User_M'>
     <div className='MUsic_Header_Explore'>
      <div className='Head_User_Music'>
          <div className='Head_User_Details'>
              <div className='User_Music'>
                  <div className='Tittle_Music_Ex'>
                    <h1 className='Music_tittle'>
                        <Link className="Music_Home" to="/Home">Music Explore</Link>
                     </h1>
                  </div>
                    <div className='Down_Home'>
                       <Link  className="Home_name" to="/Home" >
                        <i id="Fa_Home_B" className="fa fa-home" aria-hidden="true"></i> Home</Link>
                    </div>
                    <div className='Upload_Files_Music_Ex'>
                         {isLoggedIn ?  (
                       
                            <>
                            <div className='File_Upload'>
                                <button className='BTN_Upload' onClick={handlemusicupload} > <i id="Fa-Upload" className="fa fa-upload" aria-hidden="true"></i>  Music Upload </button>
                            </div>
                            </>
                            ):(

                            <div className='File_Upload'>
                                <button className='BTN_Upload' onClick={handleClick} > <i id="Fa-Upload" className="fa fa-upload" aria-hidden="true"></i>  Music Upload </button>
                            </div>

                          )}
                    </div>
                    <div className='Search_btn'>
                      <div className='Search_All'>
                          <Link to='/About' className='Btn_Search'> <i id="Info_Cricle" className="fa fa-info-circle" aria-hidden="true"></i> About</Link>
                      </div>
                    </div>
              </div>
          </div>
         
            <div className='Login_Music_Upload'>
                {isLoggedIn &&  (<>
                  <div className='Login_Upload_Files'>
                        <div className='Down_Upload'>
                            <Link className="Upload_Files" to="/uploadfiles">
                              <i id="Fa_Home_B" className="fa fa-music" aria-hidden="true">
                                </i> upload Files</Link>
                          </div>
                      </div>
                </>)}
          </div>
        </div> 


          <div className='Search_Music_Ex'>
            <div className='Music_Disable_Search-1'>
              <div className='Music_Search'>
                    <form action="" className="search-bar" onSubmit={handleSearch} >
                      <i id="Searchbar" className="fa fa-search" aria-hidden="true"></i>
                      <input id="Search_Box-texts" type="search" name="search" pattern=".*\S.*" required  autoComplete="off"   value={searchQuery} onChange={handleInputChange}  placeholder="Explore Songs" />
                  </form>
              </div>
            </div>
          </div>

          <div className='Login_BTN_Music'>
          {isLoggedIn ?  (
              <>
              <div className='Head_Card'>
                   <div className='Whiselist_Cart_List'>
                       <div className='Whiselist_Btn_Head'>
                          <Link className="Whiselist-Heart_List" to="/Whiselist" title="Whiselist" > <i id="Whiselist_Heart" className='fa fa-heart-o'></i> </Link>
                       </div>
                       <div className='Cart_Btn_Head'>

                       </div>
                   </div>
                   <div className='Cart_List'>
                      <div className='Cart_List_Page'>
                        <Link className="Cart_Details_List" to="/Cart" title="Cart"><i className='fa fa-shopping-cart'></i></Link>
                      </div>
                   </div>
                 <div className='Head_card_details'>
                     <div onClick={toggleVisibility} className='Head_Profile'>
                         <h1 className='User_Name_P'>
                           { user ? user.name : 'User'}
                          </h1> 
                     </div>
                     { isVisible && 
                        <div className='Profle_Image_Content'>
                            <div className='Profile_Img_Det'>
                                <div className='User_Name_Id'>
                                  <p className='User_Name_D' title={user? user.userid: 'user' } > Hi {user? user.userid: 'user' } </p>
                                </div>
                            </div>
                            <div className='Down_Home_Profile'>
                                <Link className="Home_name-profile"  to="/Profile">
                                  <i id="Fa_Home_profile" className="fa fa-user" aria-hidden="true">
                                    </i> Profile</Link>
                            </div>
                            <div className='Profile_Img_Det' >
                                <div className='Dark_mode'>
                                  <div className='Dark_Mode_Switch_Name'>
                                      <h3 className='Dark_Btn_color'> Change Mode : </h3>
                                  </div>
                                  <div className='Dark_Mode_Switch_S-m'>
                                      <button onClick={toggleDarkMode}  className="BUTNS Button_BTN  Byu" title="Change To Dark Mode"></button>
                                  </div>                                
                                </div>
                              </div>
                            <div className='Profile_Img_De' >
                                <div className='Logout_user'>
                                  <button className='Logout_Btn' onClick={handleLogout}> <i id="Fa_Sign_Out_Profile" className="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
                                </div>
                              </div>
                       </div>
                       }
                      
                 </div>
              </div>
              </>
            ) :(
           
              <div className='Sign_up-Login'>
                    <div className='Whiselist_Cart_List'>
                          <div className='Whiselist_Btn_Head'>
                              <Link className="Whiselist-Heart_List" to="/Whiselist" title="Whiselist" > <i id="Whiselist_Heart" className='fa fa-heart-o'></i> </Link>
                          </div>
                     </div>
                     <div className='Cart_Btn_Head'>
                             <div className='Cart_Btn_Head'>
                                <Link className="Cart_List_Shop" to="/Cart" title="Cart" > <i id="Cart_Shopping" className='fa fa-shopping-cart'></i> </Link>
                            </div>
                          </div>
                  <div className='Nav_Bar_sign'>
                      <Link className="Sign_Login   SignUp" to="/Signup">Sign up</Link>
                  </div>
                  <div className='Nav_Bar_Log'>
                       <Link className="Sign_Login  Login"  to="/Login">Login</Link>
                  </div>

                    <button onClick={toggleDarkMode} className="BUTNS Button_BTN" title="Change To Dark Mode"></button>
              </div>
            
            )}
          </div>

    </div>
  </div>
      <nav className='Music_Explore'>
        <div className='Music_Explore_logo-1'>
            <div className='Music_Explore_logo'>
              <div className='Music_Explore_title'>
                <h1 className='Music_tittle'>
                  <Link className="Music_Home" to="/Home">Music Explore</Link>
                </h1>
              </div>
            </div>
        </div>
         
         <div className='Music_Disable_Search-1'>
          <div className='Music_Search'>
                  <form action="" className="search-bar" onSubmit={handleSearch}>
                      <i id="Searchbar" className="fa fa-search" aria-hidden="true"></i>
                      <input  id="Search_Box-text" type="search" name="search" pattern=".*\S.*" required  autoComplete="off"   value={searchQuery} onChange={handleInputChange} placeholder="Explore Songs" />
                </form>
          </div>
         </div>
        

        <div className='Music_Explore_menu'>
          <div className='Music_Menu_links'>

            <label htmlFor="menuTrigger" className="nav_ico" onClick={toggleMenu}>
                <i id="Bars_Times" className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </label>
                  <input id="menuTrigger" type="checkbox"  className="nav_I" />
            <div className='Bars_Link_Music' style={{ display: isMenuOpen ? 'block' : 'none' }}>
                    <div className='Button_Dark_Mode'>
                        <button onClick={() => {toggleDarkMode(); handleCloseMenu(); }} id="Pos_Btn" className="BUTNS Button_BTN" title="Change To Dark Mode"></button>
                    </div>
                  <div className='Home_Search'>
                    {isLoggedIn ? ( 
                      <>
                        <div className='User_Name_Id'>
                              <p className='User_Name_D' title={user? user.userid: 'user' } > Hi {user? user.userid: 'user' } </p>
                        </div>
                      </> 
                      ):(
                      <></>
                      )}
                    <div className='Down_Home'>
                        <Link id="Home_Home-Close" className="Home_name_Link" to="/Home" onClick={handleCloseMenu} >
                          <i id="Fa_Home_B" className="fa fa-home" aria-hidden="true"></i> Home</Link>
                    </div>
                    <div className='In_Side_Search'>
                      <div className='Down_Home'>
                      <Link id="Home_Home-Close" className="Home_name_Link" to="/Search" onClick={handleCloseMenu} >
                          <i id="Fa_Home_B" className="fa fa-search" aria-hidden="true"></i> Search</Link>
                      </div>
                    </div>
                  
                    {isLoggedIn ?  (
                  
                    <div className='File_Upload'>
                      <button className='BTN_Upload_Max'onClick ={() =>{ handleCloseMenu(); handlemusicupload();  }} > <i id="Fa-Upload" className="fa fa-upload" aria-hidden="true"></i>  Music Upload </button>
                     
                    </div>
            
                    ) :(
                      <div className='File_Upload'>
                          <button className='BTN_Upload_Max'onClick={() => { handleClick(); handleCloseMenu(); }}>  <i id="Fa-Upload" className="fa fa-upload" aria-hidden="true"></i>  Music Upload </button>
                      </div>
                    )}
                    
                   
                    <div className='Search_btn'>
                      <div className='Search_All'>
                          <Link to='/About' onClick={handleCloseMenu} className='Home_name_Link'> <i id="Fa_Home_B" className="fa fa-info-circle" aria-hidden="true"></i> About</Link>
                      </div>
                    </div>
                 
                    {isLoggedIn ?  (
                        <>
                        
                        <div className='Down_Home_Profile-max_P'>
                            <Link className="Home_name-profile" onClick={handleCloseMenu} to="/Profile">
                              <i id="Fa_Home_profile" className="fa fa-user" aria-hidden="true">
                                </i> Profile</Link>
                         </div>
                         <div className='wish_List_Bl'>
                            <Link className="Wish_List_Click" onClick={handleCloseMenu} to="/Whiselist">
                              <i id="Hear_Wish-o" className='fa fa-heart-o'></i>
                               Wishlist
                            </Link>
                         </div>
                         <div className='Cart_List_Bl'>
                            <Link className="Cart_List_Click" onClick={handleCloseMenu} to="/Cart">
                              <i id="Shop_Cart_O" className='fa fa-shopping-cart'></i>
                               Cart
                            </Link>
                         </div>
                        <div className='Log-OuT_DE'>
                            <button className='Logout_Btn LO_BN'  onClick ={() =>{ handleLogout(); handleCloseMenu();  }} > <i id="Fa_Sign_Out_Profile" className="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
                        </div>
                        
                        </>

                    ):(
                       <>
                       <div className='Down_Home'>
                        <Link  className="Home_name_Link" to="/Signup" onClick={handleCloseMenu} >
                        <i id="Fa_Home_Sign" className="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign up</Link>
                       </div>
                    <div className='Down_Home'>
                        <Link  className="Home_name_Link" to="/Login" onClick={handleCloseMenu} >
                        <i id="Fa_Home_B" className="fa fa-user" aria-hidden="true"></i> Login</Link>
                    </div>
                       </>
                    )}

                  </div>
            </div>
          </div>
        </div>

      </nav>
    </div>
   
    {/* <img src='https://i.stack.imgur.com/jDGzD.png'/>
    <img src='https://i.stack.imgur.com/jDGzD.png'/>
    <img src='https://i.stack.imgur.com/jDGzD.png'/>
    <img src='https://i.stack.imgur.com/jDGzD.png'/>
    <img src='https://i.stack.imgur.com/jDGzD.png'/>

    <img src='https://i.stack.imgur.com/jDGzD.png'/>
    <img src='https://i.stack.imgur.com/jDGzD.png'/>
    <img src='https://i.stack.imgur.com/jDGzD.png'/>
    <img src='https://i.stack.imgur.com/jDGzD.png'/>
    <img src='https://i.stack.imgur.com/jDGzD.png'/>
    <img src='https://i.stack.imgur.com/jDGzD.png'/>
    <img src='https://i.stack.imgur.com/jDGzD.png'/>
    <img src='https://i.stack.imgur.com/jDGzD.png'/> */}

    </>
  );
};

export default Navbar;