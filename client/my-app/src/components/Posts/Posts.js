import React from 'react'
import Post from './Post/Post'
import useStyles from '../../style'; 



const Posts = () => {
    const classes = useStyles();

  return (
    <>
    <h1 color>POSTS</h1>
    <Post/>
    <Post/>

    </>
  )
}

export default Posts