import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';

import App from './components/app';
import reducers from './reducers';
import VideosDetails from './components/videos-details';
import SearchResults from './components/video-search-results'

const createStoreWithMiddleware = applyMiddleware(promise,thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <BrowserRouter>
      <Switch>
        <Route path='/search/:term' component={SearchResults} />
        <Route path='/video/:id' component={VideosDetails} />
        <Route path='/' component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.mainBody'));
