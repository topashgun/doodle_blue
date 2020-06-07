import React, { Component } from 'react'

class Message extends Component {
    render() {
        var chatItem = this.props.chatItem;
        var chats = chatItem.chats;
        return (
            chats.map(toChatItem => {
                if ((this.props.user == toChatItem.toUser && this.props.activeUser == chatItem.fromUser) || (this.props.activeUser == toChatItem.toUser && this.props.user == chatItem.fromUser)) {
                    return (
                        toChatItem.messages.map((message, index) => {
                            var ignoreLogo = false;
                            if (index != 0) {
                                var tempIndex = index;
                                if (toChatItem.messages[--tempIndex].user == message.user) {
                                    ignoreLogo = true
                                }
                            }
                            return (
                                <div style={{ order: message.order }} data-order={message.order} key={index} className={`chat-message-group ${this.props.activeUser == message.user ? `writer-user` : ``}`}>
                                    <div className="chat-thumb">
                                        {
                                            this.props.activeUser != message.user
                                                ? <img src={!ignoreLogo ? require('./img/' + this.props.userData[this.props.userIndex].image) : ''} className="img-fluid"></img>
                                                : ""
                                        }
                                    </div>
                                    <div className="chat-messages">
                                        <div className="message">{message.message}</div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            })
        )
    }
}

export default Message;