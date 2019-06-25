import React from 'react'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'
import {reduxForm} from 'redux-form'
class SurveyNew extends React.Component {
    state ={showFormReview:false}
    
    renderForm(){
        if(this.state.showFormReview === false){
            return <SurveyForm onFormSubmit={() =>this.setState({showFormReview:true})}/>
        }
        else {
            return <SurveyFormReview onCancel ={() => this.setState({showFormReview:false})}/>
        }
    }
    render(){
        return(
            <div>
                {this.renderForm()}
            </div>
        )
    }
}

export default reduxForm({
    form:'surveyForm'
})(SurveyNew)