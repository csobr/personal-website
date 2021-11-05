import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import '@babel/polyfill';
import axios from 'axios';
const initialState = {
  name: '',
  email: '',
  message: '',
  nameError: '',
  emailError: '',
  messageError: '',
};
export default class contact extends Component {
  componentDidMount() {
    document.title = 'Contact';
  }
  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validate = () => {
    let nameError = '';
    let emailError = '';
    let messageError = '';
    if (!this.state.name) {
      nameError = 'Name cannot be blank!';
    }
    if (!this.state.email.includes('@')) {
      emailError = 'Invalid email';
    }
    if (!this.state.message) {
      messageError = 'Message cannot be blank!';
    }
    if (emailError || nameError || messageError) {
      this.setState({ emailError, nameError, messageError });
      return false;
    }
    return true;
  };
  async handleSubmit(e) {
    const isValid = this.validate();
    if (isValid) {
      //clear form
      e.preventDefault();
      console.log(this.state);

      this.setState(initialState);
    }
    const { name, email, message } = this.state;
    const form = await axios.post('/api/form', {
      name,
      email,
      message,
    });
  }
  render() {
    return (
      <div>
        {' '}
        <Helmet>
          <title>Contact me</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Contact me" />
        </Helmet>
        <div className="contact">
          <style type="text/css">{`
        body {
            background-color:#050505 ;
            min-height: 100vh;
            min-width: 100vw;
            margin: 0;
            padding: 0;
            overflow:hidden;
            color: #fff;
        }
        .main-nav{
          background-color:#050505 ;
        }
        .toggle{
          background-color: transparent;
        }
        .active {
          border-bottom: 1px solid #fff;
        }
 
        p{
            color:#fff;
        }
        .socialicon a{
          color: #fff;

        }
        .links{
          background: #050505;
        }
        .links a{
          color:#fff;
        }
        .hamburger span {
         background: #fff;
        }
       h3{
          color:#fff;
        }
        input {
          color: #fff;
          border-bottom: 1px solid #fff;
        }
        .label{
          color: #fff;
        }
        
        textarea {
          background: rgba(202, 202, 202, 0.1);
          color: #fff;
          outline: none;
        }
        
        input:focus {
          background: none;
      
          color: #fff;
        }
        .label{
          color: #fff;
        }
        button {
          border: 1px solid #fff;
          color:#fff;
        }

        .footer {
          color:#fff;
          ;
        }
    `}</style>
          <form onSubmit={this.handleSubmit}>
            <h3>Contact</h3>
            <label className="name"></label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={this.handleChange}
            />
            <div style={{ fontSize: 10, color: 'red' }}>
              {this.state.nameError}
            </div>
            <label className="email"></label>
            <input
              autoComplete="off"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <div style={{ fontsize: 10, color: 'red' }}>
              {this.state.emailError}
            </div>
            <label className="message"></label>
            <textarea
              name="message"
              id="message"
              placeholder="Message"
              onChange={this.handleChange}
            ></textarea>
            <div style={{ fontsize: 10, color: 'red' }}>
              {this.state.messageError}
            </div>
            <button onSubmit={this.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
