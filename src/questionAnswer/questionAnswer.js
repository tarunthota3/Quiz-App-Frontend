import React, { Component } from 'react';
// import SnowStorm from 'react-snowstorm';
import {
  Button,
  Grid,
  Segment,
  Modal,
  Header,
  Image,
  Icon
} from 'semantic-ui-react';
// import sampleQuestions from "./sampleQuestions.json";
import request from 'superagent';

import './questionAnswer.css';

const clientURL = require('../config/dev.js').clientURL;
const serverURL = require('../config/dev.js').serverURL;
var timeInterval;
export default class QuestionAnswer extends Component {
  constructor(props)
   {
     super(props);
     this.state={
       allQuestions:[],
       totalScore:0,
       timer: 60
     }
     this.submitClick = this.submitClick.bind(this);
     this.cancelClick = this.cancelClick.bind(this);
     this.modalClose = this.modalClose.bind(this);
     this.finalSubmit = this.finalSubmit.bind(this);
     this.checkCorrectAnswers = this.checkCorrectAnswers.bind(this);
   }
   componentDidMount(){
     console.log("componentdidmount:::: ", localStorage.categoryName);
     
    timeInterval = setInterval(() => this.timer(),1000);
    request.get(serverURL + "/qb/quest")
    .query({ categoryName:localStorage.categoryName })
	.end((err, res) => {
		console.log("response",res);
		if(err) {
 	 		console.error('Error in getting quest data -> ', err);
		} else {
			let sampleQuestions = res.body;
     			sampleQuestions.map((item, i) => {
			       item["selectedAnswer"] = ['lightgrey','lightgrey','lightgrey','lightgrey'];
			       item["ansToCompareWith"] ='';
             return item;
		     });
			console.log("samplequestions!!!!!!!!11",sampleQuestions);
		     this.setState(() => {
		       return {allQuestions: sampleQuestions};
		     });
		}
	});

   }
   timer() {
     let { timer } = this.state;
     if (timer === 0) {
      this.submitClick();
      clearInterval(timeInterval);
     } else {
       this.setState(() => {
         return {timer: timer - 1};
       });
     }
   }
   finalSubmit() {
     window.open(clientURL+"/homePage","_self");
     window.close();
   }
   optionClick(questionId,value,item){
     console.log("selected",questionId,value,item);
     let temp = this.state.allQuestions;
     if(value === 'A'){
       if(temp[questionId].selectedAnswer[0] === 'green'){
         temp[questionId].selectedAnswer[0] = 'lightgrey';
         temp[questionId].ansToCompareWith='';
       }
       else{
         temp[questionId].selectedAnswer[0] = 'green';
         temp[questionId].selectedAnswer[1] = 'lightgrey';
         temp[questionId].selectedAnswer[2] = 'lightgrey';
         temp[questionId].selectedAnswer[3] = 'lightgrey';
         temp[questionId].ansToCompareWith='op1';
       }
     }
     else if(value === 'B'){
       if(temp[questionId].selectedAnswer[1] === 'green'){
         temp[questionId].selectedAnswer[1] = 'lightgrey';
         temp[questionId].ansToCompareWith='';
       }
       else{
         temp[questionId].selectedAnswer[1] = 'green';
         temp[questionId].selectedAnswer[0] = 'lightgrey';
         temp[questionId].selectedAnswer[2] = 'lightgrey';
         temp[questionId].selectedAnswer[3] = 'lightgrey';
         temp[questionId].ansToCompareWith='op2';
       }
     }
     else if(value === 'C'){
       if(temp[questionId].selectedAnswer[2] === 'green'){
         temp[questionId].selectedAnswer[2] = 'lightgrey';
         temp[questionId].ansToCompareWith='';
       }
       else{
         temp[questionId].selectedAnswer[2] = 'green';
         temp[questionId].selectedAnswer[0] = 'lightgrey';
         temp[questionId].selectedAnswer[1] = 'lightgrey';
         temp[questionId].selectedAnswer[3] = 'lightgrey';
         temp[questionId].ansToCompareWith='op3';
       }
     }
     else if(value === 'D'){
       if(temp[questionId].selectedAnswer[3] === 'green'){
         temp[questionId].selectedAnswer[3] = 'lightgrey';
         temp[questionId].ansToCompareWith='';
       }
       else{
         temp[questionId].selectedAnswer[3] = 'green';
         temp[questionId].selectedAnswer[0] = 'lightgrey';
         temp[questionId].selectedAnswer[1] = 'lightgrey';
         temp[questionId].selectedAnswer[2] = 'lightgrey';
         temp[questionId].ansToCompareWith='op4';
       }
     }
     this.setState({allQuestions:temp});
   }
   cancelClick(){
    window.open(clientURL+"/homePage","_self");
    window.close();
   }
   submitClick(){
     console.log("result",this.state.allQuestions);
     let score = 0;
     this.state.allQuestions.map((item,key)=>{
       if(item.ans === item[item.ansToCompareWith]){
         score++;
       }
       return item;
     })
     console.log("score",score);
     this.setState({modalOpen:true,totalScore:score});
   }
   modalClose(){
     this.setState({modalOpen:false},()=>{

     });
   }
   checkCorrectAnswers(){
     console.log("checkCorrectAnswers clicked");
     localStorage.setItem('questionSet', JSON.stringify(this.state.allQuestions));
     localStorage.setItem('score', this.state.totalScore);
     window.open(clientURL+"/correctAnswers");
   }
  render(){
    let smiley_face='';
    if(this.state.totalScore === 5){
      smiley_face = "data:image/jpeg;base64,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";
    }
    else if(this.state.totalScore<5 && this.state.totalScore>=3){
      smiley_face = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlOgsgD7DTX891EGD_CGaPEEbiZ-BnCoL29WVsHq532o289mldNw";
    }
    else{
      smiley_face = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/SMirC-medium.svg/1024px-SMirC-medium.svg.png";
    }

    console.log("localStorage",localStorage);
    return(
      <div className="customStyle1" style={{overflow:'hidden'}}>
        {/* <SnowStorm /> */}

        <Header as='h2' block style={{position:'fixed',width:'100%',zIndex:'1'}}>
    <Header as="h3" style={{paddingTop:"0.5%",float:'left'}}>{localStorage.name}</Header>
          <center>
            Quiz
          </center>
          <span style={{marginTop:"-2%", float: 'right', color:"red"}} >
            {this.state.timer}
          </span>
        </Header>
    {this.state.allQuestions.map((item,key)=>{
      console.log("item",item);
      let customMargin = '';
      if(key === 0){
        customMargin='7%';
      }
      else{
        customMargin='0%';
      }
      return(
        <Grid style={{marginTop:customMargin}}>
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={1}>
              <Segment raised style={{textAlign:'center'}}>
                {key+1}
              </Segment>
            </Grid.Column>
            <Grid.Column width ={10}>
              <Segment raised>
                {item.question}
              </Segment>
            </Grid.Column>
            <Grid.Column width={3} />
          </Grid.Row>
          {item.image_url.length !== 0?
            <Grid.Row>
              <Grid.Column width={4}/>
              <Grid.Column width={10}>
                <Image src={item.image_url} size='small' />
              </Grid.Column>
              <Grid.Column width={3}/>
            </Grid.Row>
            :
            ""
          }
          {item.audio_url.length !== 0?
            <Grid.Row>
              <Grid.Column width={4}/>
              <Grid.Column width={10}>
                <audio controls>
                  <source src={item.audio_url} type="audio/mpeg"/>
                  Your browser does not support the audio element.
                </audio>
              </Grid.Column>
              <Grid.Column width={3}/>
            </Grid.Row>
            :
            ""
          }

          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={10} >
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Segment raised className='options' onClick={this.optionClick.bind(this,key,'A',item)}>
                      <Grid>
                        <Grid.Column width={1} style={{backgroundColor:item.selectedAnswer[0]}}/>
                        <Grid.Column width={14}>
                            A. {item.op1}
                        </Grid.Column>
                      </Grid>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Segment raised className='options' onClick={this.optionClick.bind(this,key,'B',item)}>
                      <Grid>
                        <Grid.Column width={1} style={{backgroundColor:item.selectedAnswer[1]}}/>
                        <Grid.Column width={14}>
                            B. {item.op2}
                        </Grid.Column>
                      </Grid>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{marginTop:'-1%'}}>
                  <Grid.Column width={8}>
                    <Segment raised className='options' onClick={this.optionClick.bind(this,key,'C',item)}>
                      <Grid>
                        <Grid.Column width={1} style={{backgroundColor:item.selectedAnswer[2]}}/>
                        <Grid.Column width={14}>
                            C. {item.op3}
                        </Grid.Column>
                      </Grid>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Segment raised className='options' onClick={this.optionClick.bind(this,key,'D',item)}>
                      <Grid>
                        <Grid.Column width={1} style={{backgroundColor:item.selectedAnswer[3]}}/>
                        <Grid.Column width={14}>
                            D. {item.op4}
                        </Grid.Column>
                      </Grid>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={3} />
          </Grid.Row>
        </Grid>
      )
    })}
    <Grid style={{marginTop:'3%',paddingBottom:'1%'}}>
      <Grid.Row>
        <Grid.Column width={14} style={{textAlign:'right'}}>
          <Button color='red' onClick={this.cancelClick} style={{marginRight:'1%'}}> <Icon name='remove' />Cancel</Button>
          <Button color='green' onClick={this.submitClick}> <Icon name='checkmark' />Submit</Button>

        </Grid.Column>
        <Grid.Column width={2}/>
      </Grid.Row>
    </Grid>
    <Modal dimmer='blurring' open={this.state.modalOpen} size='tiny'>
    <Modal.Header icon='gift'>Quiz Results</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='tiny' src={smiley_face} />
      <Modal.Description style={{marginLeft: '5%',marginTop: '3%'}}>
        <Header>You got {this.state.totalScore} correct out of 5</Header>
        <p>
        Do you want to check your answers? <span onClick={this.checkCorrectAnswers} style={{textDecoration:'underline',cursor:'pointer'}}>Click Here</span>
        </p>
      </Modal.Description>
    </Modal.Content>
      {/* <Header as="h2" icon='gift' content='Congratulations !!!' />
      <Modal.Content style={{textAlign:'center'}}>
          <Header as="h3" style={{color:'white'}}>
            You got {this.state.totalScore} correct out of 5 &nbsp;&nbsp;<Image src={smiley_face} size='large' />
            <br/>
            Do you want to check your answers? <span onClick={this.checkCorrectAnswers} style={{textDecoration:'underline',cursor:'pointer'}}>Click Here</span>
        </Header>
      </Modal.Content> */}
      <Modal.Actions>
        <Button color='green' onClick={this.finalSubmit}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  </div>
    );
  }
}
