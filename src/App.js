import React, { Component } from 'react';
import './App.css';

import ButtonAppBar from './ButtonAppBar.js';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    background: 'lightgray'
  }
};

class App extends Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    document.body.style.backgroundColor = 'lightgray';
    const {classes} = this.props;
    return (
      <div className={classes.root}>
      <ButtonAppBar/>
      </div>
    );
  }
}

export default withStyles(styles)(App);