/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {Component} from 'react';
<<<<<<< HEAD
import {storage} from "../firebase/index"
=======
import {storage} from "../firebase/index";
>>>>>>> dedfa3cb9a7270a6a093cf0352f522e3a49533e3

import {storage} from '../firebase/index'



class UserForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            phoneNumber: '',
            image: null,
            imgUrl: '',
            role: 'user'
        };
        this.inputChange = this.inputChange.bind(this);
        this.submitEvent = this.submitEvent.bind(this);
        this.selectedFile = this.selectedFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    inputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    submitEvent(event){
      alert('Welcome ' + this.state.username);
      // console.log('Worked')
      event.preventDefault();
    }

    selectedFile(event){
      const image = event.target.files[0];
      this.setState(() => ({ image }));
  }

  uploadFile(){
    const { image } = this.state;
    console.log(image.name);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
uploadTask.on("state_changed",
snapshot => {},
error => {
  // error function ....
  console.log(error);
},

  () => {
    // complete function ....
    storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(imgUrl => {
        setTimeout(() => {
          this.setState({ imgUrl }, () =>
            console.log(imgUrl)
          );
        }, 2000);
      });
  }
);
}

    render(){
        return(
            <div>
              <h1>User:</h1>
              <img
              src={
                this.state.imgUrl || "https://embodiedfacilitator.com/wp-content/uploads/2018/05/human-icon-png-1901.png"
              }
              alt="User Image"
              height="100"
              width="100"
            />
                <form onSubmit={this.submitEvent}>
                    <input type="text" name="username" value={this.state.username} onChange={this.inputChange} placeholder="Username"/><br/>
                    <input type="password" name="password" value={this.state.password} onChange={this.inputChange} placeholder="Password"/><br/>
                    <input type ="number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.inputChange} placeholder="Phone Number"/><br/>
                    <input type="file" onChange={this.selectedFile}/><br/>
                <input onClick={this.uploadFile} value="upload" /><br/>
                    <button>Signup</button>
                </form>
            </div>
        )
    }
}

export default UserForm;