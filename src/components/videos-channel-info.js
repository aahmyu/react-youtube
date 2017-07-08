import React from 'react';

const VideosChannelInfo = (props) => {
    if (!props.video.statistics) {
        return <div></div>
    }
    const parseSubCount = (n) => {
        if (n.length > 3) {
            return `${n.substr(0, 3)}K`;
        }
    }

    const shareDiv = () => {
        return (
            <div className='share-div col-xs-6'>
                <i className="zmdi zmdi-plus"></i>
                <span>Add to</span>
                <i className="zmdi zmdi-share"></i>
                <span>Share</span>
                <i className="zmdi zmdi-more"></i>
                <span>More</span>
            </div>
        )
    }

    const likeCountDiv = () => {
        return (
            <div className='likes-counter col-xs-6'>
                <i className="zmdi zmdi-thumb-up"></i>
                <span>{props.parseNumbers(props.video.statistics.likeCount)}</span>
                <i className="zmdi zmdi-thumb-down"></i>
                <span>{props.parseNumbers(props.video.statistics.dislikeCount)}</span>
            </div>
        )
    }

    const likesBarWidth = props.parseLikesBar(props.video.statistics.likeCount, props.video.statistics.dislikeCount);
    return (
        <div className='titles-media-div container-fluid'>
            <div className='row'>
                <div className='videos-infos col-md-12'>
                    <div className='video-title'>
                        {props.video.snippet.title}
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='channel-infos media col-md-12'>
                    <div className='media-left media-bottom'>
                        <img className='media-object' src={props.currentChannel.snippet.thumbnails.default.url} alt={props.currentChannel.snippet.title} />
                    </div>
                    <div className='media-body'>
                        <p className='media-heading'>{props.video.snippet.channelTitle}</p>
                        <div className='row'>
                            <div className='col-lg-8 col-xs-6'>
                                <div className='sub-btn-label'>
                                    <button className='subscribe-btn'>
                                        <i className="zmdi zmdi-youtube-play"></i> <span> Subsribe</span>
                                    </button>
                                    <button className='subscribe-label'>
                                        {parseSubCount(props.currentChannel.statistics.subscriberCount)}
                                    </button>
                                </div>
                            </div>
                            <div className='col-lg-4 col-xs-6'>
                                <div className='likes-dislikes'>
                                    <div className='views-count'>
                                        {props.parseNumbers(props.video.statistics.viewCount)} <span className='view-word'>views</span>
                                    </div>
                                    <div className='likes-bar progress pull-right'>
                                        <div className="progress-bar progress-bar-primary" style={{ width: likesBarWidth + '%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className='share-bar row'>
                <div>
                    {shareDiv()}
                </div>
                <div>
                    {likeCountDiv()}
                </div>
            </div>
        </div>

    )
}

export default VideosChannelInfo;
