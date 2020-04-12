import React, { Component } from 'react';
import request from 'superagent';
import './allQuestions.css';
import {
  Accordion,
  Icon,
  Grid,
  Segment,
  Button,
  Dimmer,
  Loader,
  Image,
  Checkbox,
  Tab
} from 'semantic-ui-react';
import { ToastContainer } from "react-toastr";
import EditQuestion from "./editQuestion/editQuestion.js";
import DeleteQuestion from "./deleteQuestion/deleteQuestion.js";
const serverURL = require('../config/dev.js').serverURL;


let container;

export default class AllQuestions extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      questions:[],
      activeIndex: -1,
      dimmerActive:true,
      deleteDimmerActive:false,
      deleteModalOpen:false,
      refreshDimmerActive:false,
      updateDimmerActive:false,
      deleteQuestionData:{
        image_url:"",
        audio_url:""
      },
      editQuestionData:{
        question:"",
        category: "",
        key: 0,
        image_url:"",
        audio_url:"",
        op1:"",
        op2:"",
        op3:"",
        op4:""
      },
      correctAnswer:[],
      editModalOpen:false,
      filterSearchValue:'',
      paddingCheckBox:'0',
      visibilityCheckBox:'hidden',
      multipleIdstoDelete:[]
    }
    this.handleClick = this.handleClick.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.refreshClick = this.refreshClick.bind(this);
    this.op1Change = this.op1Change.bind(this);
    this.op2Change = this.op2Change.bind(this);
    this.op3Change = this.op3Change.bind(this);
    this.op4Change = this.op4Change.bind(this);
    this.editQuestionChange = this.editQuestionChange.bind(this);
    this.editQuestionDropDownChange = this.editQuestionDropDownChange.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.filterSearchIconClick = this.filterSearchIconClick.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.deleteMultipleQuestionToggle = this.deleteMultipleQuestionToggle.bind(this);
    this.deleteMultipleQuestionsClick = this.deleteMultipleQuestionsClick.bind(this);
  }
  editQuestionChange(e){
    console.log("edit question changed clicked");
    const data = Object.assign([], this.state.editQuestionData);
    data.question = e.target.value;
    this.setState({editQuestionData:data});
  }
  op1Change(e){
    console.log("Op1 value: ",e.target.value);
    // console.log("editQuestionData: ",this.state.editQuestionData);
    // console.log("questions: ",this.state.questions);

    const data = Object.assign([], this.state.editQuestionData);
    // console.log("data: ",data);
    data.op1 = e.target.value;
    data.ans="";
    const correctAnswer = Object.assign([], this.state.correctAnswer);
    if(e.target.value === ""){
      correctAnswer[0].key = "Please fill the op1 value";
      correctAnswer[0].text = "Please fill the op1 value";
      correctAnswer[0].value = "Please fill the op1 value";
    }
    else{
      correctAnswer[0].key = e.target.value;
      correctAnswer[0].text = e.target.value;
      correctAnswer[0].value = e.target.value;
    }
    this.setState({editQuestionData:data},()=>{
      // console.log("inside call back")
    })
  }
  op2Change(e){
    console.log("Op2 value: ",e.target.value);
    const data = Object.assign([], this.state.editQuestionData);
    // console.log("data: ",data);
    data.op2 = e.target.value;
    data.ans="";
    const correctAnswer = Object.assign([], this.state.correctAnswer);
    if(e.target.value === ""){
      correctAnswer[1].key = "Please fill the op2 value";
      correctAnswer[1].text = "Please fill the op2 value";
      correctAnswer[1].value = "Please fill the op2 value";
    }
    else{
      correctAnswer[1].key = e.target.value;
      correctAnswer[1].text = e.target.value;
      correctAnswer[1].value = e.target.value;
    }
    this.setState({editQuestionData:data},()=>{
      // console.log("inside call back")
    })
  }
  op3Change(e){
    console.log("Op3 value: ",e.target.value);
    const data = Object.assign([], this.state.editQuestionData);
    // console.log("data: ",data);
    data.op3 = e.target.value;
    data.ans="";
    const correctAnswer = Object.assign([], this.state.correctAnswer);
    if(e.target.value === ""){
      correctAnswer[2].key = "Please fill the op3 value";
      correctAnswer[2].text = "Please fill the op3 value";
      correctAnswer[2].value = "Please fill the op3 value";
    }
    else{
      correctAnswer[2].key = e.target.value;
      correctAnswer[2].text = e.target.value;
      correctAnswer[2].value = e.target.value;
    }
    this.setState({editQuestionData:data},()=>{
      // console.log("inside call back")
    })
  }
  op4Change(e){
    console.log("Op4 value: ",e.target.value);
    const data = Object.assign([], this.state.editQuestionData);
    // console.log("data: ",data);
    data.op4 = e.target.value;
    data.ans="";
    const correctAnswer = Object.assign([], this.state.correctAnswer);
    if(e.target.value === ""){
      correctAnswer[3].key = "Please fill the op4 value";
      correctAnswer[3].text = "Please fill the op4 value";
      correctAnswer[3].value = "Please fill the op4 value";
    }
    else{
      correctAnswer[3].key = e.target.value;
      correctAnswer[3].text = e.target.value;
      correctAnswer[3].value = e.target.value;
    }
    this.setState({editQuestionData:data},()=>{
      // console.log("inside call back")
    })
  }
  editQuestionDropDownChange(value){
    console.log("dropdown changed: ",value);
    const data = Object.assign([], this.state.editQuestionData);
    data.ans=value;
    this.setState({editQuestionData:data});
  }
  handleClick(e, titleProps) {
    console.log("handle clicked ",this.state);
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  componentDidMount() {
    request.get(serverURL + "/qb/allQuestions")
  	  .end((err, res) => {
        if(err) {
          console.error('Error in getting quest data -> ', err);
        }
        else{
          let questions = JSON.parse(res.body);
          // console.log("all questions: ", questions);
          this.setState({questions:questions,dimmerActive:false});
        }
      });
  }
  deleteClick(categoryName, data, key){
    console.log("delete modal clicked ",data);
    // data.backgroundColor1 = 'white';
    // data.color1 = 'black';
    // data.backgroundColor2 = 'white';
    // data.color2 = 'black';
    // data.backgroundColor3 = 'white';
    // data.color3 = 'black';
    // data.backgroundColor4 = 'white';
    // data.color4 = 'black';
    data.category = categoryName;
    data.key=key;

    if(data.op1 === data.ans) {
      console.log("1st");
      data.backgroundColor1 = 'green';
      data.color1 = 'white';
    }
    else if(data.op2 === data.ans) {
      console.log("2nd");
      data.backgroundColor2 = 'green';
      data.color2 = 'white';
    }
    else if(data.op3 === data.ans) {
      console.log("3rd");
      data.backgroundColor3 = 'green';
      data.color3 = 'white';
    }
    else{
      console.log("4th");
      data.backgroundColor4 = 'green';
      data.color4 = 'white';
    }
    this.setState({deleteModalOpen:true, deleteQuestionData:data});
  }
  closeDeleteModal(){
    this.setState({deleteModalOpen:false})
  }
  deleteQuestion(){
    console.log("delete: ",this.state.deleteQuestionData._id);
    let context = this;
    this.setState({deleteDimmerActive:true,deleteModalOpen:false},()=>{
      request.del(serverURL + "/qb/question")
                  .query({
                    category: this.state.deleteQuestionData.category.toLowerCase(),
                    key: this.state.deleteQuestionData.key
                  })
                 .end((err, res) => {
                   if(err) {
                     console.log("err: ",err);
                     alert("Error in deleting the question");
                   }
                   else{
                     context.setState({deleteDimmerActive:false},()=>{
                       console.log("state of deleteDimmerActive: ",this.state.deleteDimmerActive);
                       container.success(
                         `Question deleted successfully`, ``, {
                           timeOut: 2500,
                           extendedTimeOut: 10000,
                           allowHtml: true,
                           closeButton: true,
                         });
                         setTimeout(function(){
                           window.location.reload();
                         },3500);
                     });
                   }
                 });
    });

  }
  editQuestion(){
    console.log("edit question clicked");
    let context = this;
    this.setState({updateDimmerActive:true,editModalOpen:false},()=>{
      let data = {
        question:this.state.editQuestionData.question,
        category: this.state.editQuestionData.category.toLowerCase(),
        key: this.state.editQuestionData.key,
        op1:this.state.editQuestionData.op1,
        op2:this.state.editQuestionData.op2,
        op3:this.state.editQuestionData.op3,
        op4:this.state.editQuestionData.op4,
        ans:this.state.editQuestionData.ans
      }
      console.log("data: ",data);
      request.put(serverURL + "/qb/question")
        .send(data)
        .end((err, res) => {
          if(err) {
            alert('Error in updating quest data -> ', err);
          }
          else{
            context.setState({updateDimmerActive:false},()=>{
              container.success(
                `Question updated successfully`, ``, {
                  timeOut: 2500,
                  extendedTimeOut: 10000,
                  allowHtml: true,
                  closeButton: true,
                });
                setTimeout(function(){
                  window.location.reload();
                },3500);
            });
          }
        });
    });

  }
  closeEditModal(){
    let defaultEditData = {
      image_url:"",
      audio_url:"",
      question:"",
      op1:"",
      op2:"",
      op3:"",
      op4:"",
      ans:""
    }
    this.setState({editModalOpen:false,editQuestionData:defaultEditData});
  }
  editClick(categoryName, data, key){
    console.log("categoryName: ", categoryName);
    console.log("edit clicked: ",data);
    console.log("key: ", key);
    data.category = categoryName;
    data.key=key;

    let correctAnswer = [];
    correctAnswer.push({key:data.op1,text:data.op1,value:data.op1})
    correctAnswer.push({key:data.op2,text:data.op2,value:data.op2})
    correctAnswer.push({key:data.op3,text:data.op3,value:data.op3})
    correctAnswer.push({key:data.op4,text:data.op4,value:data.op4})
    this.setState({editModalOpen:true,editQuestionData:data,correctAnswer:correctAnswer});
  }
  refreshClick(){
    // console.log("refresh clicked: ",this.state.editQuestionData);
    let context = this;
    this.setState({refreshDimmerActive:true,editModalOpen:false},()=>{
      const data = Object.assign([], this.state.editQuestionData);
      var array = [data.op1,data.op2,data.op3,data.op4];
      console.log("before shuffling: ",array);
      array.sort(() => Math.random() - 0.5);
      console.log("after shuffling: ",array);
      data.op1 = array[0];
      data.op2 = array[1];
      data.op3 = array[2];
      data.op4 = array[3];
      let correctAnswer = [];
      correctAnswer.push({key:array[0],text:array[0],value:array[0]})
      correctAnswer.push({key:array[1],text:array[1],value:array[1]})
      correctAnswer.push({key:array[2],text:array[2],value:array[2]})
      correctAnswer.push({key:array[3],text:array[3],value:array[3]})
      setTimeout(function(){
          context.setState({refreshDimmerActive:false,editModalOpen:true,editQuestionData: data,correctAnswer:correctAnswer});
      },2500);

    })

  }
  filterSearch(e){
    console.log("value: ",e.target.value);
    let value = e.target.value;
    this.setState({filterSearchValue:e.target.value},()=>{
      if(value.length%3 === 0){
        console.log("inside if");
        request.get(serverURL + "/qb/particularQuest")
          .query({value:value})
          .end((err, res) => {
            if(err) {
              console.error('Error in getting quest data -> ', err);
            }
            else{
              let questions = JSON.parse(res.body);
              this.setState({questions:questions,dimmerActive:false});
            }
          });
      }
    })
  }
  filterSearchIconClick(){
    // console.log("value: ",this.state.filterSearchValue);
    request.get(serverURL + "/qb/particularQuest")
      .query({value:this.state.filterSearchValue})
      .end((err, res) => {
        if(err) {
          console.error('Error in getting quest data -> ', err);
        }
        else{
          let questions = JSON.parse(res.body);
          this.setState({questions:questions,dimmerActive:false});
        }
      });
  }
  deleteMultipleQuestionToggle(e,value){
    if(value.checked === true){
      this.setState({paddingCheckBox:'12px 19px',visibilityCheckBox:'visible'});
    }
    else{
      this.setState({paddingCheckBox:'0',visibilityCheckBox:'hidden',multipleIdstoDelete:[]});
    }
  }
  checkBoxChange(data,e,val){
    let multipleIdstoDelete = this.state.multipleIdstoDelete;
    console.log("before operation: ",multipleIdstoDelete);
    if(val.checked === true){
      multipleIdstoDelete.push(data._id);
    }
    else{
      if (multipleIdstoDelete.indexOf(data._id) !== -1){
        multipleIdstoDelete.splice(multipleIdstoDelete.indexOf(data._id), 1);
      }
    }
    this.setState({multipleIdstoDelete:multipleIdstoDelete});
  }
  deleteMultipleQuestionsClick(){
    this.setState({deleteDimmerActive:true,},()=>{
      request.del(serverURL + "/qb/questions")
                 .query({ids:JSON.stringify(this.state.multipleIdstoDelete)})
                 .end((err, res) => {
                   if(err) {
                     console.log("err: ",err);
                     alert("Error in deleting the question");
                   }
                   else{
                     this.setState({deleteDimmerActive:false},()=>{
                       container.success(
                         `Questions deleted successfully`, ``, {
                           timeOut: 2500,
                           extendedTimeOut: 10000,
                           allowHtml: true,
                           closeButton: true,
                         });
                         setTimeout(function(){
                           window.location.reload();
                         },3500);
                     });
                   }
                 });
    });
  }
  render(){
    // console.log("state -> ",this.state);
    const panes = []
    let allquestions = this.state.questions;
    // eslint-disable-next-line
    allquestions.map((item1, key1)=>{
      let tempObject = {
        menuItem: item1.name.charAt(0).toUpperCase() + item1.name.slice(1),
        render: () =>
          <Tab.Pane>
            <Accordion fluid styled style={{marginBottom:'1%'}}>
          {item1.data.length !== 0?
            item1.data.map((item,key)=>{
              // console.log("item: ",item);
              let backgroundColor1 = 'white';
              let color1 = 'black';
              let backgroundColor2 = 'white';
              let color2 = 'black';
              let backgroundColor3 = 'white';
              let color3 = 'black';
              let backgroundColor4 = 'white';
              let color4 = 'black';


              if(item.op1 === item.ans){
                backgroundColor1 = 'green';
                color1 = 'white';
              }
              else if(item.op2 === item.ans){
                backgroundColor2 = 'green'
                color2 = 'white';
              }
              else if(item.op3 === item.ans){
                backgroundColor3 = 'green'
                color3 = 'white';
              }
              else if(item.op4 === item.ans){
                backgroundColor4 = 'green'
                color4 = 'white';
              }
              return(
                <div key={key}>
                  <Checkbox checked ={this.state.multipleIdstoDelete.includes(item._id)} onChange={this.checkBoxChange.bind(this,item)} style={{float:'left',padding:this.state.paddingCheckBox,visibility:this.state.visibilityCheckBox}} />
                  <span>
                  <Accordion.Title active={this.state.activeIndex === key} index={key} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                      {item.question}
                  </Accordion.Title>
                  <Accordion.Content active={this.state.activeIndex === key}>
                    <Grid>

                      {item.image_url.length !== 0?
                        <Grid.Row>
                          <Grid.Column width={2}/>
                          <Grid.Column width={11}>
                            <Image src={item.image_url} size='small' />
                          </Grid.Column>
                          <Grid.Column width={3}/>
                        </Grid.Row>
                        :
                        ""
                      }
                      {item.audio_url.length !== 0?
                        <Grid.Row>
                          <Grid.Column width={2}/>
                          <Grid.Column width={11}>
                            <audio controls id={item.audio_url}>
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
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={6}>
                          <Segment raised style={{backgroundColor:backgroundColor1,color:color1}} size='large'>
                            A. {item.op1}
                          </Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                          <Segment raised style={{backgroundColor:backgroundColor2,color:color2}} size='large'>
                            B. {item.op2}
                          </Segment>
                        </Grid.Column>
                        <Grid.Column width={3}></Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={6}>
                          <Segment raised style={{backgroundColor:backgroundColor3,color:color3}} size='large'>
                            C. {item.op3}
                          </Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                          <Segment raised style={{backgroundColor:backgroundColor4,color:color4}} size='large'>
                            D. {item.op4}
                          </Segment>
                        </Grid.Column>
                        <Grid.Column width={3} style={{textAlign:'right',marginTop:'1.5%'}}>
                          <Button.Group >
                            <Button primary onClick = {this.editClick.bind(this,item1.name,item, key)}>Edit</Button>
                            <Button.Or />
                            <Button color='red' onClick = {this.deleteClick.bind(this,item1.name,item, key)}>Delete</Button>
                          </Button.Group>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Accordion.Content>
                  </span>
                </div>
              )
            })
            :
            <div style={{textAlign:'center',paddingTop:'1%',paddingBottom:'1%',fontWeight:'bold'}}>No Questions Found</div>
          }
        </Accordion>
          </Tab.Pane>
        

      }

     panes.push(tempObject); 
    })


    return(
      <div>
        <ToastContainer className="customToastr toast-top-right"
          ref={ref => container = ref}
          />
        <Dimmer className='dimmer1' active={this.state.dimmerActive}>
          <Loader>Loading</Loader>
        </Dimmer>
        <Dimmer style={{position:'fixed'}} active={this.state.deleteDimmerActive}>
          <Loader>Deleting</Loader>
        </Dimmer>
        <Dimmer style={{position:'fixed'}} active={this.state.refreshDimmerActive}>
          <Loader>Shuffling</Loader>
        </Dimmer>
        <Dimmer style={{position:'fixed'}} active={this.state.updateDimmerActive}>
          <Loader>Updating</Loader>
        </Dimmer>
        {/* <Grid>
          <Grid.Row>
            <Grid.Column width={9}/>
            <Grid.Column width={3} style={{textAlign:'right',paddingTop:'1%',paddingRight:'0%'}}>
              <Header as="h4">Filter By Question:</Header>
            </Grid.Column>
            <Grid.Column style={{marginBottom:'1%'}} width={4}>
              <Input fluid placeholder="Type here..." value={this.state.filterSearchValue} icon={<Icon name='search' onClick={this.filterSearchIconClick} inverted circular link />} onChange={this.filterSearch}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{textAlign:'right'}}>
              <Checkbox label='Delete Multiple Questions' toggle style={{paddingBottom:'1%'}} onChange={this.deleteMultipleQuestionToggle}/>
              {this.state.visibilityCheckBox === "visible"?
                <Button disabled={this.state.multipleIdstoDelete.length === 0} style={{margin:"0 0 1% 1%"}} negative onClick={this.deleteMultipleQuestionsClick}>Delete</Button>
              :
              ""
              }
            </Grid.Column>
          </Grid.Row>

        </Grid> */}
        <Tab menu={{ pointing: true }} panes={panes} />
        {/* <Accordion fluid styled style={{marginBottom:'1%'}}>
          {this.state.questions.length !== 0?
            this.state.questions.map((item,key)=>{
              // console.log("item: ",item);
              let backgroundColor1 = 'white';
              let color1 = 'black';
              let backgroundColor2 = 'white';
              let color2 = 'black';
              let backgroundColor3 = 'white';
              let color3 = 'black';
              let backgroundColor4 = 'white';
              let color4 = 'black';


              if(item.op1 === item.ans){
                backgroundColor1 = 'green';
                color1 = 'white';
              }
              else if(item.op2 === item.ans){
                backgroundColor2 = 'green'
                color2 = 'white';
              }
              else if(item.op3 === item.ans){
                backgroundColor3 = 'green'
                color3 = 'white';
              }
              else if(item.op4 === item.ans){
                backgroundColor4 = 'green'
                color4 = 'white';
              }
              return(
                <div key={key}>
                  <Checkbox checked ={this.state.multipleIdstoDelete.includes(item._id)} onChange={this.checkBoxChange.bind(this,item)} style={{float:'left',padding:this.state.paddingCheckBox,visibility:this.state.visibilityCheckBox}} />
                  <span>
                  <Accordion.Title active={this.state.activeIndex === key} index={key} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                      {item.question}
                  </Accordion.Title>
                  <Accordion.Content active={this.state.activeIndex === key}>
                    <Grid>

                      {item.image_url.length !== 0?
                        <Grid.Row>
                          <Grid.Column width={2}/>
                          <Grid.Column width={11}>
                            <Image src={item.image_url} size='small' />
                          </Grid.Column>
                          <Grid.Column width={3}/>
                        </Grid.Row>
                        :
                        ""
                      }
                      {item.audio_url.length !== 0?
                        <Grid.Row>
                          <Grid.Column width={2}/>
                          <Grid.Column width={11}>
                            <audio controls id={item.audio_url}>
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
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={6}>
                          <Segment raised style={{backgroundColor:backgroundColor1,color:color1}} size='large'>
                            A. {item.op1}
                          </Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                          <Segment raised style={{backgroundColor:backgroundColor2,color:color2}} size='large'>
                            B. {item.op2}
                          </Segment>
                        </Grid.Column>
                        <Grid.Column width={3}></Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={6}>
                          <Segment raised style={{backgroundColor:backgroundColor3,color:color3}} size='large'>
                            C. {item.op3}
                          </Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                          <Segment raised style={{backgroundColor:backgroundColor4,color:color4}} size='large'>
                            D. {item.op4}
                          </Segment>
                        </Grid.Column>
                        <Grid.Column width={3} style={{textAlign:'right',marginTop:'1.5%'}}>
                          <Button.Group >
                            <Button primary onClick = {this.editClick.bind(this,item)}>Edit</Button>
                            <Button.Or />
                            <Button color='red' onClick = {this.deleteClick.bind(this,item)}>Delete</Button>
                          </Button.Group>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Accordion.Content>
                  </span>
                </div>
              )
            })
            :
            <div style={{textAlign:'center',paddingTop:'1%',paddingBottom:'1%',fontWeight:'bold'}}>No Questions Found</div>
          }
        </Accordion> */}
        <DeleteQuestion deleteModalOpen={this.state.deleteModalOpen}
           closeDeleteModal={this.closeDeleteModal} deleteQuestionData={this.state.deleteQuestionData}
          deleteQuestion={this.deleteQuestion}  />

        <EditQuestion editModalOpen={this.state.editModalOpen} closeEditModal={this.closeEditModal}
           editQuestionData={this.state.editQuestionData} correctAnswer={this.state.correctAnswer}
           editQuestionChange = {this.editQuestionChange}
           op1Change={this.op1Change} op2Change={this.op2Change}
           op3Change={this.op3Change} op4Change={this.op4Change}
           editQuestionDropDownChange={this.editQuestionDropDownChange}
            refreshClick={this.refreshClick} editQuestion={this.editQuestion}/>

      </div>
    );
  }
}
