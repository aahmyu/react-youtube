import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchVideos } from '../actions/index';
import NavBar from './nav-bar';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class SearchResults extends Component {

    componentDidMount(){
        const term = this.props.match.params.term;
        this.props.searchVideos(term);
    }

    renderResults(video){
        if(video.id.videoId){
            return (
                <div className='row' key={video.etag}>
                    <div className='col-md-5 col-xs-12'>
                        <Link to={`/video/${video.id.videoId}`}>
                            <img className='img-responsive media-object' src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                        </Link>
                    </div>
                    <div className='col-md-7 col-xs-12'>
                        <Link to={`/video/${video.id.videoId}`}>
                            <p>{video.snippet.title}</p>
                        </Link>
                        <p>{video.snippet.description}</p>
                    </div>
                </div>
            )
        }
    }

    render(){
        // if(!this.props.videos) return <div>Loading...</div>;
        return (
            <div>
                <NavBar />
                <div className='search-results container'>
                    { _.map(this.props.videos, this.renderResults ) }
                </div>
            </div>
        )
    }

}

function mapStateToProps( { videos } ){
    return { videos };
}

export default connect(mapStateToProps, { searchVideos })(SearchResults);
