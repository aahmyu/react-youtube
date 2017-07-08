import _ from 'lodash';
import { SEARCH_VIDEOS, GET_VIDEO, SET_TERM } from '../actions/index';

export default function(state={}, action){
    switch(action.type){
        case SEARCH_VIDEOS:
            return _.mapKeys( action.payload.data.items, 'id.videoId');
        case GET_VIDEO:
            return { ...state, [action.payload.data.items[0].id]: action.payload.data.items[0]};
        default:
            return state;
    }
}