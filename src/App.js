import React, { Component } from 'react';
import Header from './components/header';
import Chats from './components/Chats';

import './components/css/bootstrap.css';
import './components/css/chat.css';
import './components/css/custom.css';

import 'bootstrap/dist/js/bootstrap.bundle';

class App extends Component {
  componentDidMount() {
    var getLocalStorage = JSON.parse(localStorage.getItem('state'));
    if (getLocalStorage != null) {
      if (getLocalStorage.activeUser.length != 0) {
        this.makeActiveUser(getLocalStorage.activeUser);
      }
    }
    var activeChats = localStorage.getItem('activeChats');
    if (activeChats != null) {
      this.setState({
        activeChats: activeChats.split(',')
      })

      if (localStorage.getItem('chats') == null) {
        this.setState({
          chats: []
        })
      } else {
        this.setState({
          chats: JSON.parse(localStorage.getItem('chats'))
        })
      }
      console.log("chats " + localStorage.getItem('chats'))
    }
  }
  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state));
    console.log(JSON.stringify(this.state))
    if (this.state.chats.length != 0) {
      localStorage.setItem("chats", JSON.stringify(this.state.chats));
    }
    if (this.state.activeChats.length != 0) {
      localStorage.setItem("activeChats", this.state.activeChats);
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      activeUser: "",
      activeUserName: '',
      activeUserImage: '',
      activeChats: [],
      users: [{
        "name": "Ashwin bala",
        "image": "user-1.png",
        "identifier": "user1"
      }, {
        "name": "Shanmukha kavya",
        "image": "user-2.png",
        "identifier": "user2"
      }, {
        "name": "Batman",
        "image": "user-3.png",
        "identifier": "user3"
      }, {
        "name": "Superman",
        "image": "user-4.png",
        "identifier": "user4"
      }],
      chats: []
    }
    this.envelopeClick = this.envelopeClick.bind(this);
    this.makeActiveUser = this.makeActiveUser.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.closeChat = this.closeChat.bind(this);
  }

  makeActiveUser(activeUser) {
    var users = this.state.users;
    var userIndex = users.findIndex(tempIndex => tempIndex.identifier == activeUser);
    this.setState({
      activeUserName: users[userIndex].name,
      activeUserImage: users[userIndex].image,
      activeUser: activeUser

    });
    this.setState({ activeChats: [] });
  }

  envelopeClick(identifier) {
    var identifierArray = this.state.activeChats;
    identifierArray.indexOf(identifier) > -1
      ? console.log("do nothing")
      : identifierArray.push(identifier)
    this.setState({ activeChats: identifierArray });
  }

  closeChat(identifier) {
    var activeChatsArray = this.state.activeChats;
    var index = activeChatsArray.indexOf(identifier);
    if (index !== -1) activeChatsArray.splice(index, 1);
    this.setState({ activeChats: activeChatsArray });
  }

  getMessage(message, toUser) {
    if (message.length != 0) {
      var chatData = this.state.chats;
      var userIndex = chatData.findIndex(tempIndex => tempIndex.fromUser == this.state.activeUser);

      if (userIndex == -1) {
        this.setState(prevState => ({
          chats: [...prevState.chats, this.createNewUser(message, toUser)]
        }))
      } else {
        var fromChatData = chatData[userIndex].chats;
        var toUserChatIndex = fromChatData.findIndex(tempIndex => tempIndex.toUser == toUser);
        if (toUserChatIndex == -1) {
          var toUsersData = this.state.chats[userIndex].chats;
          toUsersData.push(this.createChatArray(message, toUser));
          this.state.chats[userIndex].chats = toUsersData;
          this.forceUpdate();
        } else {
          var messagesData = fromChatData[toUserChatIndex].messages;
          messagesData.push(this.createMessage(this.state.activeUser, message, toUser))
          this.state.chats[userIndex].chats[toUserChatIndex].messages = messagesData;
          this.forceUpdate();
        }
      }
    }
  }
  createNewUser(message, toUser) {
    var createNewUserObject = new Object();
    createNewUserObject.fromUser = this.state.activeUser;
    createNewUserObject.chats = [this.createChatArray(message, toUser)];
    return createNewUserObject;
  }

  createChatArray(message, toUser) {
    var createChatObject = new Object();
    createChatObject.toUser = toUser;
    createChatObject.messages = [this.createMessage(this.state.activeUser, message, toUser)];
    return createChatObject;
  }

  createMessage(user, message, toUser) {
    var createMessageObject = new Object();
    createMessageObject.user = this.state.activeUser;
    createMessageObject.message = message;
    createMessageObject.order = document.querySelectorAll('.chatBox[data-id="' + toUser + '"] .chat-message-group').length + 1;
    return createMessageObject;
  }

  clearChats() {
    localStorage.clear();
    this.setState({
      activeUser: "",
      activeUserName: '',
      activeUserImage: '',
      activeChats: [],
      chats: []
    })
    document.querySelector('#dropDownDiv').classList.remove('show')
  }
  render() {
    return (
      <div className="App" >
        <Header users={this.state.users} activeUserName={this.state.activeUserName} activeUserImage={this.state.activeUserImage} activeUser={this.state.activeUser} envelopeClick={this.envelopeClick} makeActiveUser={this.makeActiveUser}></Header>
        <Chats closeChat={this.closeChat} chats={this.state.chats} users={this.state.users} activeChats={this.state.activeChats} getMessage={this.getMessage} activeUser={this.state.activeUser}></Chats>
        <div className="row">
          <div className="col-4 offset-4 text-center mt-2">
            <button type="button" className="btn btn-success btn-sm" onClick={() => this.clearChats()}>Clear Chats</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
