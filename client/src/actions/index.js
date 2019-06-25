import axios from 'axios'

export const fetchUser = () => async dispatch =>{
    const {data} = await axios.get('/api/current_user')
    dispatch({type:'fetch_user',payload:data})
}

export const handleToken = token => async dispatch =>{
    const {data} = await axios.post('/api/stripe',token)
    dispatch({type:'fetch_user',payload:data})
}

export const submitSurvey =(values,history )=>async dispatch=>{
    const {data} = await axios.post('/api/surveys',values)
    history.push('/surveys')
    dispatch({type:'fetch_user',payload:data})
}

export const fetchSurvey =() => async dispatch => {
    const {data} = await axios.get('/api/surveys')
    dispatch({type:'fetch_survey',payload:data})
}