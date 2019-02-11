import React from 'react';
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
    constructor(props){
      super(props);
      this.state = {data: this.props.data};
    }
    render(){
        const { classes } = this.props;
        const { data } = this.state;
        return(
            <List>
            <TextField
                required
                id="standard-required"
                label="Required"
                className={classes.textField}
                defaultValue={data.title}
                onChange={e=>data.title=e.target.value}
                margin="normal"
            />
            <TextField
                required
                id="standard-required"
                label="Required"
                className={classes.textField}
                defaultValue={data.date}
                onChange={e=>data.date=e.target.value}
                margin="normal"
            /> 
            <TextField
                required
                id="standard-required"
                label="Required"
                className={classes.textField}
                defaultValue={data.user}
                onChange={e=>data.user=e.target.value}
                margin="normal"
            />
            <TextField
                required
                id="standard-required"
                label="Required"
                className={classes.textField}
                defaultValue={data.image}
                onChange={e=>data.image=e.target.value}
                margin="normal"
            />
            <TextField
                required
                id="standard-required"
                label="Required"
                className={classes.textField}
                defaultValue={data.category}
                onChange={e=>data.category=e.target.value}
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
                defaultValue={data.html}
                onChange={e=>data.html=e.target.value}
            />
          </List>
        );
    }
}

export default withStyles(styles)(InfoView);