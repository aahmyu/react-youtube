import React, { Component } from 'react';
import Linkify from 'react-linkify';

class VideoDescription extends Component {
    constructor(props) {
        super(props);

        this.state = { expanded: false }
    }

    parseDesc(str) {
        const first = str.indexOf('\n\n');
        const second = str.indexOf('\n\n', first + 1);

        const handleClick = () => {
            const expanded = this.state.expanded;
            this.setState({ expanded: !expanded });
        }

        if (second !== -1) {
            if (!this.state.expanded) {
                return (
                    <div>
                        <div className='desc-body'>
                            {str.slice(0, second)}
                        </div>
                        <hr />
                        <div className='toggle-desc'>
                            <span onClick={handleClick} href="#">Show more</span>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <div className='desc-body'>
                            {str}
                        </div>
                        <hr />
                        <div className='toggle-desc'>
                            <span onClick={handleClick} href="#">Show less</span>
                        </div>
                    </div>
                )
            }

        } else {
            return <div style={{ marginBottom: '15px' }} >{str}</div>
        }

    }

    parseDate(d) {
        const months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const split = d.split('-');
        const day = split[2].split('T')[0];
        return `${months[split[1] - 1]} ${day}, ${split[0]}`;
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='videos-desc col-lg-12 col-xs-12'>
                        <div className='publish-date'>
                            Published at {this.parseDate(this.props.video.snippet.publishedAt)}
                        </div>
                        <div className='video-description'>
                            <Linkify properties={{ target: '_blank', className: 'desc-url' }} >{this.parseDesc(this.props.video.snippet.description)}</Linkify>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default VideoDescription;