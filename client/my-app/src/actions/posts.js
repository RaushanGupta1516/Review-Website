import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    
    if (!data) {
      console.error('API returned empty response for getPosts');
      return;
    }

    console.log('Fetched Posts:', data); // Debugging
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    console.log('Submitting Post Data:', post); // Debugging before API call
    const { data } = await api.createPost(post);
    
    if (!data) {
      console.error('No data returned from API in createPost');
      return;
    }

    console.log('Created Post Response:', data); // Debugging response
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    console.log(`Updating Post ID: ${id} with data:`, post); // Debugging
    const { data } = await api.updatePost(id, post);
    
    if (!data) {
      console.error(`No data returned from API in updatePost for ID: ${id}`);
      return;
    }

    console.log('Updated Post Response:', data); // Debugging
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.error('Error updating post:', error);
  }
};
export const deletePost = (id) => async (dispatch) => { 
  try {
    await api.deletePost(id);
    dispatch({type: DELETE, payload: id});
    
  } catch (error) {
    console.log(error);
    
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.error('Error liking post:', error);
  }
}
