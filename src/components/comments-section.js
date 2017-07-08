import React, { Component } from 'react';
import _ from 'lodash';

class CommentsSection extends Component {

    constructor(props){
        super(props);
        this.state = { expanded: false }
    }

    showMoreLessHandleClick(e){
        const expanded = this.state.expanded;
        this.setState( { expanded : !expanded });
    }

    parseComments(comment){
        let splitted = comment.split('\n');
        const length = splitted.length;
        if( length > 4 ){
            if(!this.state.expanded){
                return (
                    <div>
                        <p>{splitted.slice(0,4).join('\n')}</p>
                        <span className='showMoreLess' onClick={this.showMoreLessHandleClick.bind(this)}>Read more</span>
                    </div>
                )
            }else {
                return (
                    <div>
                        <p>{comment}</p>
                        <span className='showMoreLess' onClick={this.showMoreLessHandleClick.bind(this)}>Read less</span>
                    </div>
                )
            }
        }else {
            return comment;
        }
    }

    renderComments(comment) {
        return (
            <div className='media' key={comment.etag}>
                <div className='img media-left media-top'>
                    <img className='media-object' src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl.replace('s28', 's48')} alt={comment.snippet.topLevelComment.snippet.authorDisplayName} />
                </div>
                <div className='media-body'>
                    <div className='media-heading'>
                        <a href="">{comment.snippet.topLevelComment.snippet.authorDisplayName}</a>
                    </div>
                    <div>
                        { this.parseComments(comment.snippet.topLevelComment.snippet.textOriginal) }
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.comments.length === 0 ) { return <div>Loading...</div> }
        // console.log(this.props)
        return (
            <div className='comments-section container-fluid'>
                <div className='comments-header'>
                    <span>COMMENTS •</span> <span>{this.props.video.statistics.commentCount}</span>
                </div>
                <div className='row'>
                    <div className='col-xs-2 col-md-1'>
                        <img src="//s.ytimg.com/yts/img/avatar_48-vfllY0UTT.png" alt="user-icon" />
                    </div>
                    <div className='col-xs-10 col-md-11'>
                        <textarea className='comments-text-area' name="" id="" cols="30" rows="2" placeholder='Add a public comment...' ></textarea>
                    </div>
                </div>
                <hr />
                <div className='users-comments-section'>
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Top comments <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a href="#">Top comments</a></li>
                            <li><a href="#">Newest first</a></li>
                        </ul>
                    </div>
                    <div className='user-comments-comments'>
                        {_.map(this.props.comments, this.renderComments.bind(this))}
                    </div>
                </div>
            </div>
        )
    }
}


export default CommentsSection;