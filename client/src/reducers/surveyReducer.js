export default (state=[],action) =>{
     switch(action.type){
        case 'fetch_survey':
            return action.payload
        default:
            return state;
    }
}