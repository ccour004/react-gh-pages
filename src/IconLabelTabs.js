import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CreateIcon from '@material-ui/icons/Create';
import BuildIcon from '@material-ui/icons/Build';
import PageViewIcon from '@material-ui/icons/Pageview';
import CodeIcon from '@material-ui/icons/Code';

const styles = {
  root: {
    flexGrow: 1,
    //maxWidth: 700,
  },
};

class IconLabelTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.value);

    return (
      <Paper square className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<CreateIcon />} label="INFO" />
          <Tab icon={<BuildIcon />} label="TEXT" />
          <Tab icon={<PageViewIcon />} label="PREVIEW" />
          <Tab icon={<CodeIcon />} label="CODE" />
        </Tabs>
        {this.props.views[this.state.value]}
      </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelTabs);