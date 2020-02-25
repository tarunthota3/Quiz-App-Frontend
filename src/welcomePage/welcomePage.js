import React, { Component } from 'react';
import SnowStorm from 'react-snowstorm';

import './welcomePage.css'

export default class WelcomePage extends Component {
  render(){
    return(
      <div className="homePage">
        {/* <SnowStorm /> */}

        {/* <div className="gameName">
            <img className="santa" alt="" src="http://pngimg.com/uploads/santa_claus/santa_claus_PNG38463.png" />
        </div> */}

        <div className="greetingText">
          <span>Welcome to Quiz App</span>
        </div>

        <div className="infoText">
          <span className="line1"> Scroll down to play </span>
        </div>

      </div>
    );
  }
}
