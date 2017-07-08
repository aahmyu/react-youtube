import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { getVideoChannel } from '../actions/index';

class RelatedVideosPanel extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    renderList(video){
        const id = video.id.videoId;
        const handleClick = ()=>{
            this.props.getVideoChannel(id);
        }

        return(
            <Link onClick={handleClick} key={id} to={`/video/${id}`}>
                <div className='media'>
                    <div className='media-left'>
                        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                    </div>
                    <div className='media-body'>
                        {video.snippet.title}
                    </div>
                    
                </div>
            </Link>
        )
    }
    
    render(){
        return (
            <ul className='list-videos-ul'>
                { _.map(this.props.relatedVideos, this.renderList.bind(this)) }
            </ul>
        )
    }

}


function mapStateToProps({relatedVideos}){
    return { relatedVideos }
}

const RelatedVideosWithRouter = withRouter(RelatedVideosPanel);

export default connect(mapStateToProps, { getVideoChannel })(RelatedVideosWithRouter);