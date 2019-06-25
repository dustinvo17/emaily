import React from 'react'
import {connect} from 'react-redux'
import formFields from './formFields'
import {withRouter} from 'react-router-dom'
import * as actions from '../../actions'
const SurveyReview =({onCancel,formValues,submitSurvey,history}) =>{
    const renderForm = () =>{
        return  formFields.map(({name,label}) =>{
            return (
                <div key={name}>
                    <label>{label}</label>
                    <div>{formValues[name]}</div>
                </div>
            )
        })
    }
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {renderForm()}
            <button className="yellow darken-3 btn-flat white-text" onClick={onCancel}>
                Back

            </button>
            <button className="green btn-flat right white-text" onClick={()=>submitSurvey(formValues,history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        formValues: state.form.surveyForm.values
    }
}
export default connect(mapStateToProps,actions)(withRouter(SurveyReview))