import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { searchVideos, getSuggestions, resetSuggesions } from '../actions/index';
import SuggestionBox from './suggestion-box';


class SearchBar extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    renderFields(field) {
        return (
            <div className='holder'>
                <SuggestionBox field={field} />
            </div>
        )
    }

    submit(values) {
        const term = values.searchInput;
        this.props.searchVideos(term);
        this.props.resetSuggesions();
        this.props.reset();
        this.props.history.push(`/search/${term}`);
    }

    // get the suggestions list
    onChange(e, value) {
        this.props.getSuggestions(value);
    }


    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form className='navbar-form' onSubmit={handleSubmit(this.submit.bind(this))}>
                    <Field
                        name='searchInput'
                        component={this.renderFields}
                        onChange={this.onChange.bind(this)}
                    />
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.searchInput) {
        errors.searchInput = 'Please Enter Something!';
    }
    return errors;
}


const SearchBarWithRouter = withRouter(SearchBar);

export default reduxForm({
    form: 'searchForm',
    validate
})(
    connect(null, { searchVideos, getSuggestions, resetSuggesions })(SearchBarWithRouter)
    );