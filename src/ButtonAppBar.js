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

import SimpleCard from './SimpleCard.js';
import FullScreenDialog from './FullScreenDialog.js';

import Button from '@material-ui/core/Button';

//CLOUD FIRESTORE
import { config } from './biddy-blog-firebase-adminsdk-qtzb6-5536d7a1f7.js';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

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
        isAdmin: false,
        user: null,
        externalPosts: [],
        provider: new firebase.auth.GoogleAuthProvider()
    };

    checkIfAdmin= (uid,db)=>{
        db.collection('admins').onSnapshot((querySnapShot)=>{
            querySnapShot.forEach((result) => {
                if(result.get('uid') === uid) this.setState({isAdmin: true});
            });
        });
        this.setState({isAdmin: false});
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    sanitizePath(path){
        path = encodeURI(path);
        path = path.replace(new RegExp('[\\)\\(\\{\\}\\[\\]]','g'),'_');
        return path;
    }

    handlePublish = (post) =>{
        post.path = this.sanitizePath(post.path);
        post._id = Math.random().toString(36).substring(7);
        this.state.db.collection('posts').doc(post._id).set(post).then(function() {
            console.log("Document successfully added!");
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
        //this.setState({posts: [...this.state.posts,post]})
    }

    handleDelete = (post) =>{
        //alert("(NEED TO IMPLEMENT: delete post data from Firebase collection, or fail if not authorized user)");
        console.log("DOCUMENT FOR DELETION WITH TITLE: "+post);
        if(post !== undefined)
        this.state.db.collection("posts").doc(post).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
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
           { this.state.externalPosts!==undefined?this.state.externalPosts.map((post)=>{
            return (
                    <Grid key={post._id} item xs={12} sm={6}>
                    <SimpleCard {...classes}
                        isAdmin={this.state.isAdmin}
                        _id={post._id}
                        path={post.path}
                        image={post.image}
                        date={post.date}
                        user={post.user}
                        title={post.title}
                        category={post.category}
                        snippet={post.snippet}
                        fullPost={post.fullPost}
                        onDelete={this.handleDelete}
                    />
                    </Grid>)
                })
                :
                <div/>
           }
           </Grid></div>
        );
    }

    renderRoutes = ()=>{
        return ((
            <div>
            {
                this.state.externalPosts!==undefined?this.state.externalPosts.map(
                    function(post){return (<Route key={post._id+'_route'} path={post.path} exact render={()=>
                        <div dangerouslySetInnerHTML={{__html: post.fullPost}}/>}/>)}):<div/>
            }
            {/*{this.state.posts.map(function(post){return (<Route key={post.path} path={post.path} exact render={()=>post.fullPost}/>)})}*/}
            </div>
        ))
    }

    componentDidMount = ()=>{
        //Initialize Firebase DB.
        firebase.initializeApp(config);
        var db = firebase.firestore();
        this.setState({db});

        //Get list of posts.
        db.collection('posts').onSnapshot((querySnapShot)=>{
            this.setState({externalPosts: []});
            querySnapShot.forEach((result) => {
                this.setState({externalPosts:[...this.state.externalPosts,result.data()]});
            });
        });

       //Set listener for when authentication state changes.
       firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
              // User is signed in.
              this.setState({user});
              this.checkIfAdmin(user.uid,db);

              //TODO: remove this line to prevent showing uid!
              console.log(this.state.user.uid);
            } else {
              // User is signed out.
              this.setState({user:null});
            }
          });
    }

    handleSignIn = () =>{firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());}

    handleSignOut = () =>{firebase.auth().signOut(); this.setState({isAdmin:false});}

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
                    {this.state.user !== null && this.state.isAdmin?(<FullScreenDialog onPublish={this.handlePublish}/>):<div/>}
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                >
                <h5 className={classes.main_navigation}>
                    {this.state.user === null?
                        <Button variant="contained" onClick={this.handleSignIn}>
                        Login
                        </Button>:<div style={{outlineStyle: 'solid',outlineWidth:'1px'}}><h5>{this.state.user.displayName}</h5><Button
                        variant="contained"
                        onClick={this.handleSignOut}>Logout</Button></div>}
                    {/*Home<br/>Gallery<br/>Shop*/}
                </h5>
                </SwipeableDrawer>
                <div>
                <Route path='/' exact render={()=>this.renderPostList()}/>
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