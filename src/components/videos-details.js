import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVideoChannel } from '../actions/index';
import VideosChannelInfo from './videos-channel-info';
import VideoDescription from './videos-desc';
import RelatedVideosPanel from './videos-related-panel';
import CommentsSection from './comments-section';

class VideosDetails extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getVideoChannel(id);
    }

    parseNumbers(n) {
        return n.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    }

    parseLikesBar(likes, dislikes) {
        if (!likes) {
            return 0;
        } else {
            const increase = Number(likes) - Number(dislikes);
            return Math.round((increase / likes) * 100);
        }
    }

    render() {
        if (!this.props.video) { return <div>Loading...</div> }

        if (!this.props.currentChannel) { return <div>Loading...</div> }

        if (!this.props.video.statistics) { return <div>Loading...</div> }

        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='videos-details col-md-8'>
                            <div className='video-frame'>
                                <div className="embed-responsive embed-responsive-16by9">
                                    <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${this.props.video.id}?autoplay=1&showinfo=0&modestbranding=1`} frameBorder='0' allowFullScreen></iframe>
                                </div>
                            </div>
                            <VideosChannelInfo
                                video={this.props.video}
                                currentChannel={this.props.currentChannel}
                                parseNumbers={this.parseNumbers}
                                parseLikesBar={this.parseLikesBar} />
                            <VideoDescription video={this.props.video} />
                            <CommentsSection comments={this.props.comments} video={this.props.video} />
                        </div>

                        <div className='side-list col-md-4'>
                            <RelatedVideosPanel />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ videos, currentChannel, comments }, ownProps) {
    const id = ownProps.match.params.id;
    return {
        video: videos[id],
        currentChannel,
        comments
    }
}

export default connect(mapStateToProps, { getVideoChannel })(VideosDetails);