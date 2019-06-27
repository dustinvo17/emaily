import React from 'react'
import {reduxForm, Field} from 'redux-form'
import SurveyField from './SurveyField'
import {Link} from 'react-router-dom'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'
class SurveyForm extends React.Component{
   
    renderField(){
        return (
        <div>
        {formFields.map(({name,label}) =>{
                return <Field key={name} name={name} label={label} type="text" component={SurveyField}/>
        })}
        </div>
        )

    }
    render(){
        
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>  
                    {this.renderField()}
                    <button type="submit" className="teal btn-flat right white-text">Next
                    <i className="material-icons right">done</i>
                    </button>
                    <Link to='/surveys' className="red btn-flat left white-text">
                    Cancel
                    <i className="material-icons right">cancel</i>
                    </Link>
                </form>
                
            </div>
        )   
    }
}

function validate(values){
    const errors = {}
    
        
    
    formFields.forEach(({name})=>{
        if (!values[name]){
            errors[name] = `You must provide a value`
        }

    })
    if(values.recipients){
        errors.recipients = validateEmails(values.recipients)
    }
    if(values.from){
        errors.from = validateEmails(values.from)
    }
   
    

    return errors
}
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount:false

})(SurveyForm)