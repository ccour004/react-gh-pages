import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { Link } from "react-router-dom";

import DateIcon from '@material-ui/icons/DateRange';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const styles = {
    media: {
        height: 5,
        paddingTop: '20%'//'26.25%'
      },
  card: {
    //minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
  pos: {
    marginBottom: 12,
    'text-align': 'center',
    'font-family': ['Oswald','sans-serif']
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

  render(){
    const { classes } = this.props;
    console.log(this.props.isAdmin);
    return (<div>
        <Paper className={classes.paper} style={{maxWidth: 415}}>
        {this.props.image?<CardMedia className={classes.media} image={this.props.image}/>:<div/>}
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.header} color="textSecondary" gutterBottom>
          <DateIcon/>{this.props.date} &nbsp;&nbsp; <PermIdentityIcon/>{this.props.user}
          </Typography>
          <Typography className={classes.title} variant="h5" component="h2">
            {this.props.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {this.props.category}
          </Typography>
          <Typography component="p" style={{justifyContent: 'center'}}>
            {this.props.snippet}
          </Typography>
        </CardContent>
        <CardActions className={classes.title} style={{justifyContent: 'center'}}>
          <Button variant="outlined" component={Link} to={this.props.path} color="secondary" size="medium">Read More</Button>
        </CardActions>
      </Card>
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
      </Paper>
              <div>{this.props.isAdmin?<Button variant="contained" color="primary" onClick={()=>{this.handleAlertOpen()}}>Delete Post</Button>:<div/>}</div></div>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);