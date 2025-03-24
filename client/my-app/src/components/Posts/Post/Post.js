import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';

import moment from 'moment';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { deletePost } from '../../../actions/posts';
import { likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const tagsArray = Array.isArray(post.tags) ? post.tags : typeof post.tags === 'string' ? post.tags.split(',') : [];

  return (
    <Card className={classes.card}>
      {post.selectedFile && post.selectedFile.trim() !== '' ? (
        <CardMedia
          className={classes.media}
          image={post.selectedFile || "https://via.placeholder.com/150"}
          title={post.title || "Default Title"}
        />
      ) : (
        <CardMedia
          className={classes.media}
          image="https://via.placeholder.com/150"
          title="Default Image"
        />
      )}
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator || "Unknown Creator"}</Typography>
        <Typography variant="body2">{post.createdAt ? moment(post.createdAt).fromNow() : "Unknown Date"}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {tagsArray.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
        </Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}
        </Button>
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
