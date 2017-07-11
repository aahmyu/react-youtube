import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';

import reducers from './reducers';
import Layout from './components/layout';
import VideosGallery from './components/videos-gallery';
import VideosDetails from './components/videos-details';
import SearchResults from './components/video-search-results'

const createStoreWithMiddleware = applyMiddleware(promise,thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/search/:term' component={SearchResults} />
          <Route path='/video/:id' component={VideosDetails} />
          <Route path='/' component={VideosGallery} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.mainBody'));
