import React, { Component } from 'react';
import {
  Grid,
  Modal,
  Button,
  Dropdown,
  Header
} from 'semantic-ui-react';
import './editQuestion.css';

export default class EditQuestion extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      updateDimmerActive:false
    }
    this.editQuestionDropDownChange = this.editQuestionDropDownChange.bind(this);
  }
  editQuestionDropDownChange(e,a){
    this.props.editQuestionDropDownChange(a.value);
  }
  render(){
    // console.log("this.props: ",this.props.editQuestionData);
    return(
      <div>
        <Modal
          open={this.props.editModalOpen}
          onClose={this.props.closeEditModal}
        >
          <Modal.Header>Edit the Question</Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={2} style={{paddingTop:'1%'}}>
                  Question
                </Grid.Column>
                <Grid.Column width={13}>
                  <input style={{padding: '8px', width:'100%'}} placeholder="Enter the Question" fluid value={this.props.editQuestionData.question} onChange={this.props.editQuestionChange}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column style={{textAlign:'right'}}>
                  <Header as="h4">
                    Shuffle the Answers? <span style={{textDecoration:'underline',cursor:'pointer'}} onClick={this.props.refreshClick}>Click Here</span>
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={1} style={{paddingTop:'1%',textAlign:'right'}}>
                  A.
                </Grid.Column>
                <Grid.Column width={5}>
                  <input style={{padding: '4px'}} fluid placeholder="Enter the value" onChange={this.props.op1Change} value={this.props.editQuestionData.op1}/>
                </Grid.Column>
                <Grid.Column width={1} style={{paddingTop:'1%',textAlign:'right'}}>
                  B.
                </Grid.Column>
                <Grid.Column width={5}>
                  <input style={{padding: '4px'}} fluid placeholder="Enter the value" onChange={this.props.op2Change} value={this.props.editQuestionData.op2}/>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={1} style={{paddingTop:'1%',textAlign:'right'}}>
                  C.
                </Grid.Column>
                <Grid.Column width={5}>
                  <input style={{padding: '4px'}} fluid placeholder="Enter the value" onChange={this.props.op3Change} value={this.props.editQuestionData.op3}/>
                </Grid.Column>
                <Grid.Column width={1} style={{paddingTop:'1%',textAlign:'right'}}>
                  D.
                </Grid.Column>
                <Grid.Column width={5}>
                  <input style={{padding: '4px'}} fluid placeholder="Enter the value" onChange={this.props.op4Change} value={this.props.editQuestionData.op4}/>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={3} style={{paddingTop:'1%',textAlign:'right'}}>
                  Correct Answer
                </Grid.Column>
                <Grid.Column width={7}>

                  <Dropdown
                    placeholder='Enter the correct Answer'
                    fluid
                    selection
                    value = {this.props.editQuestionData.ans}
                    options={this.props.correctAnswer}
                    onChange={this.editQuestionDropDownChange}
                  />
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.props.closeEditModal} negative>
              No
            </Button>
            <Button
              onClick={this.props.editQuestion}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
              disabled={this.props.editQuestionData.question.length===0 || this.props.editQuestionData.op1.length===0 ||
                        this.props.editQuestionData.op2.length===0 || this.props.editQuestionData.op3.length===0 ||
                        this.props.editQuestionData.op4.length===0 || this.props.editQuestionData.ans.length===0 }
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
