import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ap1 from './assets/ap1.JPG';
import ap2 from './assets/ap2.JPG';
import ap3 from './assets/ap3.JPG';
import './App.css';

import uglyAudio from './assets/ugly.mp3';
import averageAudio from './assets/mid.mp3';
import hotAudio from './assets/hot.mp3';


const uglySound = new Audio(uglyAudio);
const averageSound = new Audio(averageAudio);
const hotSound = new Audio(hotAudio);

function stopAllAudio() {
  uglySound.pause();
  averageSound.pause();
  hotSound.pause();

  uglySound.currentTime = 0;
  averageSound.currentTime = 0;
  hotSound.currentTime = 0;
}


export default function App({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);

     // Add glow effect
    const stars = document.querySelectorAll('.star-rating svg');
     if (stars[getCurrentIndex - 1]) {
      const star = stars[getCurrentIndex - 1];
      star.classList.add('glow');
      setTimeout(() => {
       star.classList.remove('glow');
      }, 1000);
    }

    // Play audio
    stopAllAudio(); // stop previous sound

    if (getCurrentIndex >= 1 && getCurrentIndex <= 3) {
      uglySound.play();
    } else if (getCurrentIndex >= 4 && getCurrentIndex <= 7) {
      averageSound.play();
    } else if (getCurrentIndex >= 8 && getCurrentIndex <= 10) {
      hotSound.play();
    }
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  let message = "";
if (rating >= 1 && rating <= 3) {
  message = `${rating}/10 , 7 crore!! 💥`;
} else if (rating >= 4 && rating <= 7) {
  message = `${rating}/10 , Average 😭😭🙏`;
} else if (rating >= 8 && rating <= 10) {
  message = `${rating}/10? 🧐🤨, Stop 👉👄🍆`;
}


  return (
    <div className="container">
      <h1>Rate My DRIP 🥶🥶</h1>

       {/* Show rating text */}
        {rating > 0 && (
         <h2 className="result-msg animate">{message}</h2>
        )}
     
      
      {/* Friend's Picture */}
       <div className="image-row">
        <img src={ap1} alt="image1" title="Phatak DADA 😍" className="friend-img" />
        <img src={ap2} alt="image2" title="Sexy boi 😘" className="friend-img" />
        <img src={ap3} alt="image3" title="Handsome 😋🥵💋👅" className="friend-img" />
       </div>


      {/* Star Rating Component */}
      <div className="star-rating">
        {[...Array(noOfStars)].map((_, index) => {
          index += 1;
          return (
            <FaStar
              key={index}
              className={index <= (hover || rating) ? "active" : "inactive"}
              onClick={() => handleClick(index)}
              onMouseMove={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              size={40}
            />
          );
        })}
      </div>

     
    </div>
  );
}
