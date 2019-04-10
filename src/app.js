import React, { Component } from 'react';

import './app.scss';
import axios from 'axios';
import config from './config';

class App extends Component {
  state={
    message: 'drag file over me',
    selectedFile: null,
  };

  handleOnChange = (e) => {
    const { files } = e.target;
    this.process(files);
  }

  handleOnClick = async (e) => {
    this.upload();
    e.preventDefault();
  }

  handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  handleDragLeave = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  handleDrop = (e) => {
    const { files } = e.dataTransfer;
    e.stopPropagation();
    e.preventDefault();
    this.process(files);
  }

  createUrl = async () => {
    const { selectedFile } = this.state;
    const { name, type } = selectedFile;
    const apiUrl = config.API;
    const response = await axios.get(`${apiUrl}?name=${name}&type=${type}`);
    const { data } = response;
    return data;
  }

  sendFile = async (signature) => {
    const { signedRequest } = signature;
    const { selectedFile } = this.state;

    const options = {
      headers: {
        'Content-Type': selectedFile.type,
        'x-amz-acl': 'public-read',
      },
    };

    try {
      const response = await axios.put(signedRequest, selectedFile, options);
      return response;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  upload = async () => {
    const signature = await this.createUrl();
    const response = await this.sendFile(signature);

    console.log(response);

    this.setState({ message: signature.url });
  }

  process(files) {
    const selectedFile = files[0];
    const message = selectedFile.name;

    this.setState({ selectedFile, message });
  }

  render() {
    const { message } = this.state;

    return (
      <div className="ui container app-content">
        <form className="ui form">
          <h3 className="ui dividing header">File Upload</h3>
          <div className="field">
            <label className="ui button" htmlFor="file-input">
              <input id="file-input" type="file" accept="image/*" onChange={this.handleOnChange} />
              Choose a file
            </label>
          </div>
          <div className="field">
            <div
              className="dragdrop"
              onDragEnter={this.handleDragEnter}
              onDragLeave={this.handleDragLeave}
              onDragOver={this.handleDragOver}
              onDrop={this.handleDrop}
            >
              <div className="centered disabled white">{message}</div>
            </div>
          </div>
          <div className="field">
            <button className="ui button fluid primary" onClick={this.handleOnClick}>upload</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
