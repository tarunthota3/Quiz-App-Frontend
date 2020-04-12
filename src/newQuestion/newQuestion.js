import React, { Component } from 'react';
import {
  Grid,
  Button,
  Header,
  Input,
  Dropdown,
  Radio,
  Loader,
  Dimmer
} from 'semantic-ui-react';
import request from 'superagent';
import './newQuestion.css';
import { ToastContainer } from "react-toastr";
import BulkUpload from "./bulkUpload/bulkUpload.js"
const serverURL = require('../config/dev.js').serverURL;
let container;


export default class NewQuestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      question:'',
      category:'',
      categoryOptions: [
        { key: 'Entertainment', value: 'Entertainment', text: 'Entertainment' },
        { key: 'Politics', value: 'Politics', text: 'Politics' },
        { key: 'Riddles', value: 'Riddles', text: 'Riddles' },
        { key: 'Sports', value: 'Sports', text: 'Sports' },
        { key: 'Technology', value: 'Technology', text: 'Technology' },
      ],
      op1: '',
      op2: '',
      op3: '',
      op4: '',
      correctans:'',
      correctansOptions:[
        {key:'Please fill the op1 value', text:'Please fill the op1 value', value:'Please fill the op1 value'},
        {key:'Please fill the op2 value', text:'Please fill the op2 value', value:'Please fill the op2 value'},
        {key:'Please fill the op3 value', text:'Please fill the op3 value', value:'Please fill the op3 value'},
        {key:'Please fill the op4 value', text:'Please fill the op4 value', value:'Please fill the op4 value'}
      ],
      radioButtonValue:'none',
      audio_url:'',
      image_url:'',
      bulkUploadModalOpen:false,
      dimmerActive:false
    };
    this.questionChange = this.questionChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.op1Change = this.op1Change.bind(this);
    this.op2Change = this.op2Change.bind(this);
    this.op3Change = this.op3Change.bind(this);
    this.op4Change = this.op4Change.bind(this);
    this.correctansChange = this.correctansChange.bind(this);
    this.submitChange = this.submitChange.bind(this);
    this.audioOrImageurlChange = this.audioOrImageurlChange.bind(this);
    this.handleBulkUploadModalOpen = this.handleBulkUploadModalOpen.bind(this);
    this.handleBulkUploadModalClose = this.handleBulkUploadModalClose.bind(this);
    this.uploadData = this.uploadData.bind(this);
  }
  questionChange(e){
    this.setState({question:e.target.value});
  }
  op1Change(e){
    this.setState({op1:e.target.value},()=>{
      let correctansOptions = this.state.correctansOptions;
      if(this.state.op1 === ''){
        correctansOptions[0].key = 'Please fill the op1 value';
        correctansOptions[0].text = 'Please fill the op1 value';
        correctansOptions[0].value = 'Please fill the op1 value';
      }
      else{
        correctansOptions[0].key = this.state.op1;
        correctansOptions[0].text = this.state.op1;
        correctansOptions[0].value = this.state.op1;
      }
      this.setState({correctansOptions:correctansOptions, correctans:''});
    });
  }
  op2Change(e){
    this.setState({op2:e.target.value},()=>{
      let correctansOptions = this.state.correctansOptions;
      if(this.state.op2 === ''){
        correctansOptions[1].key = 'Please fill the op2 value';
        correctansOptions[1].text = 'Please fill the op2 value';
        correctansOptions[1].value = 'Please fill the op2 value';
      }
      else{
        correctansOptions[1].key = this.state.op2;
        correctansOptions[1].text = this.state.op2;
        correctansOptions[1].value = this.state.op2;
      }
      this.setState({correctansOptions:correctansOptions, correctans:''});
    });
  }
  op3Change(e){
    this.setState({op3:e.target.value},()=>{
      let correctansOptions = this.state.correctansOptions;
      if(this.state.op3 === ''){
        correctansOptions[2].key = 'Please fill the op3 value';
        correctansOptions[2].text = 'Please fill the op3 value';
        correctansOptions[2].value = 'Please fill the op3 value';
      }
      else{
        correctansOptions[2].key = this.state.op3;
        correctansOptions[2].text = this.state.op3;
        correctansOptions[2].value = this.state.op3;
      }
      this.setState({correctansOptions:correctansOptions, correctans:''});
    });
  }
  op4Change(e){
    this.setState({op4:e.target.value},()=>{
      let correctansOptions = this.state.correctansOptions;
      if(this.state.op4 === ''){
        correctansOptions[3].key = 'Please fill the op4 value';
        correctansOptions[3].text = 'Please fill the op4 value';
        correctansOptions[3].value = 'Please fill the op4 value';
      }
      else{
        correctansOptions[3].key = this.state.op4;
        correctansOptions[3].text = this.state.op4;
        correctansOptions[3].value = this.state.op4;
      }
      this.setState({correctansOptions:correctansOptions, correctans:''});
    });
  }
  correctansChange(e,a){
    this.setState({correctans:a.value});
  }
  categoryChange(e,a){
    this.setState({category:a.value});
  }
  radioButtonChange(value){
    this.setState({radioButtonValue:value},()=>{
      if(this.state.radioButtonValue === 'none'){
        this.setState({audio_url:'',image_url:''});
      }
    });
  }
  audioOrImageurlChange(e){
    if(this.state.radioButtonValue === 'audio'){
      this.setState({audio_url:e.target.value,image_url:''});
    }
    else if(this.state.radioButtonValue === 'image'){
      this.setState({image_url:e.target.value,audio_url:''});
    }


  }
  checkIfArrayIsUnique(arr) {
      var map = {}, i, size;
      for (i = 0, size = arr.length; i < size; i++){
          if (map[arr[i]]){
              return false;
          }

          map[arr[i]] = true;
      }

      return true;
  }
  submitChange(){
    // console.log("unique condition check: ",this.checkIfArrayIsUnique.bind(this,[this.state.op1,this.state.op2,this.state.op3,this.state.op4])());
    let flag = this.checkIfArrayIsUnique.bind(this,[this.state.op1,this.state.op2,this.state.op3,this.state.op4])();
    if(flag === false){
      container.error(
        `Please enter different option`, `Options cannot be same`, {
          timeOut: 1500,
          extendedTimeOut: 10000,
          allowHtml: true,
          closeButton: true,
          })
    }
    else{
      this.setState({dimmerActive:true},()=>{
        let data = {
          question : this.state.question,
          category: this.state.category.toLowerCase(),
          image_url : this.state.image_url,
          audio_url : this.state.audio_url,
          op1 : this.state.op1,
          op2 : this.state.op2,
          op3 : this.state.op3,
          op4 : this.state.op4,
          ans : this.state.correctans
        };
        request.post(serverURL + "/qb/question")
          .send(data)
      	  .end((err, res) => {
            if(err) {
              console.error('Error in getting quest data -> ', err);
            }
            else{
              console.log("response: ",res);
              if(res.body === "Question insered successfully"){
                this.setState({dimmerActive:false},()=>{
                  container.success(
                    `Question inserted successfully`, ``, {
                      timeOut: 1500,
                      extendedTimeOut: 10000,
                      allowHtml: true,
                      closeButton: true,
                    });
                    setTimeout(function(){
                      window.location.reload();
                    },2000);
                })
              }
            }
          });
      })

    }

  }
  handleBulkUploadModalOpen(){
    this.setState({bulkUploadModalOpen:true});
  }
  handleBulkUploadModalClose(){
    this.setState({bulkUploadModalOpen:false});
  }
  uploadData(data, category){
    // let categorydata = {
    //   category:category
    // };
    this.setState({dimmerActive:true,bulkUploadModalOpen:false},()=>{
      let req = request.post(serverURL + "/qb/question/bulkUpload")
                        .field("categoryData", category.toLowerCase())
      data.forEach(file => {
        req.attach('csvFile', file);
      });
        req.end((err, res) => {
          if(err) {
            console.error('Error in getting quest data -> ', err);
          }
          else{
            if(res.body === "Questions insered successfully"){
              this.setState({dimmerActive:false},()=>{
                container.success(
                  `Question inserted successfully`, ``, {
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
          }
        });
    })

  }
  render(){
    return(
      <div>
        <Dimmer className='dimmer2' active={this.state.dimmerActive}>
          <Loader>Inserting</Loader>
        </Dimmer>
        <BulkUpload bulkUploadModalOpen={this.state.bulkUploadModalOpen}
                    handleBulkUploadModalClose={this.handleBulkUploadModalClose}
                    uploadData={this.uploadData}/>
        <ToastContainer className="customToastr toast-top-right"
          ref={ref => container = ref}
          />
        <Grid>
          <Grid.Row>
            <Grid.Column style={{textAlign:'center'}}>
              <Header as="h3" style={{textDecoration:'underline'}}>Please enter all the below details</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={2} style={{paddingTop:'0.7%',textAlign:'right',paddingRight:'2%'}}>
              <Header as="h4">Question</Header>
            </Grid.Column>
            <Grid.Column width={13}>
              <Input placeholder="Enter the Question" fluid value={this.state.question} onChange={this.questionChange}/>
            </Grid.Column>
            {/* <Grid.Column width={2}></Grid.Column> */}
          </Grid.Row>
          <Grid.Row>
          <Grid.Column width={2}/>
            <Grid.Column width={4}>
              <Header as="h5" style={{marginTop:"3%"}}>Please Select the Category</Header>
            </Grid.Column>
            <Grid.Column width={4}>
            <Dropdown
              placeholder='Select Category'
              fluid
              search
              selection
              value = {this.state.category}
              options = {this.state.categoryOptions}
              onChange = {this.categoryChange}
            />
            </Grid.Column>
            <Grid.Column width={6}/>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}/>
            <Grid.Column width={4}>
              <Header as="h5">Please Select the Option  (Optional)</Header>
            </Grid.Column>
            <Grid.Column width={2}>
              <Radio label='Audio'  checked={this.state.radioButtonValue === 'audio'} onChange={this.radioButtonChange.bind(this,'audio')}/>
            </Grid.Column>
            <Grid.Column width={2}>
              <Radio label='Image'  checked={this.state.radioButtonValue === 'image'} onChange={this.radioButtonChange.bind(this,'image')}/>
            </Grid.Column>
            <Grid.Column width={2}>
              <Radio label='None'  checked={this.state.radioButtonValue === 'none'} onChange={this.radioButtonChange.bind(this,'none')}/>
            </Grid.Column>
          </Grid.Row>
          {this.state.radioButtonValue.length !== 0 && this.state.radioButtonValue !== 'none'?
            <Grid.Row>
              <Grid.Column width={2}/>
              <Grid.Column width={3} style={{paddingTop:'0.7%'}}>
                <Header as="h5">Enter the {this.state.radioButtonValue} URL</Header>
              </Grid.Column>
              <Grid.Column width={10}>
                <Input fluid placeholder="Enter the URL" onChange={this.audioOrImageurlChange}/>
              </Grid.Column>
              <Grid.Column width={1}/>
            </Grid.Row>
            :
            ""
          }

          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={1} style={{paddingTop:'1%',textAlign:'right'}}>
              <Header as="h5">A.</Header>
            </Grid.Column>
            <Grid.Column width={5}>
              <Input fluid placeholder="Enter the value" value={this.state.op1} onChange={this.op1Change}/>
            </Grid.Column>
            <Grid.Column width={1} style={{paddingTop:'1%',textAlign:'right'}}>
              <Header as="h5">B.</Header>
            </Grid.Column>
            <Grid.Column width={5}>
              <Input fluid placeholder="Enter the value" value={this.state.op2} onChange={this.op2Change}/>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={1} style={{paddingTop:'1%',textAlign:'right'}}>
              <Header as="h5">C.</Header>
            </Grid.Column>
            <Grid.Column width={5}>
              <Input fluid placeholder="Enter the value" value={this.state.op3} onChange={this.op3Change}/>
            </Grid.Column>
            <Grid.Column width={1} style={{paddingTop:'1%',textAlign:'right'}}>
              <Header as="h5">D.</Header>
            </Grid.Column>
            <Grid.Column width={5}>
              <Input fluid placeholder="Enter the value" value={this.state.op4} onChange={this.op4Change}/>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={3} style={{paddingTop:'1%',textAlign:'right'}}>
              <Header as="h5">Correct Answer</Header>
            </Grid.Column>
            <Grid.Column width={7}>
              {/* <Input fluid placeholder="Select the Correct Answer" value={this.state.correctans} onChange={this.correctansChange}/> */}
              <Dropdown
                placeholder='Select the correct Answer'
                fluid
                search
                selection
                value = {this.state.correctans}
                options = {this.state.correctansOptions}
                onChange = {this.correctansChange}
              />
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={15} style={{textAlign:'right'}}>
              <Button.Group>
                <Button primary onClick={this.handleBulkUploadModalOpen}>Bulk Upload</Button>
                <Button.Or />
                <Button primary
                  disabled={ this.state.question.length === 0 || this.state.category.length === 0 || this.state.op1.length === 0 || this.state.op2.length === 0 ||
                             this.state.op3.length === 0 || this.state.op4.length === 0 || this.state.correctans.length === 0 }
                            onClick = {this.submitChange}>
                  Submit
                </Button>
              </Button.Group>

            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
