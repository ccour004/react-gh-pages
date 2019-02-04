import React from 'react';
import PropTypes from 'prop-types';
import FullPost from './FullPost.js';

class PreviewView extends React.Component {
    render(){
        return <FullPost post={this.props.data}/>
    }
}

export default PreviewView;