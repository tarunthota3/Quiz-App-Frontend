import React, { Component } from 'react';
import {Button, Modal, Image, Header, Grid, Form, Segment, Message} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './register.css';



export default class Register extends Component {
  constructor() {
    super();
    this.state =
    {
     
    };
    }
  render(){
    return(
      <div>
      <div className="registerBackground"></div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 500 }}>
    <Header as='h1' style={{letterSpacing:"2px",textDecoration:"underline", color:"white"}}>Create an account</Header>
      <Form size='large'>
        <Segment stacked>
        <Form.Input
            style={{marginTop:"2%"}}
            fluid 
            placeholder='First Name' />
            <Form.Input
            style={{marginTop:"2%"}}
            fluid 
            placeholder='Last Name' />
          <Form.Input
            style={{marginTop:"2%"}}
            fluid 
            placeholder='E-mail address' />

          <Form.Input
            style={{marginTop:"5%"}}
            fluid
            placeholder='Password'
            type='password'
          />
          <Button primary fluid size='large'>
            Register
          </Button>
          <Header as="h3">
          Already have an account? <Link to="/login">Sign In</Link>  
        </Header>
        </Segment>
      </Form>
      
    </Grid.Column>
  </Grid>
  </div>
    );
  }
}
