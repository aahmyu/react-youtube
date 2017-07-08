import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { searchVideos, getVideoChannel } from '../actions/index';
import { Link } from 'react-router-dom';


class VideosGallery extends Component {

    componentDidMount() {
        this.props.searchVideos('');
    }

    renderVideoItem(video) {
        const id = video.id.videoId;
        if (id) {
            const handleClick = () => {
                this.props.getVideoChannel(id);
            }
            return (
                <div className="video-thumbs col-lg-4 col-sm-6" key={video.etag}>
                    <figure>
                        <Link to={`/video/${id}`}>
                            <img onClick={handleClick} className='thumbnail' src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                        </Link>
                        <Link to={`/video/${id}`}><strong>{video.snippet.title}</strong></Link>
                    </figure>
                </div>
            )
        }
    }

    render() {
        const { videos } = this.props;
        return (
            <div className='row'>
                {_.map(videos, this.renderVideoItem.bind(this))}
            </div>
        )

    }
}

function mapStateToProps({ videos, term }) {
    return { videos, term };
}

export default connect(mapStateToProps, { searchVideos, getVideoChannel })(VideosGallery)