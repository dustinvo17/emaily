import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Payments from './Payments'
class Header extends React.Component {
   
    renderComponent = () =>{
        switch (this.props.auth){
            case null:
                return
            case false:
                return (
                    <li><a href="/auth/google">Sign in with Google</a></li>
                )
            default:
                return ([<li key="a"><Payments/></li>,
                <li key="b" style={{margin:'0 10px'}}>Credits: {this.props.auth.credits}</li>,
                <li key="c"><a href="/api/logout">Log out</a></li>] )

        }
    }
    render() {
        
        
        return (
            <nav>
                <div className="nav-wrapper light-blue">
                    <Link to={this.props.auth ? '/surveys':'/'} className="left brand-logo">Email Survey</Link>
                    <ul className="right">
                        {this.renderComponent()}
                    </ul>

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