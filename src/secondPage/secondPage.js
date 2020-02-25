import React, { Component } from 'react';

import './secondPage.css';

export default class SecondPage extends Component {
  render(){
    return(
      <div className="childPage">
        <h1 className="header1">Hover to know your</h1>
        <h2 className="header2"> Secret Child</h2>

        <div className="card">
          <div className="imgBox">
            <img src="http://www.giveasyoulive.com/blog/wp-content/uploads/2013/12/ss.jpg" />
          </div>

          <div className="details">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREbwXEQ1Ed3XTouCUiJCq212Tc37wm4YOXEIXRPDT1eFqpgAws" />
          </div>
        </div>
        
      </div>
    );
  }
}
