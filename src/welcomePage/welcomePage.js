import React, { Component } from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
// import SnowStorm from 'react-snowstorm';
import './welcomePage.css'
import userIcon from "../assets/images/user2.png";
import downwardIcon from "../assets/images/download.png";
import { clientURL } from '../config/dev';
const options = [
  { key: 'user', text: 'Account', icon: 'user', value:"user" },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out', value: "signout" },
]
const trigger = (
  <span>
    <Image avatar src={userIcon} />
  </span>
)



export default class WelcomePage extends Component {
  dropdownChange(e, val) {
    if(val.value === "signout"){
      localStorage.removeItem("name");
      window.open(clientURL,"_self");
      
    }
    
  }
  
  render(){
    options[0].text = window.localStorage.name;
    let data;
    console.log(window.localStorage.name);
    
    if(window.localStorage.name === undefined || window.localStorage.name.length === 0 || window.localStorage.name === null){
      window.open(clientURL,"_self");
    }
    else{
      data = (<div className="homePage">
      <Dropdown 
        style={{position:"absolute",right:"1%",top:"2%"}}
        trigger={trigger}
        options={options}
        pointing='top right'
        icon={null}
        onChange = {this.dropdownChange}
      />
      <Image
        style={{position:"absolute",bottom:"51%", left:"50%"}}
        src={downwardIcon}
        size="mini"/>
    </div>);
    }
    return(
      data
    );
  }
}
