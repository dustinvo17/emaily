import React from 'react'
import { BrowserRouter as Router,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './Header'
import Landing from './Landing'
import * as actions from '../actions'
const header = () => {
    return <div>Landing</div>
}
const survey = () =>{
    return <div>Dashboard</div>
}
class App extends React.Component {
    componentDidMount(){
        this.props.fetchUser()
    }
    render(){
        return(
            <div className="container">
                <Router>
                    <Header/>
                    <div>
                        
                        <Route path='/' exact component={Landing} />
                        <Route path='/surveys' exact component={survey}/>
                    </div>
                    
                </Router>
            </div>
        )    
    }
}
export default connect(null,actions)(App)