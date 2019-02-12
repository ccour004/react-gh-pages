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
    render(){
        const { classes,data} = this.props;
        console.log(JSON.stringify(data));
        return(
            <List>
            <TextField
                required
                id="standard-required"
                label="Title"
                className={classes.textField}
                defaultValue={data.title}
                onChange={e=>data.title=e.target.value}
                margin="normal"
            />
            <TextField
                required
                id="standard-required"
                label="Date"
                className={classes.textField}
                defaultValue={data.date}
                onChange={e=>data.date=e.target.value}
                margin="normal"
            /> 
            <TextField
                required
                id="standard-required"
                label="User"
                className={classes.textField}
                defaultValue={data.user}
                onChange={e=>data.user=e.target.value}
                margin="normal"
            />
            <TextField
                required
                id="standard-required"
                label="Image"
                className={classes.textField}
                defaultValue={data.image}
                onChange={e=>data.image=e.target.value}
                margin="normal"
            />
            <TextField
                required
                id="standard-required"
                label="Category"
                className={classes.textField}
                defaultValue={data.category}
                onChange={e=>data.category=e.target.value}
                margin="normal"
            />
            <TextField
                required
                id="standard-required"
                label="Columns"
                className={classes.textField}
                defaultValue={data.cols}
                onChange={e=>data.cols=e.target.value}
                margin="normal"
            />
            <TextField
                id="outlined-full-width"
                label="Text"
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