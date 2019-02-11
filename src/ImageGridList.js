import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Link } from "react-router-dom";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  root:{

    width: '95%'
  },
  gridList: {
    width: '100%',
    //height: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    //transform: 'background-size 4s ease',
  },
  gridTile: {
    padding: 0,
    marginBottom: 0,
  },
  card: {
    textAlign: 'center',
    align: 'center',
    height: '100%',
  },
  cardMedia: {
    height: '100%',
    width: '100%'
  },
  cardContent: {
    position: 'absolute',
    height: 20,
    width: '100%',
    background: 'white',
    'line-height': 'normal',
    paddingTop: 0,
    'text-align':'top',
    'font-family': ['Oswald','sans-serif'],
    'font-size': '1.5em',
    bottom: 0,
    flexGrow: 1,
    color: theme.palette.common.black,
    overflow: 'hidden',
  }
});

class ImageGridList extends React.Component{
  Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  renderContent(){
    const {classes,tileData,category,isAdmin,onEdit,onAlert} = this.props;
    return (
        <GridList cellHeight={"auto"} className={classes.gridList} cols={3} spacing={8}>
          {tileData.map((tile,index) => (
            category.includes(tile.category)?
            <GridListTile key={tile.image} cols={tile.cols || 1} className={classes.gridTile}>
            {isAdmin?
                  <div style={{background:'#393C9C'}}><IconButton style={{color:'white'}} onClick={()=>{onEdit(index)}}>
                  <EditIcon/></IconButton><IconButton onClick={()=>{onAlert(index)}}><DeleteIcon style={{color:'white'}}/></IconButton></div>:(null)}
              <Card>
              <CardActionArea component={Link} to={tile.path}>
                <CardMedia
                  component='img'
                  image={tile.image}
                  title={tile.title}
                  class={classes.cardMedia}
                />
                <CardContent className={classes.cardContent}>
                      {tile.title.toUpperCase()}
                </CardContent>
                </CardActionArea>
              </Card>
            </GridListTile>:(null)
          ))}
        </GridList>
    );
  }

  render(){
    //const {isAdmin} = this.props;
    //console.log(isAdmin);
    return this.renderContent();
  }
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);