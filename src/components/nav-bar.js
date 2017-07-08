import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './search-bar';

class NavBar extends Component {
    render(){
        return (
            <nav className='navbar navbar-default navbar-fixed-top'>
                <div className='container'>
                    <div className='navbar-header'>
                        <Link className="navbar-brand" to="/">TubeVids</Link>
                        <SearchBar />
                    </div>
                    
                </div>
            </nav>
        )
    }
}

export default NavBar;