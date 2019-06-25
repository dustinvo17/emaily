import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class SurveyList extends React.Component{
    componentDidMount(){
        this.props.fetchSurvey()
    }
    renderSurveys(){
        return this.props.surveys.reverse().map(({title,yes,no,body,id,dateSent}) =>{
            return (
            <div className="card darken-1" key={id}>
                <div className="card-content">
                    <span className="card-title">{title}</span>
                
                <p> {body} </p>
                <p className="right">
                    Sent On: {new Date(dateSent).toLocaleDateString()}
                </p>
                </div>
                <div className="card-action">
                     <a >Yes:{yes}</a>
                     <a >No:{no}</a>
                </div>
                
            </div>
            )

        })
    }
    render(){
        return <div>{this.renderSurveys()}</div>
    }
}
const mapStateToProps = (state, ownProps) => {
    console.log(state.surveys)
    
    return {
        surveys: state.surveys
    }
}
export default connect(mapStateToProps,actions)(SurveyList)