import React, { Component } from 'react';
import {Button, Modal, Image, Header, Grid, Form, Segment, Dimmer, Loader} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './register.css';
import { ToastContainer } from "react-toastr";
import request from 'superagent';
const clientURL = require('../config/dev.js').clientURL;
const serverURL = require('../config/dev.js').serverURL;
let container;


export default class Register extends Component {
  constructor() {
    super();
    this.state =
    {
     firsName:'',
     lastName:'',
     email:'',
     password:'',
     dimmerActive:false
    };
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.registerClick = this.registerClick.bind(this);
    }
    firstNameChange(e){
      this.setState({firsName:e.target.value});
    }
    lastNameChange(e){
      this.setState({lastName:e.target.value});
    }
    emailChange(e){
      this.setState({email:e.target.value});
    }
    passwordChange(e){
      this.setState({password:e.target.value});
    }
    registerClick(){
      let firsName = this.state.firsName;
      let lastName = this.state.lastName;
      let email = this.state.email;
      let password = this.state.password;

      if(firsName.length == 0 || lastName.length == 0 || email.length == 0 || password.length == 0) {
        container.error(
          `Fields can't be empty`, ``, {
            timeOut: 1500,
            extendedTimeOut: 10000,
            allowHtml: true,
            closeButton: true,
          });
      }
      else{
        this.setState({dimmerActive:true},()=>{
          let data = {
            firstName:firsName,
            lastName:lastName,
            userType:"user",
            email:email,
            password:password
          };
          request.post(serverURL + "/ur/user")
            .send(data)
            .end((err, res) => {
              if(err) {
                console.error('Error in getting quest data -> ', err);
              }
              else{
                console.log("response: ",res);
                if(res.body === "User insered successfully"){
                  this.setState({dimmerActive:false},()=>{
                    container.success(
                      `User inserted successfully`, ``, {
                        timeOut: 1500,
                        extendedTimeOut: 10000,
                        allowHtml: true,
                        closeButton: true,
                      });
                      window.open(clientURL+"/","_self");
                  })

                }
                else{
                  this.setState({dimmerActive:false},()=>{
                    container.error(
                      res.text, ``, {
                        timeOut: 1500,
                        extendedTimeOut: 10000,
                        allowHtml: true,
                        closeButton: true,
                      });
                  })
                }
              }
            });
        })
      }
      
    }
  render(){
    return(
      <div>
        <ToastContainer className="customToastr toast-top-right"
          ref={ref => container = ref}
          />
          <Dimmer className='dimmer2' active={this.state.dimmerActive}>
          <Loader>Inserting</Loader>
        </Dimmer>
      <div className="registerBackground"></div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 500 }}>
    <Header as='h3' style={{letterSpacing:"2px",textDecoration:"underline", color:"white"}}>Create an account</Header>
      <Form size='large'>
        <Segment stacked>
        <Form.Input
            style={{marginTop:"2%"}}
            fluid 
            placeholder='First Name'
            value={this.state.firsName}
            onChange={this.firstNameChange} />
            <Form.Input
            style={{marginTop:"2%"}}
            fluid 
            placeholder='Last Name'
            value={this.state.lastName}
            onChange={this.lastNameChange} />
          <Form.Input
            style={{marginTop:"2%"}}
            fluid 
            placeholder='E-mail address'
            value={this.state.email}
            onChange={this.emailChange} />

          <Form.Input
            style={{marginTop:"5%"}}
            fluid
            placeholder='Password'
            type='password'
            value={this.state.password}
            onChange={this.passwordChange} />
          <Button primary fluid size='large' onClick={this.registerClick}>
            Register
          </Button>
          <Header as="h4">
          Already have an account? <Link to="/" style={{textDecoration:"underline"}}>Sign In</Link>  
        </Header>
        </Segment>
      </Form>
      
    </Grid.Column>
  </Grid>
  </div>
    );
  }
}
