import React, { Component } from 'react';
import { Modal, Image, Header, Button, Card, Segment, Grid, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Entertainment from "../assets/images/Entertainment.png";
import Sports from "../assets/images/Sports.png";
import Riddles from "../assets/images/Riddles.png";
import Technology from "../assets/images/Technology.png";
import Politics from "../assets/images/politics.png";



import './category.css'

export default class Category extends Component {
  constructor() {
    super();
    this.state = {
      
      selectedCategory: '',
      selectedCategoryUrl: '',
      modalOpen: false
    };
  }

  one(i) {
    let image = document.getElementById("myImage1");
    let hero = document.getElementById("hero1");
    setTimeout(() => {
      // eslint-disable-next-line
        if(i>10 && (parseFloat(Math.random() % 11).toFixed(1) == 0.7)) {
            this.stop(image, hero);
        } else {
          console.log('i - > ', i);
          i = i+1;
        }
    }, 200);
  }

  render() {

    const imageUrl = [
      { image:  Entertainment, name:'Entertainment'},
      { image:  Politics, name:'Politics'},
      { image:  Riddles, name:'Riddles'},
      { image:  Sports, name:'Sports'},
      { image:  Technology, name:'Technology'}
    ];

    const greetings = ['Hey', 'Hi', 'Hello'];
    console.log("image 0: ", imageUrl[0].image);
    
    return(
      <div className="outerContainer">
        <h1 className="runBulb" onClick={() => this.one(1)}>Category Selection</h1>
        <div className="categoryContainer">
          {
            imageUrl.map((item,i) => ( <div>
                                        <img src={item.image} alt={item.name} className="characters" />
                                        <center>
                                          <span style={{color:'white',fontSize: '26px', letterSpacing:'2px'}}>{item.name}</span>
                                        </center>
                                        
                                      </div>))
          }
        </div>
        
        <Modal dimmer="inverted" open={this.state.modalOpen} onClose={() => {this.setState({modalOpen: false})}}>
          <Modal.Content image>
            <Image wrapped size='medium' src={this.state.selectedCategoryUrl} alt={this.state.selectedCategory} style={{height:"400px"}} />
            <Modal.Description>
              <Header as='h1'>
                {greetings[Math.floor(Math.random() * greetings.length)]}, I am {this.state.selectedCategory}!
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
              as ={Link}
              to="/qanda"
            />
          </Modal.Actions>
        </Modal>
      </div>

    );
  }
}
