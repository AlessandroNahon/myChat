import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Events';
import LoginForm from './LoginForm';
import ChatContainer from './chats/ChatContainer';

const socketUrl = "http://192.168.2.14:8000"

export default class Layout extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      socket:null,
      user:null
    };
  }

  componentWillMount() {
    this.initSocket()
  }
  
  //CONNECT TO AND INITIALIZE SOCKET
  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('connected');
    })
    this.setState({socket})
  }

  //SETS THE USER PROPERTY IN STATE
  // @param user {id:number, name:string}
  setUser = (user) => {
    const { socket } =  this.state
    socket.emit(USER_CONNECTED, user);
    this.setState({user})
  }

  //SETS THE USER PROPERTY IN STATE TO NULL
  logout = (user) => {
    const { socket } = this.state
    socket.emit(LOGOUT);
    this.setState({user:null})
  }
    
  render() {
    const { title } = this.props
    const { socket, user } = this.state
    return (
      <div className="container">
        {
          !user ?
          <LoginForm socket={socket} setUser={this.setUser}/>
          :
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        }
      </div>
    );
  }
}