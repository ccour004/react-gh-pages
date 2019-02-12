import React from 'react';
import FullPost from './FullPost.js';

class PreviewView extends React.Component {
    render(){
        const { data } = this.props;
        return <FullPost post={data}/>
    }
}

export default PreviewView;