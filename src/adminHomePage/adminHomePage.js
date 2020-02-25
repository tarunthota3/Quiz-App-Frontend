import React, { Component } from 'react';
import {
  Header,
  Button,
  Tab,
  Grid
} from 'semantic-ui-react';
import './adminHomePage.css';
import AllQuestions from '../allQuestions/allQuestions.js';
import NewQuestion from '../newQuestion/newQuestion.js'

const panes = [
  { menuItem: 'All Questions', render: () => <Tab.Pane className="tab1" attached={false}><AllQuestions/></Tab.Pane> },
  { menuItem: 'New Question', render: () => <Tab.Pane className="tab1" attached={false}><NewQuestion/></Tab.Pane> }
]

export default class AdminHomePage extends Component {
  render(){
    return(
      <div >
        <Header as='h3' block style={{position:'fixed',width:'100%',zIndex:'1'}}>
          <span style={{float:'left',paddingTop:'1.5%'}}>
            Welcome Admin
          </span>
          <Button primary style={{float:'right', marginTop:'1%'}}>Logout</Button>
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
      </div>
    );
  }
}
