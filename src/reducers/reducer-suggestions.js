import { GET_SUGGESTIONS, RESET_SUGGESTIONS } from '../actions/index';
import _ from 'lodash';

export default function(state=[], action){
    switch (action.type) {
        case GET_SUGGESTIONS:
            return _.map(action.payload, item => item[0]);
        case RESET_SUGGESTIONS:
            return [];
        default:
            return state;
    }
}