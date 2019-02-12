import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Link } from "react-router-dom";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
    width: '95%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: '100%',
    //height: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    //transform: 'background-size 4s ease',
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
    var toolbar = (index)=>{if(!isAdmin) return (null);
      return <div style={{background:'#393C9C'}}><IconButton style={{color:'white'}} onClick={()=>{onEdit(index)}}>
      <EditIcon/></IconButton><IconButton onClick={()=>{onAlert(index)}}><DeleteIcon style={{color:'white'}}/></IconButton></div>};
    return (
      <div className={classes.root}>
        <GridList cellHeight={"auto"} className={classes.gridList} cols={3} spacing={8}>
          {tileData.map((tile,index) => (
            category === '*' || category.includes(tile.category)?
            <GridListTile key={tile.image} cols={tile.cols || 1} >
            {toolbar(index)}
              <Card>
              <CardActionArea component={Link} to={tile.path}>
                <CardMedia
                  component='img'
                  image={tile.image}
                  title={tile.title}
                  className={classes.cardMedia}
                />
                <CardContent className={classes.cardContent}>
                      {tile.title}
                </CardContent>
                </CardActionArea>
              </Card>
            </GridListTile>/*<GridListTile key={tile.image} cols={tile.cols || 1} component={Link} to={tile.path}>
                  <img src={tile.image} alt={tile.title} className={classes.cardMedia}/>
                  <GridListTileBar
                    title={tile.title}
                    className={classes.gridTileContent}/>
            </GridListTile>*/:(null)
          ))}
        </GridList>
        </div>
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