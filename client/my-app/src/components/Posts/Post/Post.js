import React from 'react'
import useStyles from './styles'; 
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';



const Post = ({post}) => {
    const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia 
  className={classes.media}
  component="img"
  image={post.selectedFile || "https://via.placeholder.com/150"}
  onError={(e) => e.target.src = "https://via.placeholder.com/150"}
  alt={post.title}
/>

       
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{color: 'black'}} size="small" onClick={() => {}}>
          <MoreHorizIcon fontSize="default"/>
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
        <Typography variant="body2" color="textSecondary">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAltIcon fontSize="small"/>
          Like
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => {}}>
          <DeleteIcon fontSize="small"/>
          Delete
        </Button>
      </CardActions>

      </Card>
  )
}

export default Post