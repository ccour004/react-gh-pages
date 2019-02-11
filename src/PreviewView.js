import React from 'react';
import FullPost from './FullPost.js';

class PreviewView extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: this.props.data};
      }
    render(){
        const { data } = this.state;
        return <FullPost post={data}/>
    }
}

export default PreviewView;