import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that alerts if you click outside of it
 */
class OutsideAlerter extends Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    static propTypes = {
        children: PropTypes.node.isRequired
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    // remove all events to avoid memory leaks
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.reset();
        }
    }

    render() {
        return (
            <div ref={this.setWrapperRef}>
                {this.props.children}
            </div>
        );
    }
}

export default OutsideAlerter;
