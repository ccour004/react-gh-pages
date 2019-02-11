import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { Link } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import FullScreenDialog from './FullScreenDialog.js';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    marginTop: 10/*20*/,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    //backgroundColor: theme.palette.background.paper,
  },
  tile:{
    //height: '20%'
  },
  bannertile:{
    //height: '20%'
  },
  media: {
    height: 250,
  },
  mediaText: {
    'text-align':'center',
    'font-size': '3em',
    'font-family': ['Oswald','sans-serif'],
   // paddingLeft: 5,paddingRight: 5
  },
  bannerCard: {
    marginTop: 10/*20*/,
  },
  bannerMedia: {
    height: 250,
  },
  bannerMediaText: {
      'text-align':'center',
      'font-size': '4em',
      'font-family': ['Oswald','sans-serif'],
     // paddingLeft: 5,paddingRight: 5
  },
  header: {
    fontSize: 14,
    'font-family': ['Oswald','sans-serif'],
    'text-align': 'center',
  },
  title: {
    'font-size': '36px',
    color: '#1a1a1a',
    'margin-bottom': 0,
    'line-height': 1.5,
    'text-align': 'center',
    'font-family': ['Oswald','sans-serif']
  },
  titleBar: {
   color: 'black',
   background: 'white'
   /* background:
      'linear-gradient(to bottom, rgba(255,255,255,255) 0%, ' +
      'rgba(255,255,255,255) 70%, rgba(255,255,255,255) 100%)',*/
  },
};

class SimpleCard extends React.Component{
  state = {
    alert_open: false
  };

  Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  handleAlertOpen = () => {
    this.setState({ alert_open: true });
  };

  handleAlertClose = () => {
    this.setState({ alert_open: false });
  };

  handleEdit = () =>{
    this.setState({edit: true});
  }

  renderContent = (isBanner) =>{
    const { classes } = this.props;
    return(
        <GridListTile key={this.props.image} cols={isBanner?2:1} rows={isBanner?2:1} component={Link} to={this.props.path} className={isBanner?classes.bannertile:classes.tile}>
          <img src={this.props.image} alt={this.props.title} />
          <GridListTileBar
              title={this.props.title}
              titlePosition="bottom"
              actionPosition="left"
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
        </GridListTile>
        /*<Card className={classes.card}>
        <CardActionArea component={Link} to={this.props.path}>
          {this.props.image?<CardMedia
            className={isBanner?classes.bannerMedia:classes.media}
            image={this.props.image}
            title={this.props.title}
          />:<div/>}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className={isBanner?classes.bannerMediaText:classes.mediaText}>
            {this.props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
          </Card>*/
    );
  }

  render(){
    console.log(this.props.isAdmin);
    if(this.state.edit)return <FullScreenDialog startOpen onCancel={()=>this.setState({edit:false})} data={this.props} onPublish={this.props.handlePublish}/>;
    return (<div>
          {this.renderContent(this.props.isBanner)}
          <Dialog
              open={this.state.alert_open}
              TransitionComponent={this.Transition}
              keepMounted
              onClose={this.handleAlertClose}
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
                <Button onClick={()=>this.props.onDelete(this.props._id)} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          <div>{this.props.isAdmin?<div><Button variant="contained" color="primary" onClick={()=>{this.handleAlertOpen()}}>Delete Post</Button>
                <Button variant="contained" color="secondary" onClick={()=>{this.handleEdit()}}>Edit Post</Button></div>:<div/>}</div></div>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);