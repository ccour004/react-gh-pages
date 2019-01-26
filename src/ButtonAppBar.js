import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

class ButtonAppBar extends Component {

    state = {
        left: false
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <AppBar className={classes.root} position="static" color="inherit">
                <Toolbar>
                <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left',true)} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' color="inherit" className={classes.grow}>
                    bridget erin courtney<div style={{color:'#565656','fontSize':'20px'}}>organized chaos</div>
                </Typography>
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
        <div className={classes.grid}>
        <Grid container spacing={16}
        direction="column" 
        justify="center"
        alignItems='center'
        //flexWrap="wrap"
        >
        <Grid item xs={12} sm={6}>
        <SimpleCard 
            image='http://bridgeterincourtney.com/wp-content/uploads/2017/04/gallery-6.jpg'
            date='August 6,2018'
            user='bridgeterincourtney'
            title='screen detox thoughts'
            category='Uncategorized'
            snippet='So our screen detox officially ended on Friday. But we got hit by a stomach bug so we didn’t make it until Friday. Which is'
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <SimpleCard
            date='August 6,2018'
            user='bridgeterincourtney'
            title='screen detox thoughts'
            category='uncategorized'
            snippet='So our screen detox officially ended on Friday. But we got hit by a stomach bug so we didn’t make it until Friday. Which is'
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <SimpleCard
            date='August 6,2018'
            user='bridgeterincourtney'
            title='screen detox thoughts'
            category='uncategorized'
            snippet='So our screen detox officially ended on Friday. But we got hit by a stomach bug so we didn’t make it until Friday. Which is'
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <SimpleCard
            date='August 6,2018'
            user='bridgeterincourtney'
            title='screen detox thoughts'
            category='uncategorized'
            snippet='So our screen detox officially ended on Friday. But we got hit by a stomach bug so we didn’t make it until Friday. Which is'
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <SimpleCard
            date='August 6,2018'
            user='bridgeterincourtney'
            title='screen detox thoughts'
            category='uncategorized'
            snippet='So our screen detox officially ended on Friday. But we got hit by a stomach bug so we didn’t make it until Friday. Which is'
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <SimpleCard
            date='August 6,2018'
            user='bridgeterincourtney'
            title='screen detox thoughts'
            category='uncategorized'
            snippet='So our screen detox officially ended on Friday. But we got hit by a stomach bug so we didn’t make it until Friday. Which is'
        />
        </Grid>
      </Grid>
      </div>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);