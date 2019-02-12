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
  state={};
  handleClose = () => {
    this.props.onClose();
  };

  handlePublish = () =>{
    const {data} = this.props;
    this.props.onPublish({
        _id: data._id?data._id:Math.random().toString(36).substring(7),
        path:'/'+data.title.toLowerCase().replace(new RegExp(' ', 'g'),'_')+'/',
        image:data.image,
        date:data.date,
        user:data.user,
        title:data.title,
        cols:data.cols,
        category:data.category,
        html:data.html
        });     
  };

  componentDidMount = ()=>{
    //Get post data.
    this.props.db.collection('full_posts').where("_id","==",this.props.data._id).onSnapshot((querySnapShot)=>{
        querySnapShot.forEach((result) => {
            var tempData = this.props.data;
            tempData['html'] = result.data().html;
            this.setState({data:tempData});
        });
    });
}

  render() {
    const { classes,data } = this.props;
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
          {data.html?
            <IconLabelTabs views={[<InfoView data={data}/>,<TextView data={data}/>,
                                   <PreviewView data={data}/>,<CodeView data={data}/>]}/>:(null)}
     
            </Dialog>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);