import React, { Component } from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';
// import {Link} from 'react-router-dom';
import Entertainment from "../assets/images/Entertainment.png";
import Sports from "../assets/images/Sports.png";
import Riddles from "../assets/images/Riddles.png";
import Technology from "../assets/images/Technology.png";
import Politics from "../assets/images/politics.png";




import './category.css'
const clientURL = require('../config/dev.js').clientURL;
// const serverURL = require('../config/dev.js').serverURL;

export default class Category extends Component {
  constructor() {
    super();
    this.state = {
      
      selectedCategory: '',
      selectedCategoryUrl: '',
      modalOpen: false,
      imageUrl:[
        { image:  Entertainment, name:'entertainment'},
        { image:  Politics, name:'politics'},
        { image:  Riddles, name:'riddles'},
        { image:  Sports, name:'sports'},
        { image:  Technology, name:'technology'}
      ]
    };
    this.letsPlayClick = this.letsPlayClick.bind(this);
  }

  categoryClick(key) {
    let imageUrl = this.state.imageUrl;
    this.setState({modalOpen:true, selectedCategory:imageUrl[key].name});
    
  }
  letsPlayClick(){
    localStorage.setItem("categoryName",this.state.selectedCategory);
    window.open(clientURL+"/qanda","_self");
  }

  render() {

    const { imageUrl, selectedCategory } = this.state;

    const greetings = ['Hey', 'Hi', 'Hello'];
    console.log("image 0: ", imageUrl[0].image);
    
    return(
      <div className="outerContainer">
        <h1 className="runBulb" >Category Selection</h1>
        <div className="categoryContainer">
          {
            imageUrl.map((item,i) => ( <div class="i1" onClick={this.categoryClick.bind(this, i)}>
                                        <img src={item.image} alt={item.name} className="characters" />
                                        <center>
                                          <span style={{color:'white',fontSize: '26px', letterSpacing:'2px'}}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
                                        </center>
                                        
                                      </div>))
          }
        </div>
        
        <Modal dimmer="inverted" open={this.state.modalOpen} onClose={() => {this.setState({modalOpen: false})}}>
          <Modal.Content image>
            <Modal.Description>
              <Header as='h1'>
        {greetings[Math.floor(Math.random() * greetings.length)]} {window.localStorage.name}, You have selected {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}!
              </Header>
              <div style={{fontSize: "16px"}}>
                <p> I have got some interesting questions to ask. </p>
                <p> It will be cool to ask you all those questions and get to know the answers from you. </p>
                <p> Would you like to play? </p>
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => {this.setState({modalOpen:false})}}>
              Nope
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Yep, let's play"
              onClick={this.letsPlayClick}
            />
          </Modal.Actions>
        </Modal>
      </div>

    );
  }
}
