import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { HashRouter/*BrowserRouter*/ as Router, Route, Link} from "react-router-dom";
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Grid from '@material-ui/core/Grid';

import SignIn from './SignIn.js';
import SimpleCard from './SimpleCard.js';
import FullScreenDialog from './FullScreenDialog.js';

const styles = {
  root: {
    flexGrow: 1,
    padding: 0
  },
  main_navigation: {
    display: 'block',
    color: '#333333',
    padding: '21px 0',
    position: 'relative',
    'text-decoration': 'none',
    'font-weight': 'bold',
    transition: 'all .3s ease',
    'z-index': 99,
    'text-transform': 'uppercase',
    'font-size': '16px'
  },
  grid:{
    padding: '21px'
  },
  grow: {
    flexGrow: 1,
    color: '#292030',
    'text-align': 'center',
    'margin-bottom': '5px',
    'font-family': ['Oswald','sans-serif'],
    'font-size': '2em',
    'font-weight': 'bold'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #292030;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

class ButtonAppBar extends Component {
    state = {
        left: false,
        posts: [
            {
            path:'/screen_detox_thoughts/',
            image:'http://bridgeterincourtney.com/wp-content/uploads/2017/04/gallery-6.jpg',
            date:'August 6,2018',
            user:'bridgeterincourtney',
            title:'screen detox thoughts',
            category:'Uncategorized',
            snippet:'So our screen detox officially ended on Friday. But we got hit by a stomach bug so we didn’t make it until Friday. Which is',
            fullPost:<div>FULL POST TEXT HERE!</div>
            }
        ]
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    handlePublish = (post) =>{
        this.setState({posts: [...this.state.posts,post]})
    }

    renderPostList = () =>{
        const { classes } = this.props;
        return (
            <div className={classes.grid}>
            <Grid container spacing={16}
            direction="column" 
            justify="center"
            alignItems='center'
            //flexWrap="wrap"
            >
           { this.state.posts.map(function(post){
            return (
                    <Grid item xs={12} sm={6}>
                    <SimpleCard {...classes}
                        path={post.path}
                        image={post.image}
                        date={post.date}
                        user={post.user}
                        title={post.title}
                        category={post.category}
                        snippet={post.snippet}
                        fullPost={post.fullPost}
                    />
                    </Grid>)})
           }
           </Grid></div>
        );
    }

    renderRoutes = ()=>{
        return (
            <div>
            {this.state.posts.map(function(post){return (<Route path={post.path} exact render={()=>post.fullPost}/>)})}
            </div>
        )
    }

    render(){
        const { classes } = this.props;
        return ( 
            <Router>
                <div className={classes.root}>
                <AppBar className={classes.root} position="static" color="inherit">
                    <Toolbar>
                    <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left',true)} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' color="inherit" className={classes.grow}>
                        <StyledLink to='/'>
                        bridget erin courtney<div style={{color:'#6B7070','fontSize':'20px',fontWeight:'lighter'}}>organized chaos</div>
                        </StyledLink>
                    </Typography>
                    <FullScreenDialog onPublish={this.handlePublish}/>
                    &nbsp;&nbsp;
                    <SignIn/>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                >
                <h5 className={classes.main_navigation}>Home<br/>Gallery<br/>Shop</h5>
                </SwipeableDrawer>
                <div>
                <Route path='/' exact render={(props)=>this.renderPostList()}/>
                {this.renderRoutes()}
                </div>
                </div>
            </Router>
        );
    }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);