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

function SimpleCard(props) {
  const { classes } = props;
  
  return (
      <Paper className={classes.paper} style={{maxWidth: 415}}>
      {props.image?<CardMedia className={classes.media} image={props.image}/>:<div/>}
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.header} color="textSecondary" gutterBottom>
        <DateIcon/>{props.date} &nbsp;&nbsp; <PermIdentityIcon/>{props.user}
        </Typography>
        <Typography className={classes.title} variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.category}
        </Typography>
        <Typography component="p" style={{justifyContent: 'center'}}>
          {props.snippet}
        </Typography>
      </CardContent>
      <CardActions className={classes.title} style={{justifyContent: 'center'}}>
        <Button variant="outlined" component={Link} to={props.path} color="secondary" size="medium">Read More</Button>
      </CardActions>
    </Card>
    </Paper>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);