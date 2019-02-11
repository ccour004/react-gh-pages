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
  handleClose = () => {
    this.props.onClose();
  };

  handlePublish = () =>{
    const {data} = this.state;
    this.props.onPublish({
        _id: data._id?data._id:Math.random().toString(36).substring(7),
        path:'/'+data.title.toLowerCase().replace(new RegExp(' ', 'g'),'_')+'/',
        image:data.image,
        date:data.date,
        user:data.user,
        title:data.title,
        category:data.category,
       // snippet:'So our screen detox officially ended on Friday. But we got hit by a stomach bug so we didn’t make it until Friday. Which is',
        html:data.html
        });     
  };

  constructor(props){
    super(props);
    this.state = {data: Object.assign({},this.props.data)};
  }

  render() {
    const { classes} = this.props;
    const {data} = this.state;
    return (
        <Dialog
          fullScreen
          open={this.props.open}
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
            <IconLabelTabs views={[<InfoView data={data}/>,<TextView data={data}/>,
                                   <PreviewView data={data}/>,<CodeView data={data}/>]}/>
     
            </Dialog>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);