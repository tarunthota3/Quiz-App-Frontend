import React, { Component } from 'react';
import {Button,  Header, Grid, Form, Dimmer, Loader} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './login.css';
import { ToastContainer } from "react-toastr";
import request from 'superagent';
const clientURL = require('../config/dev.js').clientURL;
const serverURL = require('../config/dev.js').serverURL;
let container;



export default class Login extends Component {
  constructor() {
    super();
    this.state =
    {
      email:"",
      password:""
    };
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.loginClick = this.loginClick.bind(this);
    }
    emailChange(e){
      this.setState({email:e.target.value});
    }
    passwordChange(e){
      this.setState({password:e.target.value});
    }
    loginClick(){
      let email = this.state.email;
      let password = this.state.password;
      if(email.length === 0 || password.length === 0){
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
            email:email,
            password:password
          };
          request.get(serverURL + "/ur/user")
            .query(data)
            .end((err, res) => {
              if(err) {
                console.error('Error in getting quest data -> ', err);
              }
              else{
                console.log("response: ",res);
                if(res.body !== "User details not found"){
                  
                  this.setState({dimmerActive:false},()=>{
                    container.success(
                      `User details found`, ``, {
                        timeOut: 1500,
                        extendedTimeOut: 10000,
                        allowHtml: true,
                        closeButton: true,
                      });
                      localStorage.setItem("name", res.body.fullName);
                      if(res.body.userType === "user"){
                        window.open(clientURL+"/homePage","_self");
                      }
                      else{
                        window.open(clientURL+"/adminHomePage","_self");
                      }
                      
                      setTimeout(function(){
                        window.location.reload();
                      },2000);
                  })
                }
                else{
                  this.setState({dimmerActive:false},()=>{
                    container.error(
                      `Invalid email or password`, ``, {
                        timeOut: 1500,
                        extendedTimeOut: 10000,
                        allowHtml: true,
                        closeButton: true,
                      });
                      // setTimeout(function(){
                      //   window.location.reload();
                      // },2000);
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
          <Loader>Logging</Loader>
        </Dimmer>
      <div className="loginBackground"></div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 500 }}>
    <Header as='h2' style={{letterSpacing:"2px", color:"teal"}}>Login</Header>
      <Form size='large'>
        {/* <Segment stacked> */}
          
          <Form.Input
            style={{marginTop:"2%"}}
            fluid icon='user'
            iconPosition='left' 
            placeholder='E-mail address'
            value={this.state.email}
            onChange={this.emailChange}
             />

          <Form.Input
            style={{marginTop:"5%"}}
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={this.state.password}
            onChange={this.passwordChange}
          />
          <Header as="h5" textAlign = "right">Forgot Password</Header>

          <Button color='teal' fluid size='large' onClick={this.loginClick}>
            Login
          </Button>
        <Header as="h4">
          New to us? <Link to="/register">Sign Up</Link>  
        </Header>
        {/* </Segment> */}
      </Form>
      
    </Grid.Column>
  </Grid>
  </div>
    );
  }
}
