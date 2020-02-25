import React, { Component } from 'react';
import {
  Grid,
  Modal,
  Header,
  Segment,
  Button,
  Image
} from 'semantic-ui-react';
import './deleteQuestion.css';
import request from 'superagent';
const serverURL = require('../../config/dev.js').serverURL;
let container;


export default class DeleteQuestion extends Component {

  closeDeleteModal(){
    this.setState({deleteModalOpen:false})
  }
  deleteQuestion(){
    console.log("delete: ",this.state.deleteQuestionData._id);
    let context = this;
    this.setState({deleteDimmerActive:true,deleteModalOpen:false},()=>{
      request.del(serverURL + "/qb/question")
                 .query({id:this.state.deleteQuestionData._id})
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
                         },2500);

                       window.location.reload();
                     });
                   }
                 });
    });

  }
  render(){
    return(
          <Modal
            open={this.props.deleteModalOpen}
            onClose={this.props.closeDeleteModal}
          >
            <Modal.Header>Delete the Question</Modal.Header>
            <Modal.Content>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={1}></Grid.Column>
                  <Grid.Column width={13}>
                      <Header as='h3'>
                        {this.props.deleteQuestionData.question}
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={2}></Grid.Column>
                </Grid.Row>

                {this.props.deleteQuestionData.image_url.length !== 0?
                  <Grid.Row>
                    <Grid.Column width={4}/>
                    <Grid.Column width={10}>
                      <Image src={this.props.deleteQuestionData.image_url} size='small' />
                    </Grid.Column>
                    <Grid.Column width={3}/>
                  </Grid.Row>
                  :
                  ""
                }
                {this.props.deleteQuestionData.audio_url.length !== 0?
                  <Grid.Row>
                    <Grid.Column width={4}/>
                    <Grid.Column width={10}>
                      <audio controls>
                        <source src={this.props.deleteQuestionData.audio_url} type="audio/mpeg"/>
                        Your browser does not support the audio element.
                      </audio>
                    </Grid.Column>
                    <Grid.Column width={3}/>
                  </Grid.Row>
                  :
                  ""
                }


                <Grid.Row>
                  <Grid.Column width={2}></Grid.Column>
                  <Grid.Column width={6}>
                    <Segment style={{backgroundColor:this.props.deleteQuestionData.backgroundColor1,color:this.props.deleteQuestionData.color1}} raised >
                      A. {this.props.deleteQuestionData.op1}
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Segment style={{backgroundColor:this.props.deleteQuestionData.backgroundColor2,color:this.props.deleteQuestionData.color2}} raised >
                      B. {this.props.deleteQuestionData.op2}
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={2}></Grid.Column>
                  <Grid.Column width={6}>
                    <Segment style={{backgroundColor:this.props.deleteQuestionData.backgroundColor3,color:this.props.deleteQuestionData.color3}} raised >
                      C. {this.props.deleteQuestionData.op3}
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Segment style={{backgroundColor:this.props.deleteQuestionData.backgroundColor4,color:this.props.deleteQuestionData.color4}} raised >
                      D. {this.props.deleteQuestionData.op4}
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={2}/>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.props.closeDeleteModal} negative>
                No
              </Button>
              <Button
                onClick={this.props.deleteQuestion}
                positive
                labelPosition='right'
                icon='checkmark'
                content='Yes'
              />
            </Modal.Actions>
          </Modal>
    );
  }
}
