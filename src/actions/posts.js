import * as api from '../api/index.js';
// constants
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes.js';

// Action get all posts from server
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    console.log('trigger get posts action');
    const action = { type: FETCH_ALL, payload: data }
    
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
}

// Action Creators
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    console.log('trigger create post action');
    dispatch({ type: CREATE, payload: data});
  } catch (error) {
    console.log(error);
  }
}

// Action update post
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { updatingData } = await api.updatePost(id, post);
    await dispatch({ type: UPDATE, payload: updatingData });
  } catch (error) {
    console.log(error);
  }
}

// Action delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    const response = await api.deletePost(id);
    console.log(response.data);
    dispatch({ type: DELETE, payload: id});
  } catch(error) {
    console.log(error);
  }
}

// Action like one post 
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch(error) {
    console.log(error);
  }
}