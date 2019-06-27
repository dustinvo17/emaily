import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Payments from './Payments'
import axios from 'axios'
import JSAlert from 'js-alert'

import LoginModal from "react-login-modal-sm";
class Header extends React.Component {
     state = {
    showModal: false
  };
   toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
 
  handleLoginWithFacebook = () => {
    window.location.href ='/auth/facebook'
  };
 
  handleLoginWithGoogle = () => {
      window.location.href ='/auth/google'
      
  };
  
  handleLoginWithEmail = async(email,password) =>{
      try{
         const res = await axios.post('/api/login',{email,password})
      
      if(res.data.email){
          return window.location.href ='/surveys'
      }
      }catch (error){
        if(error){
            JSAlert.alert('Invalid email or password').dismissIn(1000*2)
        }
      }
     
   
          
      
      
      
  }
   handleSignupByEmail = async (email, username, password) => {
    try{
        const res = await axios.post('/api/signup',{email,password,username})
     if(res.data){
        
         this.handleLoginWithEmail(email,password)
     }
    }catch (error){
        if(error){
             JSAlert.alert('Email has been already used').dismissIn(1000*2)
        }
    }
     
  };

    renderComponent = () =>{
        switch (this.props.auth){
            case null:
                return
            case false:
                return (
                    <button
          className="test-btn btn btn-primary btn-lg"
          onClick={this.toggleModal}
        >
          Log in
        </button>
                )
            default:
                return ([<li key="a"><Payments/></li>,
                
                <li key="b" style={{margin:'0 10px'}}>Credits: {this.props.auth.credits}</li>,
                <li key="c"><a href="/api/logout">Log out</a></li>] )

        }
    }
    render() {
        // JSAlert.alert('Invalid email or password').dismissIn(1000*2)
        const customUsernameRegex = /^[a-zA-Z0-9_]{5,}/;
        return (
            <nav>
                 <LoginModal
          showModal={this.state.showModal}
          toggleModal={this.toggleModal}
          onLoginFacebook={this.handleLoginWithFacebook}
          onLoginGoogle={this.handleLoginWithGoogle}
          onSignupEmail={this.handleSignupByEmail}
          usernameRegex={customUsernameRegex}
          onLoginEmail={this.handleLoginWithEmail}
          loginPasswordPlaceholder='password'
        />
               <div className="nav-wrapper light-blue">
                    <div className='container'>

                    
                    <Link to={this.props.auth ? '/surveys':'/'} className="left brand-logo">Emaily</Link>
                    <ul className="right">
                        {this.renderComponent()}
                    </ul>
                    
                     </div>
                    
                </div>
                
            </nav>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
   
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Header)