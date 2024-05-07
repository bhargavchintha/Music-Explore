import React ,{useEffect} from 'react'
import './Spinner.css'

const Spiner = () => {

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
      
  return (
    <div>
        <div className='Spiner'>
            <div className='Load_Spiner'>
              <div className="center">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Spiner