import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { HashRouter/*BrowserRouter*/ as Router, Route, Link} from "react-router-dom";
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FullScreenDialog from './FullScreenDialog.js';
import FullPost from './FullPost.js';

import ImageGridList from './ImageGridList.js';

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
    flexGrow: 1,
    padding: '40px 0',
    position: 'relative',
    height: /*120*/220,
    'text-decoration': 'none',
    'font-weight': 'bold',
    transition: 'all .3s ease',
    'z-index': 99,
    'text-transform': 'uppercase',
    'font-size': '16px'
  },
  grid:{
    flexGrow: 1,
    width: '100%',
    padding: '21px',
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
  category:{
    color: '#003366'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  card: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    paddingBottom: 65
    //maxWidth: 1000,
  },
  media: {
    height: 140,
  },
  mediaText: {
      'text-align':'center',
      'font-size': '4em',
      'font-family': ['Oswald','sans-serif'],
      paddingTop: 128,
      'font-weight': 'bold'
  },
  gridList: {
    width: '100%',
    height: '100%',
    'overflow-x': 'hidden',
    'overflow-y': 'auto',
  }
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
        open: false,
        alert: false,
        data: this.get_canned_data,
        isAdmin: false,
        user: null,
        category: ['recipes','finance','life','organization','wellness'],
        externalPosts: [],
        provider: new firebase.auth.GoogleAuthProvider()
    };

    get_canned_data = ()=>{
        return {'title':'(Title '+Math.random().toString(36).substring(7)+')','date':'(Date)','user':'(User)',
        'category':'wellness','html':'(Full Post)','image':'(Image)'};}

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
        this.setState({open: false});
        post.path = this.sanitizePath(post.path);
        this.state.db.collection('posts').doc(post._id).set(post).then(function() {
            console.log("Post metadata successfully added!");
        }).catch(function(error) {
            console.error("Error adding post metadata: ", error);
        });
        this.state.db.collection('full_posts').doc(post._id).set({'html':post.html,'title':post.title}).then(function() {
            console.log("Post data successfully added!");
        }).catch(function(error) {
            console.error("Error adding post: ", error);
        });
    }

    handleOpen = () => this.setState({data: this.get_canned_data(),open: true});
    handleEdit = (val) =>this.setState({data: this.state.externalPosts[val],open: true});
    handleClose = () =>this.setState({open: false});
    handleAlertOpen = (val) =>this.setState({data: this.state.externalPosts[val],alert: true});
    handleAlertClose = () =>this.setState({alert: false});

    handleDelete = (post) =>{
        this.setState({alert:false});
        console.log("POST FOR DELETION WITH ID: "+post);
        if(post !== undefined)
        this.state.db.collection("posts").doc(post).delete().then(function() {
            console.log("Post metadata successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing Post metadata: ", error);
        });
        this.state.db.collection("full_posts").doc(post).delete().then(function() {
            console.log("Post data successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing Post data: ", error);
        });
    }

    renderCategoryButton = (category,text) => {
        const { classes } = this.props;
        return(
            <Button variant={this.state.category.includes(category)?'contained':'outlined'}
                 className={classes.category} onClick={()=>{this.toggleCategory(category)}}>{text}</Button>
        )
    }

    toggleCategory = (category) =>{
       if(this.state.category.includes(category)){
            this.setState({category: this.state.category.filter(function(val) { 
                return val !== category
            })});
       }else
            this.setState(previousState => ({
                category: [...previousState.category, category]
                }));
    }

    renderCategories = () =>{
        const { classes } = this.props;
        return(<div>
                    <Grid container spacing={8} justify='center' style={{paddingBottom: 20}}>
                        <Grid item> {this.renderCategoryButton('recipes','Recipes')}</Grid>
                        <Grid item> {this.renderCategoryButton('finance','Finance')}</Grid>
                        <Grid item> {this.renderCategoryButton('life','Life\'s Messy')}</Grid>
                        <Grid item> {this.renderCategoryButton('organization','Organization')}</Grid>
                        <Grid item> {this.renderCategoryButton('wellness','Wellness')}</Grid>
                        <Grid item> <Button variant='outlined' color='secondary'>Our Favorites</Button></Grid>
                    </Grid>
                </div>
        );
    }

    renderLogin = () =>{
        return(
            this.state.user === null?
                <Button variant="contained" color='primary' size='small' style={{position:'absolute',left:5,top:5,textSize:'1em'}} onClick={this.handleSignIn}>
                Login
                </Button>:
                <div style={{position:'absolute',left:5,top:5}}><Button
                variant="contained" size='small'
                onClick={this.handleSignOut}>{this.state.user.displayName}</Button>
                {this.state.user !== null && this.state.isAdmin?<Button variant="contained" size='small' color="primary" onClick={this.handleOpen}>
          Add Post
        </Button>:<div/>}</div>
        );
    }

    renderTopBar = () =>{
        const { classes } = this.props;
        return(
            <AppBar className={classes.main_navigation} position="static" color="inherit" style={{height:'0%'}}>
            {this.renderLogin()} 
                <Toolbar>
                    <Grid container direction='column' spacing={8}>
                        <Grid item xs={12}>
                            <Typography variant='h6' color="inherit" className={classes.grow}>
                                <StyledLink to='/'>
                                bridget erin courtney<div style={{color:'#6B7070','fontSize':'20px',fontWeight:'lighter'}}>PLAN for a better life</div>
                                </StyledLink>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {this.renderCategories()}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );       
    }

    renderPostList = () =>{
        return (
            <React.Fragment><React.Fragment>
           {this.state.open?<FullScreenDialog startOpen 
                open={this.state.open}
                data={this.state.data}
                onClose={()=>this.setState({open:false})}
                onPublish={this.handlePublish}/>:(null)}
                <Dialog
              open={this.state.alert}
              TransitionComponent={this.Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"DELETE POST??"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you absolutely sure that you want to delete this post? This will permanently remove it!!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleAlertClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={()=>this.handleDelete(this.state.data._id)} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            </React.Fragment>
            <div style={{paddingLeft: '10px',paddingTop: '10px'}}>
            <ImageGridList 
                onEdit={(val)=>this.handleEdit(val)}
                tileData={this.state.externalPosts} 
                category={this.state.category}
                isAdmin={this.state.isAdmin}
                onDelete={this.handleDelete}
                onAlert={this.handleAlertOpen}
            />
          </div></React.Fragment>
        );
    }

    renderRoutes = ()=>{
        const db = this.state.db;
        return ((
            <div>
            {
                this.state.externalPosts!==undefined?this.state.externalPosts.map(
                function(post){return (<Route key={post._id+'_route'} path={post.path} exact render={()=><FullPost post={post} db={db}/>}/>)}):(null)
            }
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
                {this.renderTopBar()}
                <Route path='/' exact render={()=>this.renderPostList()}/>
                {this.renderRoutes()}
                </div>
            </Router>
        );
    }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);