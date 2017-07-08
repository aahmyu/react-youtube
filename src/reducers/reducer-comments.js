import _ from 'lodash';
import {GET_COMMENTS} from '../actions/index';

export default function(state=[],action){
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload.data.items;
        default:
            return state;
    }
}