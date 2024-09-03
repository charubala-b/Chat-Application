import React, { useState } from 'react';
import './Messenger.css'; // Import the updated CSS file
import { Link, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';


const Messenger = () => {
  const location = useLocation();
  const { firstname, lastname } = location.state;
  const [isPopupActive, setPopupActive] = useState(false);

  return (
    <div className={`messengerContainer ${isPopupActive ? 'popup-active' : ''}`}>
      <div className="leftSide">
        <img src="./src/Components/final.png" alt="Final" className="finalImage" />
        <h1 className="chatName">Pingora</h1>
        <br />
        <p className='plus'>Direct Message <Link to={"/em"}> +</Link></p>
        
        <div className='name'>
          <p>Profile Owner : {firstname} {lastname}</p>
        </div>
      </div>
      <div className="verticalLine"></div> {/* Line to split sections */}
      <div className="rightSide">
        <div className="simple">
          <img src="./src/Components/chat.gif" alt="Chat GIF" className="logoGif" />
          <h3 className='hi'>Hi! Welcome to Pingora</h3>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
