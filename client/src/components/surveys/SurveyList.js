import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import PieChart from 'react-minimal-pie-chart';
import JSAlert from 'js-alert'

class SurveyList extends React.Component {
    componentDidMount() {
        this
            .props
            .fetchSurvey()
    }
    deleteConfirm (user, id){

        JSAlert
            .confirm("Are you sure you want to delete this survey?")
            .then( async (result) =>{

                // Check if pressed yes
                if (!result) {
                    return;
                }

                const a = await this.props.deleteSurvey(user, id)
                return JSAlert.alert("Survey deleted!")

            });
    }
    renderSurveys() {
        return this
            .props
            .surveys
            .reverse()
            .map(({
                title,
                yes,
                no,
                body,
                _id,
                dateSent,
                lastResponded,
                _user
            }) => {
                return (
                    <div className="card darken-1" key={_id}>
                        <div className="card-content">
                            <span className="card-title">{title}</span>

                            <p>
                                {body}
                            </p>
                            <p className="right">
                                Sent On: {new Date(dateSent).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="card-action">
                            <PieChart
                                data={[
                                {
                                    title: 'Yes',
                                    value: yes || 1,
                                    color: 'blue'
                                }, {
                                    title: 'No',
                                    value: no || 1,
                                    color: 'red'
                                }
                            ]}
                                radius={10}
                                cx={50}
                                cy={10}
                                ratio={5}>

                                <p className="red-text">Yes
                                    <i className="material-icons red">fiber_manual_record</i>
                                </p>
                                <p className="blue-text">No
                                    <i className="material-icons blue">fiber_manual_record</i>
                                </p>
                                <p>Last responded: {lastResponded
                                        ? (new Date(lastResponded).toLocaleDateString())
                                        : ''}</p>
                            </PieChart>
                             
                                    <button
                            className="btn red lighten-5 blue-grey-text"
                            onClick={() => this.deleteConfirm(_user, _id)}>Delete survey</button>
                        

                        </div>
                       
                        

                    </div>
                )

            })
    }
    render() {
        return <div>{this.renderSurveys()}</div>
    }
}
const mapStateToProps = (state, ownProps) => {
    

    return {surveys: state.surveys}
}
export default connect(mapStateToProps, actions)(SurveyList)