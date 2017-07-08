import React , { Component } from 'react';
import { connect } from 'react-redux';
import { searchVideos, resetSuggesions } from '../actions/index';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import _ from 'lodash';
import OutsideAlerter from './watch-click-outside';

class SuggestionBox extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    renderSuggestions(item,i){
        return (
            <li onClick={ this.onClick.bind(this) } key={`${item}-${i}`}>
                { item }
            </li>
        )
    }

    onClick(e){
        this.props.searchVideos(e.target.textContent);
        this.props.history.push(`/search/${e.target.textContent}`);
        this.props.resetSuggesions();  // empty suggestions array to remove the suggestions
    }


    render(){
        return (
            <OutsideAlerter reset={this.props.resetSuggesions}>
                <div className='input-group'>
                    <input { ...this.props.field.input} className='form-control' type="text" placeholder="Search" autoComplete='off' />
                    <span className='form-group-btn'>
                        <button className='btn btn-default' type='submit'><i className="zmdi zmdi-search"></i></button>
                    </span>
                </div>
                
                <ul className='dropdown' style={{ display: this.props.suggestions.length > 0 ? 'block' : 'none' } }>
                    { _.map(this.props.suggestions, this.renderSuggestions.bind(this)) }
                </ul>
            </OutsideAlerter>
        )
    }
}

const boxWithRouter = withRouter(SuggestionBox);

function mapStateToProps({suggestions}) {
    return { suggestions }
}

export default connect(mapStateToProps, { searchVideos, resetSuggesions })(boxWithRouter);