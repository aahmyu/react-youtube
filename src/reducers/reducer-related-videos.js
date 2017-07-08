import _ from 'lodash';
import { RELATED_VIDEOS } from '../actions/index';

export default function(state={}, action){
    switch (action.type) {
        case RELATED_VIDEOS:
            return _.mapKeys(action.payload.data.items, 'id.videoId');
        default:
            return state;
    }
}