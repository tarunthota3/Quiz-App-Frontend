import React, { Component } from 'react';
import {
  Header,
  Button,
  Tab,
  Grid
} from 'semantic-ui-react';
import './adminHomePage.css';
import AllQuestions from '../allQuestions/allQuestions.js';
import NewQuestion from '../newQuestion/newQuestion.js';
import { clientURL } from '../config/dev';

const panes = [
  { menuItem: 'All Questions', render: () => <Tab.Pane className="tab1" attached={false}><AllQuestions/></Tab.Pane> },
  { menuItem: 'New Question', render: () => <Tab.Pane className="tab1" attached={false}><NewQuestion/></Tab.Pane> }
]

export default class AdminHomePage extends Component {
  logoutClick(){
    localStorage.removeItem("name");
      window.open(clientURL,"_self");
  }
  render(){
    let data;
    console.log(window.localStorage.name);
    
    if(window.localStorage.name === undefined || window.localStorage.name.length === 0 || window.localStorage.name === null){
      window.open(clientURL,"_self");
    }
    else{
      data = (<div >
        <Header as='h3' block style={{position:'fixed',width:'100%',zIndex:'1'}}>
          <span style={{float:'left',paddingTop:'1.5%'}}>
            Welcome Admin
          </span>
          <Button primary style={{float:'right', marginTop:'1%'}} onClick={this.logoutClick}>Logout</Button>
        </Header>
        <Grid style={{paddingTop:'8%'}}>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
              <Tab menu={{ pointing: true }} panes={panes} />
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>);
    }
    return(
      data
    );
  }
}
