import React, { Component } from 'react'
import Avatar from './img/user-1.png';
import send from './img/send.png';
import Message from './message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
var userIndex;
class ChatWindow extends Component {
    constructor() {
        super()
        this.state = {
            textAreaMessage: ''
        }
        this.textAreaChange = this.textAreaChange.bind(this);
        this.togglerHeight = this.togglerHeight.bind(this);
        this.mobileHeight = this.mobileHeight.bind(this);
        this.checkIfEnterIsPressed = this.checkIfEnterIsPressed.bind(this);

    }

    togglerHeight(dataId) {
        var element = document.querySelector('[data-id="' + dataId + '"][data-chatbox="yes"]');
        var chatBoxElemenet = document.querySelector('.chatBox[data-id="' + dataId + '"]');

        element.classList.toggle("height0");
        chatBoxElemenet.classList.toggle("hidingChatbox")

        this.props.activeChats.map(activeChat => {
            if (activeChat != dataId) {
                var chatBoxElemenet = document.querySelector('.chatBox[data-id="' + activeChat + '"]');
                chatBoxElemenet.classList.add('hidingChatbox');

                var chatBoxAreaElement = document.querySelector('.chatbox-area[data-id="' + activeChat + '"]');
                chatBoxAreaElement.classList.add('height0');
            }
        })
    }
    mobileHeight(dataId) {
        var element = document.querySelector('[data-id="' + dataId + '"][data-chatbox="yes"]');
        var chatBoxElemenet = document.querySelector('.chatBox[data-id="' + dataId + '"]');

        element.classList.toggle("height0");
        chatBoxElemenet.classList.toggle("hidingChatbox")

        if (window.innerWidth < 768) {
            chatBoxElemenet.classList.add('mobileScreen');
        } else {
            chatBoxElemenet.classList.remove('mobileScreen');
        }
    }
    textAreaChange(e) {
        this.setState({ textAreaMessage: e.target.value });
    }

    checkIfEnterIsPressed(event) {
        if (event.key == "Enter") {
            var chatBoxElemenet = document.querySelector('.sendButton[data-user="' + this.props.user + '"]');
            chatBoxElemenet.click();
            event.preventDefault();
        }
    }
    componentDidMount() {
        this.nameInput.focus();
        if (window.innerWidth < 768) {
            console.log("hey " + this.props.user);
            this.mobileHeight(this.props.user);
        }
    }
    render() {
        var users = this.props.userData;
        userIndex = users.findIndex(tempIndex => tempIndex.identifier == this.props.user);
        return (
            <div className="chatBox" data-id={this.props.user}>
                <div className="card">
                    <header className="card-header header-title" data-id={this.props.user} onClick={() => this.togglerHeight(`${this.props.user}`)}>
                        <img src={require('./img/' + this.props.userData[userIndex].image)} className="img-fluid chatHeaderImage"></img>
                        <p className="card-header-title">{this.props.userData[userIndex].name}</p>
                        <a className="card-header-icon">
                            <span className="" onClick={() => this.props.closeChat(this.props.user)} >
                                <FontAwesomeIcon icon={faTimesCircle} className="colorWhite" />
                            </span>
                        </a>
                    </header>
                    <div className="chatbox-area" data-id={this.props.user} data-chatbox="yes">
                        <div className="card-content chat-content">
                            <div className="content">
                                {
                                    this.props.chats.map((chatItem, index) => {
                                        if (chatItem.fromUser == this.props.activeUser) {
                                            return (
                                                <Message key={index} userIndex={userIndex} chatItem={chatItem} activeUser={this.props.activeUser} user={this.props.user} userData={this.props.userData}></Message>
                                            )
                                        } else {
                                            var checkIfActiveUserIsInToChats = chatItem.chats.findIndex(tempIndex => tempIndex.toUser == this.props.activeUser);
                                            if (checkIfActiveUserIsInToChats != -1) {
                                                return (
                                                    <Message key={index} userIndex={userIndex} chatItem={chatItem} activeUser={this.props.activeUser} user={this.props.user} userData={this.props.userData}></Message>
                                                )
                                            }
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <footer id="chatBox-textbox" className="card-footer">
                            <div className="row m-0 bgWhite">
                                <div className="col-10 p-0">
                                    <textarea ref={(input) => { this.nameInput = input; }} onChange={this.textAreaChange} id="chatTextarea" placeholder="Enter a message" className="chat-textarea" style={{ height: "57px" }} onKeyPress={event => this.checkIfEnterIsPressed(event)} value={this.state.textAreaMessage}></textarea>
                                </div>
                                <div className="col-2" style={{ margin: "auto" }}>
                                    <img src={send} data-user={this.props.user} id="sendButton" className="img-fluid sendButton" onClick={() => this.props.getMessage(this.state.textAreaMessage, this.props.user)}></img>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChatWindow;