import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconLabelTabs from './IconLabelTabs';

import InfoView from './InfoView.js';
import TextView from './TextView.js';
import PreviewView from './PreviewView.js';
import CodeView from './CodeView.js';

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
    open: this.props.startOpen?true:false,
    data: this.props.data?this.props.data:{'title':'(Title)','date':'(Date)','user':'(User)','category':'(Category)','html':'(Full Post)'}
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    if(this.props.onCancel)this.props.onCancel();
  };

  handlePublish = () =>{
    this.setState({ open: false });
    this.props.onPublish({
        path:'/'+this.state.data.title.toLowerCase().replace(new RegExp(' ', 'g'),'_')+'/',
       // image:'http://bridgeterincourtney.com/wp-content/uploads/2017/04/gallery-6.jpg',
        date:this.state.data.date,
        user:this.state.data.user,
        title:this.state.data.title,
        category:this.state.data.category,
       // snippet:'So our screen detox officially ended on Friday. But we got hit by a stomach bug so we didn’t make it until Friday. Which is',
        html:this.state.data.html
        });     
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Add Post
        </Button>&nbsp;&nbsp;
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
            <IconLabelTabs views={[<InfoView data={this.state.data}/>,<TextView data={this.state.data}/>,
                                   <PreviewView data={this.state.data}/>,<CodeView data={this.state.data}/>]}/>
        />
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);