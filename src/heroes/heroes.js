import React, { Component } from 'react';
import { Modal, Image, Header, Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

// import './heroes.css'

export default class Heroes extends Component {
  constructor() {
    super();
    this.state = {
      bulb: {
        off: 'https://www.w3schools.com/js/pic_bulboff.gif',
        on: 'https://www.w3schools.com/js/pic_bulbon.gif'
      },
      selectedHero: '',
      selectedHeroUrl: '',
      modalOpen: false
    };
  }

  stop(image, hero) {
    console.log('stopping');
    console.log('hero src = > ', hero.src);

    image.src = this.state.bulb.on;
    this.setState(() => {
      return {selectedHero: hero.alt, selectedHeroUrl: hero.src, modalOpen:true};
    },() =>{
      localStorage.setItem('heroUrl', hero.src);
    });
    console.log(this.state.selectedHero);
  }
  one(i) {
    let image = document.getElementById("myImage1");
    let hero = document.getElementById("hero1");
    image.src = this.state.bulb.on;
    setTimeout(() => {
      image.src = this.state.bulb.off;
      // eslint-disable-next-line
        if(i>10 && (parseFloat(Math.random() % 11).toFixed(1) == 0.7)) {
            this.stop(image, hero);
        } else {
          console.log('i - > ', i);
          i = i+1;
          this.two(i);
        }
    }, 200);
  }
  two(i) {
    let image = document.getElementById("myImage2");
    let hero = document.getElementById("hero2");
    image.src = this.state.bulb.on;
    setTimeout(() => {
      image.src = this.state.bulb.off;
      // eslint-disable-next-line
        if(i>10 && (parseFloat(Math.random() % 11).toFixed(1) == 0.7)) {
          this.stop(image, hero);
        } else {
          i = i+1;
          this.three(i);
        }
    }, 200);
  }
  three(i) {
    let image = document.getElementById("myImage3");
    let hero = document.getElementById("hero3");
    image.src = this.state.bulb.on;
    setTimeout(() => {
      image.src = this.state.bulb.off;
      // eslint-disable-next-line
        if(i>10 && (parseFloat(Math.random() % 11).toFixed(1) == 0.7)) {
          this.stop(image, hero);
        } else {
          i = i+1;
          this.four(i);
        }
    }, 200);
  }
  four(i) {
    let image = document.getElementById("myImage4");
    let hero = document.getElementById("hero4");
    image.src = this.state.bulb.on;
    setTimeout(() => {
      image.src = this.state.bulb.off;
      // eslint-disable-next-line
        if(i>10 && (parseFloat(Math.random() % 11).toFixed(1) == 0.7)) {
          this.stop(image, hero);
        } else {
          i = i+1;
          this.five(i);
        }
    }, 200);
  }
  five(i) {
    let image = document.getElementById("myImage5");
    let hero = document.getElementById("hero5");
    image.src = this.state.bulb.on;
    setTimeout(() => {
      image.src = this.state.bulb.off;
      // eslint-disable-next-line
        if(i>10 && (parseFloat(Math.random() % 11).toFixed(1) == 0.7)) {
          this.stop(image, hero);
        } else {
          i = i+1;
          this.six(i);
        }
    }, 200);
  }
  six(i) {
    let image = document.getElementById("myImage6");
    let hero = document.getElementById("hero6");
    image.src = this.state.bulb.on;
    setTimeout(() => {
      image.src = this.state.bulb.off;
      // eslint-disable-next-line
        if(i>10 && (parseFloat(Math.random() % 11).toFixed(1) == 0.7)) {
          this.stop(image, hero);
        } else {
          i = i+1;
          this.seven(i);
        }
    }, 200);
  }
  seven(i) {
    let image = document.getElementById("myImage7");
    let hero = document.getElementById("hero7");
    image.src = this.state.bulb.on;
    setTimeout(() => {
      image.src = this.state.bulb.off;
      // eslint-disable-next-line
        if(i>10 && (parseFloat(Math.random() % 11).toFixed(1) == 0.7)) {
          this.stop(image, hero);
        } else {
          i = i+1;
          this.eight(i);
        }
    }, 200);
  }
  eight(i) {
    let image = document.getElementById("myImage8");
    let hero = document.getElementById("hero8");
    image.src = this.state.bulb.on;
    setTimeout(() => {
      image.src = this.state.bulb.off;
      // eslint-disable-next-line
        if(i>10 && (parseFloat(Math.random() % 11).toFixed(1) == 0.7)) {
          this.stop(image, hero);
        } else {
          i = i+1;
          this.nine(i);
        }
    }, 200);
  }
  nine(i) {
    let image = document.getElementById("myImage9");
    let hero = document.getElementById("hero9");
    image.src = this.state.bulb.on;
    setTimeout(() => {
      image.src = this.state.bulb.off;
      // eslint-disable-next-line
        if(i>10 && (parseFloat(Math.random() % 11).toFixed(1) == 0.7)) {
          this.stop(image, hero);
        } else {
          i = i+1;
          this.ten(i);
        }
    }, 200);
  }
  ten(i) {
    let image = document.getElementById("myImage10");
    let hero = document.getElementById("hero10");
    image.src = this.state.bulb.on;
    setTimeout(() => {
      image.src = this.state.bulb.off;
      // eslint-disable-next-line
        if(i>10 && (parseFloat(Math.random() % 11).toFixed(1) == 0.7)) {
          this.stop(image, hero);
        } else {
          i = i+1;
          this.one(i);
        }
    }, 200);
  }

  render() {

    const imageUrl = [
      { image:'http://pngimg.com/uploads/ironman/ironman_PNG66.png',name:'IronMan'},
      { image:'http://www.pngall.com/wp-content/uploads/2016/04/Thor-Free-Download-PNG.png',name:'Thor'},
      { image:'https://pngimg.com/uploads/hulk/hulk_PNG87.png',name:'Hulk'},
      { image:'http://pluspng.com/img-png/bheem-is-back-yet-again-to-the-forum-vijaya-mall-this-time-with-his-friends-pyari-chutki-and-jaggu-bandar-chhota-bheem-is-an-indian-animated-1896.png',name:'Chota Bheem'},
      { image:'http://purepng.com/public/uploads/large/purepng.com-batmanbatmansuperherocomicdc-comicsbob-kanebat-manbruce-wayne-1701528524639kawni.png',name:'BatMan'},
      { image:'http://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG15.png',name:'Tom'},
      { image:'http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Sachin-Tendulkar-PNG-Transparent-Image-500x680.png',name:'Sachin Tendulkar'},
      { image:'https://www.freeiconspng.com/uploads/cristiano-ronaldo-football-picture-download-31.png',name:'Cristiano Ronaldo'},
      { image:'http://pngimg.com/uploads/spider_man/spider_man_PNG44.png',name:'Spider Man'},
      { image:'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/6/64/Doctor_Strange_Render.png/revision/latest?cb=20161130041146',name:'Dr. Strange'},
    ];

    const greetings = ['Hey', 'Hi', 'Hello'];

    return(
      <div className="outerContainer">
        <h1 className="runBulb" onClick={() => this.one(1)}>Click here to get your character</h1>
        <div className="heroesContainer">
          {
            imageUrl.map((item,i) => ( <div>
                                        <img id={`hero${i+1}`} src={item.image} alt={item.name} className="characters" />
                                        <center>
                                          <img id={`myImage${i+1}`} src={this.state.bulb.off} alt={"bulb"} className="bulb" />
                                        </center>
                                      </div>))
          }
        </div>
        <Modal dimmer="inverted" open={this.state.modalOpen} onClose={() => {this.setState({modalOpen: false})}}>
          <Modal.Content image>
            <Image wrapped size='medium' src={this.state.selectedHeroUrl} alt={this.state.selectedHero} style={{height:"400px"}} />
            <Modal.Description>
              <Header as='h1'>
                {greetings[Math.floor(Math.random() * greetings.length)]}, I am {this.state.selectedHero}!
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
