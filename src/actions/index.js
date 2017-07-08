import config from '../../config';
import axios from 'axios';
import jsonp from 'jsonp';

const API_KEY = config.youtube;
const ROOT_URL = `https://www.googleapis.com/youtube/v3/`;

export const SEARCH_VIDEOS = 'SEARCH_VIDEOS';
export const GET_VIDEO = 'GET_VIDEO';
export const GET_CHANNEL = 'GET_CHANNEL';
export const GET_COMMENTS = 'GET_COMMENTS';
export const RELATED_VIDEOS = 'RELATED_VIDEOS';
export const GET_SUGGESTIONS = 'GET_SUGGESTIONS';
export const RESET_SUGGESTIONS = 'RESET_SUGGESTIONS';


export function searchVideos(term) {
    const request = axios.get(`${ROOT_URL}search?maxResults=25&part=snippet&${API_KEY}&q=${term}`);

    return {
        type: SEARCH_VIDEOS,
        payload: request
    }
}

export function getVideoChannel(vid) {
    const request = axios.get(`${ROOT_URL}videos/?id=${vid}&part=snippet,contentDetails,statistics&${API_KEY}`);

    return (dispatch) => {
        request.then((data) => {
            dispatch({ type: GET_VIDEO, payload: data });
            dispatch(getChannel(data.data.items[0].snippet.channelId));
            dispatch(getRelatedVideos(vid, data.data.items["0"].snippet.channelTitle));
            dispatch(getComments(vid));
        })
    }
}

export function getSuggestions(term) {
    const url = `http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${term}`;
    if(term) {
        return (dispatch) => {
            jsonp(url, (err,data)=> {
                dispatch({ type: GET_SUGGESTIONS, payload: data[1] })
            })
        }
    }else {
        return { type: GET_SUGGESTIONS, payload: [] } 
    }
}

export function resetSuggesions(){
    return {
        type: RESET_SUGGESTIONS,
    }
}


function getComments(id) {
    const request = axios.get(`${ROOT_URL}commentThreads?videoId=${id}&part=snippet,replies&${API_KEY}`);
    return {
        type: GET_COMMENTS,
        payload: request
    }
}

function getChannel(chid) {
    const request = axios.get(`${ROOT_URL}channels/?id=${chid}&part=snippet,contentDetails,statistics&${API_KEY}`);
    return {
        type: GET_CHANNEL,
        payload: request
    }
}

function getRelatedVideos(vid, term) {
    const request = axios.get(`${ROOT_URL}search?q=${term}&maxResults=15&part=snippet&relatedToVideoId=${vid}&type=video&${API_KEY}`);
    return {
        type: RELATED_VIDEOS,
        payload: request
    }
}
