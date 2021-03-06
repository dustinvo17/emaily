import React from 'react'
import { BrowserRouter as Router,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'
import * as actions from '../actions'
import history from '../history';

class App extends React.Component {
    componentDidMount(){
        this.props.fetchUser()
    }
    render(){
        return(
            <div >
                <Router history={history}>
                    <Header/>
                    <div className="container">
                        
                        <Route path='/' exact component={Landing} />
                        <Route path='/surveys' exact component={Dashboard}/>
                        <Route path='/surveys/new' exact component={SurveyNew}/>
                    </div>
                    
                </Router>
            </div>
        )    
    }
}
export default connect(null,actions)(App)