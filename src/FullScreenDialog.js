import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import { DatePicker } from 'material-ui-pickers';

const styles = theme=>({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePublish = () =>{
    this.setState({ open: false });
    this.props.onPublish(            {
        path:'/'+this.title.value.toLowerCase().replace(new RegExp(' ', 'g'),'_')+'/',
       // image:'http://bridgeterincourtney.com/wp-content/uploads/2017/04/gallery-6.jpg',
        date:this.date.value,
        user:this.user.value,
        title:this.title.value,
        category:this.category.value,
       // snippet:'So our screen detox officially ended on Friday. But we got hit by a stomach bug so we didn’t make it until Friday. Which is',
        fullPost:<div>FULL POST TEXT HERE!</div>
        });     
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Post
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Post details
              </Typography>
              <Button color="inherit" onClick={this.handlePublish}>
                publish
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <TextField
                required
                id="standard-required"
                label="Required"
                defaultValue="(Title)"
                className={classes.textField}
                inputRef={e1=>this.title=e1}
                margin="normal"
            />
            <TextField
                required
                id="standard-required"
                label="Required"
                defaultValue="(Date)"
                className={classes.textField}
                inputRef={e1=>this.date=e1}
                margin="normal"
            />{/*        <DatePicker
                margin="normal"
                label="Date picker"
                value={selectedDate}
                onChange={this.handleDateChange}
              /> */}
                        <TextField
                required
                id="standard-required"
                label="Required"
                defaultValue="(User)"
                className={classes.textField}
                inputRef={e1=>this.user=e1}
                margin="normal"
            />
                        <TextField
                required
                id="standard-required"
                label="Required"
                defaultValue="(Category)"
                className={classes.textField}
                inputRef={e1=>this.category=e1}
                margin="normal"
            />
          </List>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);