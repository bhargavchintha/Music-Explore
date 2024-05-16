import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './uploadfiles.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Uploadfiles = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

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

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('/buyedsongs');
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
    // const intervalSong = setInterval(fetchSongs, 1500);

    // return () => clearInterval(intervalSong);
  }, []);

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

  return (
    <>
      {isLoggedIn ? (
        <>
          <title>Upload Files | Music Explore</title>
          <div className='Upload_User_Files'>
            <div className='Upload_Container_files'>
              <div className='Upload_Title_Files'>
                <div className='Upload_Text_Files'>
                  <div className='SongFiles'>
                    <div className='SongFiles_Details'>
                      <div className='Songs_Details_Grid'>
                        {songs.length > 0 ? (
                          songs.map((song, index) => (
                            <>
                            <div className='Details_Songs_Files' key={index} onClick={() => toggleAccordion(index)}>
                              <div className='Name_Songs_Details'>
                                <div className='Name_Image_Details'>
                                  <div className='Image_Pic'>
                                    {song.songimage ? (
                                      <img
                                        className='Image_Song_details'
                                        src={`songfilesupload/images/${song.songimage}`}
                                        alt='Song Image'
                                      />
                                    ) : (
                                      <div className='No_image' title={song.songname}>
                                        <div className='Linear_G'>
                                          <div className='Middle_Name'>
                                            <h1 className='Name_Center' title={song.songname}>
                                              {song.songname && song.songname.length > 8 ? `${song.songname.slice(0, 8)}...` : song.songname}
                                            </h1>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className='Song_rem_Details'>
                                    <div className='Audio_Button'>
                                      <audio
                                        ref={(element) => handleAudioRef(element)}
                                        id={`audio_${index}`}
                                        className='Song_Audio_preview_Music'
                                        controls
                                        controlsList='nodownload'
                                        title='song perview'
                                      >
                                        <source src={`songfilesupload/preview/${song.songpreview}`} />
                                        Your browser does not support the audio element.
                                      </audio>
                                      <button className='BTN_Play' onClick={(e) =>{ handlePlayButtonClick(index); e.stopPropagation();}}  title='song perview'>
                                        <i className='fa fa-play' aria-hidden='true'></i>
                                      </button>
                                    </div>
                                    <div className='Song_Name_De'>
                                      <p className='Song_Name_S' title={song.songname}>
                                        {song.songname && song.songname.length > 9 ? `${song.songname.slice(0, 9)}...` : song.songname}
                                      </p>
                                      <p className='Song_Des' title={song.songdescription}>
                                        {song.songdescription && song.songdescription.length > 12 ? `${song.songdescription.slice(0, 12)}...` : song.songdescription}
                                      </p>
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
                                      {/* <div className='Img-According_Panal'>
                                        <div className='Panal_Acc_Img'>
                                        {song.songimage ? (
                                                <img
                                                  className='Image_Song_details'
                                                  src={`songfilesupload/images/${song.songimage}`}
                                                  alt='Song Image'
                                                />
                                              ) : (
                                                <div className='No_image' title={song.songname}>
                                                  <div className='Linear_G'>
                                                    <div className='Middle_Name'>
                                                      <h1 className='Name_Center' title={song.songname}>
                                                        {song.songname && song.songname.length > 8 ? `${song.songname.slice(0, 8)}...` : song.songname}
                                                      </h1>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                        </div>
                                      </div> */}
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
                                                {song.songname}
                                              </h1>
                                              <h3 className='song_Des_Label_Acc' title={song.songdescription}>
                                                <span className='Label_Song_Acc' title='Song Description'>
                                                  Song Description:
                                                </span>
                                                {song.songdescription}
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
                                                    <source src={`songfilesupload/preview/${song.songpreview}`} />
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
                                                  song file upload:  
                                                </span> {song.songoriginal}
                                                </h3>

                                              <h3 className='song_Des_Label_Acc  BTn_Ses_Label '>
                                                <span className='Label_Song_Acc'>
                                                   song Licence:  
                                                </span> {song.songlicence}
                                                </h3>
                                                
                                              <h3 className='song_Des_Label_Acc' title={song.songprice}>
                                                <span className='Label_Song_Acc' title='Song price'>
                                                  Song price:
                                                </span>
                                                &nbsp;<i id='Fa_Rupee_Acc' className='fa fa-rupee'></i>
                                                 {song.songprice}
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
                          ))
                        ) : (
                          <div className='Center_Songs'>
                            <div className='Center_Files'>
                              <p className='No_Files'>No Files Upload</p>
                              <button className='BTN_MusicUpload'>
                                <Link className="MusicIpload_BTN" to="/Musicupload">
                                  <i id="Fa_MusicUpload" className="fa fa-upload" aria-hidden="true"></i>Music Upload
                                </Link>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {currentSongIndex !== null && (
            <div className='Song_Player'>
              <div className='Song_Music_Player'>
                <p className='Song_Name_S'>{songs[currentSongIndex].songname}</p>
                <audio
                  key={`audio_${currentSongIndex}`}
                  id={`audio_${currentSongIndex}`}
                  className='Song_Audio_preview'
                  controls
                  controlsList='nodownload'
                  autoPlay
                >
                  <source src={`songfilesupload/preview/${songs[currentSongIndex].songpreview}`} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Uploadfiles;
