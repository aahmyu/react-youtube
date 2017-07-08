import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import videosReducer from './reducer-videos';
import channelReducer from './reducer-channel';
import commentsReducer from './reducer-comments';
import relatedVideos from './reducer-related-videos';
import suggestions from './reducer-suggestions';

const rootReducer = combineReducers({
  videos: videosReducer,
  currentChannel: channelReducer,
  comments: commentsReducer,
  relatedVideos,
  suggestions,
  form: formReducer
});

export default rootReducer;
