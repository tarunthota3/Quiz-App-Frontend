import React, { Component } from 'react';
import {Button, Modal, Image, Header, Grid, Form, Segment, Message} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './login.css';



export default class Login extends Component {
  constructor() {
    super();
    this.state =
    {
     
    };
    }
  render(){
    return(
      <div>
      <div className="loginBackground"></div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 500 }}>
    <Header as='h1' style={{letterSpacing:"2px",textDecoration:"underline", color:"white"}}>User Login</Header>
      <Form size='large'>
        <Segment stacked>
          
          <Form.Input
            style={{marginTop:"2%"}}
            fluid icon='user'
            iconPosition='left' 
            placeholder='E-mail address' />

          <Form.Input
            style={{marginTop:"5%"}}
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          <Header as="h5" textAlign = "right" style={{textDecoration: "underline"}}>Forgot Password</Header>

          <Button primary fluid size='large'>
            Login
          </Button>
        <Header as="h3">
          New to us? <Link to="/register">Sign Up</Link>  
        </Header>
        </Segment>
      </Form>
      
    </Grid.Column>
  </Grid>
  </div>
    );
  }
}
