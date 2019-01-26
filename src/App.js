import React, { Component } from 'react';
import './App.css';

import ButtonAppBar from './ButtonAppBar.js';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    background: '#595674'
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
    document.body.style.backgroundColor = '#595674';
    const {classes} = this.props;
    return (
      <div className={classes.root}>
      <ButtonAppBar/>
      </div>
    );
  }
}

export default withStyles(styles)(App);