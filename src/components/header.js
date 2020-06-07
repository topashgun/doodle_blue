import React, { Component } from 'react'
import Logo from './img/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
var userIndex = "NoActiveUser";
class header extends Component {
    toggleDiv() {
        document.getElementById('dropDownDiv').classList.toggle('show');
    }
    render() {
        return (
            <div>
                <nav className="sb-topnav navbar navbar-expand shadow navbar-light bg-white" id="sidenavAccordion" >
                    <a className="navbar-brand" href="index.html"><img src={Logo} /></a>
                    <ul className="form-inline ml-auto mr-1 navbar-nav align-items-center">
                        <li className="nav-item dropdown no-caret sb-dropdown-user">
                            <a className="btn sb-btn-icon sb-btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" onClick={() => this.toggleDiv()} role="button" aria-haspopup="true" aria-expanded="false">
                                <img className="img-fluid" src={this.props.activeUserName == "" ? require('./img/noUser.png') : require('./img/' + this.props.activeUserImage)} />
                            </a>
                            <div id="dropDownDiv" className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                                <h6 className="dropdown-header d-flex align-items-center">
                                    <img className="sb-dropdown-user-img" src={this.props.activeUserName == "" ? require('./img/noUser.png') : require('./img/' + this.props.activeUserImage)} />
                                    <div className="sb-dropdown-user-details">
                                        <div className="sb-dropdown-user-details-name">{this.props.activeUserName == "" ? "No Active User" : this.props.activeUserName}</div>
                                    </div>
                                </h6>
                                <div className="dropdown-divider"></div>
                                {
                                    this.props.users.map(user => {
                                        if (user.identifier != this.props.activeUser) {
                                            return (
                                                <a className="dropdown-item" key={user.identifier}>
                                                    <span className="dropdown-item" onClick={() => this.props.makeActiveUser(user.identifier)}>
                                                        <div className="sb-dropdown-item-icon"><img src={require('./img/' + user.image)}></img></div>
                                                        {user.name}
                                                    </span>
                                                    <FontAwesomeIcon className={`mailIcon ${this.props.activeUser == "" ? `disabledIcon` : ``}`} icon={faEnvelope} onClick={() => this.props.envelopeClick(user.identifier)} />
                                                </a>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </li>
                    </ul>
                </nav >
            </div>
        )
    }
}

export default header;