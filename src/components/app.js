import React, { Component } from 'react';

import NavBar from './nav-bar';
import VideosGallery from './videos-gallery';

export default class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div className='container'>
            <VideosGallery />
        </div>
      </div>
    );
  }
}
