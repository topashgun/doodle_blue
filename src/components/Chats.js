import React, { Component } from 'react';
import ChatWindow from './chatWindow';
let key = 0;
class Chats extends Component {
    render() {
        return (
            <div className="chatWindowDiv">
                {
                    this.props.activeChats.map(activeChat => {
                        if (this.props.chats != null) {
                            return (
                                <ChatWindow activeChats={this.props.activeChats} closeChat={this.props.closeChat} activeUser={this.props.activeUser} chats={this.props.chats} key={key++} user={activeChat} userData={this.props.users} getMessage={this.props.getMessage} ></ChatWindow>
                            )
                        }
                    })
                }
            </div >
        )
    }
}

export default Chats;