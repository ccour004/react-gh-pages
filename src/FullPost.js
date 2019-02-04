import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DateIcon from '@material-ui/icons/DateRange';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import Disqus from 'disqus-react';
import { config } from './biddy-blog-firebase-adminsdk-qtzb6-5536d7a1f7.js';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    card: {
        textAlign: 'center',
        padding:'10px 5px 15px 20px',
        align: 'center',
        marginTop: '40px',
        marginLeft: '10%'/*'20px'*/,
        maxWidth: '80%'
    },
    p: {
        textAlign: 'left',
        color: "#565B56",
        'font-size': '16px',
        'font-family': 'Merriweather'
    }
  });

class FullPost extends React.Component{
    state={};

    componentDidMount = ()=>{
        //Get post data.
        if(this.props.db)
            this.props.db.collection('full_posts').where("title","==",this.props.post.title).onSnapshot((querySnapShot)=>{
                querySnapShot.forEach((result) => {
                    this.setState({html:result.data().html});
                    console.log(this.state.html);
                });
            });
        else //If no db provided, then this is a preview post.
            this.setState({html:this.props.post.html,no_comment:true});
    }

    render = ()=>{
        const { classes } = this.props;
        //TEMP fix for older reference to 'fullPost' instead of 'html'.
        if(!this.props.post.html) this.props.post.html = this.props.post.fullPost;

        var disqusShortname,disqusConfig;
        if(!this.props.no_comment){
            disqusShortname = config.shortName;
            disqusConfig = {
                url: window.location.href,
                identifier: this.props.post._id,
                title: this.props.post.title,
            };
        }

        return(
                <Card className={classes.card}>
                    <CardContent>
                    <Typography className={classes.header} color="textSecondary" gutterBottom>
                    <DateIcon/>{this.props.post.date} &nbsp;&nbsp; <PermIdentityIcon/>{this.props.post.user}
                    </Typography>
                    <Typography className={classes.title} variant="h3" component="b">
                        <b>{this.props.post.title}</b>
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>Comments</Disqus.CommentCount>
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        <b><br/>{this.props.post.category.toUpperCase()}</b>
                    </Typography>
                    <Typography className={classes.p} component="p" dangerouslySetInnerHTML={{__html:this.props.post.html}} style={{justifyContent: 'left'}}/>
                    </CardContent>
                    {this.props.no_comment?<div/>:<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />}
                </Card>
        );
    }

}

export default withStyles(styles)(FullPost);