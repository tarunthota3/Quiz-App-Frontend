import React, { Component } from 'react';
import SnowStorm from 'react-snowstorm';
import {
  Button,
  Grid,
  Segment,
  Header,
  Image
} from 'semantic-ui-react';
// import sampleQuestions from "../sampleQuestions1.json";

import './correctAnswer.css';

const clientURL = require('../../config/dev.js').clientURL;
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
     this.modalClose = this.modalClose.bind(this);
     this.finalSubmit = this.finalSubmit.bind(this);
     this.doneClick = this.doneClick.bind(this);
   }
   componentDidMount(){
     let sampleQuestions = JSON.parse(localStorage.questionSet);
     // console.log("sampleQuestions: ",sampleQuestions);
     sampleQuestions.map((item,key)=>{
       item.selectedAnswer = ["lightgrey","lightgrey","lightgrey","lightgrey"];
       return item;
     })
         sampleQuestions.map((item,key)=>{
           console.log("item: ",item);
           if(item.ans === item.op1){
             item.selectedAnswer[0] = "green";
           }
           else if(item.ans === item.op2){
             item.selectedAnswer[1] = "green";
           }
           else if(item.ans === item.op3){
             item.selectedAnswer[2] = "green";
           }
           else if(item.ans === item.op4){
             item.selectedAnswer[3] = "green";
           }


           if(item.ans !== item[item.ansToCompareWith]){
             console.log("true ",item.ans,"----",item[item.ansToCompareWith]);
             if(item.ansToCompareWith === "op1"){
               item.selectedAnswer[0] = "red";
             }
             else if(item.ansToCompareWith === "op2"){
               item.selectedAnswer[1] = "red";
             }
             else if(item.ansToCompareWith === "op3"){
               item.selectedAnswer[2] = "red";
             }
             else if(item.ansToCompareWith === "op4"){
               item.selectedAnswer[3] = "red";
             }
           }
           return item;
         })
         // console.log("sampleQuestions: ",sampleQuestions);
		     this.setState(() => {
		       return {allQuestions: sampleQuestions};
	       });

   }
   finalSubmit() {
     window.open(clientURL);
     window.close();
   }
   doneClick(){
     localStorage.setItem('heroUrl', '');
     localStorage.setItem('questionSet', '');
     localStorage.setItem('score', '');
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
  render(){
    console.log("localStorage",localStorage);
    return(
      <div className="customStyle1" style={{overflow:'hidden'}}>
        {/* <SnowStsorm /> */}
        <Header as='h2' block style={{position:'fixed',width:'100%',zIndex:'1'}}>
        <Header as="h3" style={{paddingTop:"0.5%",float:'left'}}>{localStorage.name}</Header>
          <Image size='large' src={localStorage.heroUrl} style={{float:'left'}}/>
          <center>
            Quanta
          </center>
        </Header>
        <Header as ="h3" style={{textAlign:'center',textDecoration:'underline',marginTop:'9%',color:'white'}}>
          Please find the correct answers
        </Header>
    {this.state.allQuestions.map((item,i)=>{
       // console.log("item",item);
      let customMargin = '';
      if(i === 0){
        customMargin='2%';
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
                {i+1}
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
                    <Segment raised >
                      <Grid>
                        <Grid.Column width={1} style={{backgroundColor:item.selectedAnswer[0]}}/>
                        <Grid.Column width={14}>
                            A. {item.op1}
                        </Grid.Column>
                      </Grid>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Segment raised >
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
                    <Segment raised >
                      <Grid>
                        <Grid.Column width={1} style={{backgroundColor:item.selectedAnswer[2]}}/>
                        <Grid.Column width={14}>
                            C. {item.op3}
                        </Grid.Column>
                      </Grid>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Segment raised >
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
          <Button color='green' onClick={this.doneClick}>Done</Button>

        </Grid.Column>
        <Grid.Column width={2}/>
      </Grid.Row>
    </Grid>
  </div>
    );
  }
}
