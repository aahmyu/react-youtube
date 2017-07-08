import { GET_CHANNEL } from '../actions/index';

export default function(state=null,action){
    switch (action.type) {
        case GET_CHANNEL:
            return action.payload.data.items[0];
        default:
            return state;
    }
}