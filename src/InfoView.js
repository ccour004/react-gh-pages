import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';

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

class InfoView extends React.Component {

    render(){
        const { classes } = this.props;
        console.log(this.props.data);

        return(
            <List>
            <TextField
                required
                id="standard-required"
                label="Required"
                className={classes.textField}
                defaultValue={this.props.data.title}
                onChange={e=>this.props.data.title=e.target.value}
                margin="normal"
            />
            <TextField
                required
                id="standard-required"
                label="Required"
                className={classes.textField}
                defaultValue={this.props.data.date}
                onChange={e=>this.props.data.date=e.target.value}
                margin="normal"
            /> 
            <TextField
                required
                id="standard-required"
                label="Required"
                defaultValue="(User)"
                className={classes.textField}
                defaultValue={this.props.data.user}
                onChange={e=>this.props.data.user=e.target.value}
                margin="normal"
            />
            <TextField
                required
                id="standard-required"
                label="Required"
                defaultValue="(Category)"
                className={classes.textField}
                defaultValue={this.props.data.category}
                onChange={e=>this.props.data.category=e.target.value}
                margin="normal"
            />
            <TextField
                id="outlined-full-width"
                label="Label"
                rows={8}
                style={{ margin: 8 }}
                placeholder="Placeholder"
                fullWidth
                multiline
                margin="normal"
                variant="outlined"
                defaultValue={this.props.data.html}
                onChange={e=>this.props.data.html=e.target.value}
            />
          </List>
        );
    }
}

export default withStyles(styles)(InfoView);