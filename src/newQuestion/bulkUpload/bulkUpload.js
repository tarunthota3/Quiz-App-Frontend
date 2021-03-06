import React, { Component } from 'react';
import {
  Modal,
  Button,
  Grid,
  Header,
  Input,
  Dropdown
} from 'semantic-ui-react';
import './bulkUpload.css';
import { CSVLink } from "react-csv";
let headers = [
  { label: "question", key: "question" },
  { label: "op1", key: "op1" },
  { label: "op2", key: "op2" },
  { label: "op3", key: "op3" },
  { label: "op4", key: "op4" },
  { label: "image_url", key: "image_url" },
  { label: "audio_url", key: "audio_url" },
  { label: "ans", key: "ans" }
];
let data = [
  { question: "What is the value of 1+3?", category:"entertainment", op1: "2", op2:"3", op3:"4", op4:"5", ans:"4", image_url:"", audio_url:"" },
  { question: "What is the value of 1+4?", category:"entertainment", op1: "4", op2:"5", op3:"6", op4:"7", ans:"5", image_url:"", audio_url:"" }
];


export default class BulkUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      fileAdded: false,
      file:[],
      category:'',
      categoryOptions: [
        { key: 'Entertainment', value: 'Entertainment', text: 'Entertainment' },
        { key: 'Politics', value: 'Politics', text: 'Politics' },
        { key: 'Riddles', value: 'Riddles', text: 'Riddles' },
        { key: 'Sports', value: 'Sports', text: 'Sports' },
        { key: 'Technology', value: 'Technology', text: 'Technology' },
      ]
    }
    this.categoryChange = this.categoryChange.bind(this);
    this.fileChange = this.fileChange.bind(this);
    this.uploadClick = this.uploadClick.bind(this);
  }
  categoryChange(e,a){
    console.log("category change");
    
    this.setState({category:a.value});
  }
  uploadClick(){
    this.props.uploadData(this.state.file, this.state.category);
  }
  fileChange(selectorFiles: FileList)
  {
    console.log("selectorFiles",selectorFiles,typeof selectorFiles);
    var tempArr = []
    tempArr.push(selectorFiles['0'])
    this.setState({file:tempArr, fileAdded: true});
  }
  render(){
    return(
          <Modal
            open={this.props.bulkUploadModalOpen}
            onClose={this.props.handleBulkUploadModalClose}
          >
            <Modal.Header>Upload multiple Questions</Modal.Header>
            <Modal.Content>
              <Grid>
              <Grid.Row>
            <Grid.Column width={4}>
              <Header as="h5" style={{marginTop:"3%"}}>Please Select the Category</Header>
            </Grid.Column>
            <Grid.Column width={6}>
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
                  <Grid.Column width={4} style={{paddingTop:'2%'}}>
                    <Header as="h4">
                      Upload the CSV File
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={6}>
                      <Input type='file' accept=".csv"  onChange={ (e) => this.fileChange(e.target.files)}/>
                  </Grid.Column>
                  <Grid.Column width={6} style={{textAlign:'right',paddingTop:'2%'}}>
                    <Header as="h5">
                      Need to download a sample CSV File? &nbsp;
                      <CSVLink data={data} headers={headers} filename={"bulk_upload_sample.csv"}>
                        <span style={{color:'black',textDecoration:'underline',cursor:'pointer'}}>Click Here</span>
                      </CSVLink>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.props.handleBulkUploadModalClose} negative>
                No
              </Button>
              <Button
                positive
                content='Upload'
                disabled={this.state.file.length === 0}
                onClick={this.uploadClick}
              />
            </Modal.Actions>
          </Modal>
    );
  }
}
