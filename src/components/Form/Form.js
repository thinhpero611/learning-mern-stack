import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// user actions module
import { createPost, updatePost } from '../../actions/posts.js';

//styles components
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';


// GET THE CURRENT ID

const Form = ({ currentId, setCurrentId}) => {
  const classes = useStyles();
  const [ postData, setPostData ] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: ''
  })
  const dispatch  = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log('Form recieve user from local storage', user?.result);

  // find the post after user has clicked the button update
  const postToBeModified = useSelector((state) =>
    (currentId ? state.posts.find((message) => message._id === currentId) : null)
  );
  
  // state of posts trong store redux thay đổi sau khi user click vào nút update trong post component
  // và làm thay đổi currentId
  useEffect(() => {
    console.log('rerender after currentId has changed !');

    if (postToBeModified) setPostData(postToBeModified);
  }, [postToBeModified])

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postData);
    
    if (currentId) {
      console.log('updatePost has received the ID to work with sever!');
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
      clear();
      return;
    }
    if (user?.result?.name && postData.title) {
      dispatch(createPost({ ...postData, name: user?.result?.name}));
      // sending it to a store as  we set at the top parent app
      clear(); // làm trắng form sau khi điền xong
    }
  }

  if (!user?.result?.name) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  } 
  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField 
          name="title" 
          variant="outlined" 
          label="Title" 
          fullWidth 
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
        <TextField 
          name="message" 
          variant="outlined" 
          label="Message" 
          fullWidth 
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          />
        <TextField 
          name="tags" 
          variant="outlined" 
          label="Tags" 
          fullWidth 
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
          />
          <div className={classes.fileInput}>
            <FileBase 
              type="file" 
              multiple={false} 
              onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
            />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form
